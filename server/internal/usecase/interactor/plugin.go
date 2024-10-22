package interactor

import (
	"context"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"time"

	"github.com/reearth/reearth-marketplace/server/internal/usecase/gateway"
	"github.com/reearth/reearth-marketplace/server/internal/usecase/interfaces"
	"github.com/reearth/reearth-marketplace/server/internal/usecase/repo"
	"github.com/reearth/reearth-marketplace/server/pkg/id"
	"github.com/reearth/reearth-marketplace/server/pkg/plugin"
	"github.com/reearth/reearth-marketplace/server/pkg/plugin/pluginpack"
	"github.com/reearth/reearth-marketplace/server/pkg/plugin/repourl"
	"github.com/reearth/reearth-marketplace/server/pkg/user"
	"github.com/reearth/reearthx/usecasex"
	"github.com/reearth/reearthx/util"
)

type Plugin struct {
	pluginRepo  repo.Plugin
	transaction usecasex.Transaction
	file        gateway.File
}

func NewPlugin(r *repo.Container, gr *gateway.Container) interfaces.Plugin {
	return &Plugin{
		pluginRepo:  r.Plugin,
		file:        gr.File,
		transaction: r.Transaction,
	}
}

var pluginPackageSizeLimit int64 = 10 * 1024 * 1024

func (p *Plugin) FindByID(ctx context.Context, id id.PluginID, user *id.UserID) (*plugin.VersionedPlugin, error) {
	pl, err := p.pluginRepo.FindByID(ctx, id, user)
	if err != nil {
		return nil, err
	}
	return plugin.Versioned(pl).Build()
}

func (i *Plugin) FindByIDs(ctx context.Context, uids []id.PluginID, user *id.UserID) ([]*plugin.VersionedPlugin, error) {
	res, err := i.pluginRepo.FindByIDs(ctx, uids, user)
	if err != nil {
		return nil, err
	}
	return util.TryMap(res, func(pl *plugin.Plugin) (*plugin.VersionedPlugin, error) { return plugin.Versioned(pl).Build() })
}

func (p *Plugin) FindByVersion(ctx context.Context, id id.PluginID, version string) (*plugin.VersionedPlugin, error) {
	return p.pluginRepo.FindByVersion(ctx, id, version)
}

func (p *Plugin) Parse(ctx context.Context, publisher *user.User, r io.Reader, core bool) (*plugin.VersionedPlugin, error) {
	if publisher == nil {
		return nil, interfaces.ErrOperationDenied
	}

	pkg, err := packageFromZip(r)
	if err != nil {
		return nil, err
	}
	return pluginpack.ToPlugin(ctx, pkg, publisher.ID(), core)
}

func (p *Plugin) ParseFromRepo(ctx context.Context, publisher *user.User, repo *string, core bool) (*plugin.VersionedPlugin, error) {
	if publisher == nil {
		return nil, interfaces.ErrOperationDenied
	}

	pkg, err := p.fetchFromRepo(ctx, repo)
	if err != nil {
		return nil, err
	}
	return pluginpack.ToPlugin(ctx, pkg, publisher.ID(), core)
}

func (p *Plugin) Create(ctx context.Context, publisher *user.User, r io.Reader, core bool) (*plugin.VersionedPlugin, error) {
	if publisher == nil {
		return nil, interfaces.ErrOperationDenied
	}

	pkg, err := packageFromZip(r)
	if err != nil {
		return nil, err
	}
	return p.create(ctx, publisher, pkg, core)
}

func (p *Plugin) CreateFromRepo(ctx context.Context, publisher *user.User, repo *string, core bool) (*plugin.VersionedPlugin, error) {
	if publisher == nil {
		return nil, interfaces.ErrOperationDenied
	}

	pkg, err := p.fetchFromRepo(ctx, repo)
	if err != nil {
		return nil, err
	}
	return p.create(ctx, publisher, pkg, core)
}

func (p *Plugin) Update(ctx context.Context, param interfaces.UpdatePluginParam) (_ *plugin.VersionedPlugin, err error) {
	if param.Publisher == nil {
		return nil, interfaces.ErrOperationDenied
	}

	tx, err := p.transaction.Begin(ctx)
	if err != nil {
		return nil, err
	}

	ctx = tx.Context()
	defer func() {
		err2 := tx.End(ctx)
		if err == nil {
			err = err2
		}
	}()

	pl, err := p.pluginRepo.FindByID(ctx, param.PluginID, param.Publisher.IDRef())
	if err != nil {
		return nil, err
	}
	if pl.PublisherID().Compare(param.Publisher.ID()) != 0 {
		return nil, fmt.Errorf("cannot update other's plugin")
	}
	updated := false
	if param.Active != nil {
		if pl.SetActive(*param.Active) {
			updated = true
		}
	}
	if len(param.DeletedTags) > 0 || len(param.NewTags) > 0 {
		var tags []string
		if tagsCap := len(pl.Tags()) - len(param.DeletedTags) + len(param.NewTags); tagsCap > 0 {
			tags = make([]string, 0, tagsCap)
		}
		tags = applyTagsDiff(tags, pl.Tags(), param.DeletedTags, param.NewTags)
		pl.SetTags(tags)
		updated = true
	}

	if len(param.Images) > 0 {
		var imgNames []string
		for _, img := range param.Images {
			imageName, err := p.file.UploadImage(ctx, img)
			if err != nil {
				return nil, err
			}
			imgNames = append(imgNames, imageName)
		}
		pl.SetImages(imgNames)
		updated = true
	}
	if updated {
		pl.SetUpdatedAt(time.Now())
	}

	if err := p.pluginRepo.Save(ctx, pl); err != nil {
		return nil, err
	}

	tx.Commit()
	return plugin.Versioned(pl).Build()
}

func (p *Plugin) Search(ctx context.Context, user *user.User, param interfaces.SearchPluginParam) ([]*plugin.VersionedPlugin, *usecasex.PageInfo, error) {
	return p.pluginRepo.Search(ctx, user.IDRef(), &param)
}

func (p *Plugin) Like(ctx context.Context, user *user.User, id id.PluginID) (_ *plugin.VersionedPlugin, err error) {
	if user == nil {
		return nil, interfaces.ErrOperationDenied
	}

	tx, err := p.transaction.Begin(ctx)
	if err != nil {
		return nil, err
	}

	ctx = tx.Context()
	defer func() {
		err2 := tx.End(ctx)
		if err == nil {
			err = err2
		}
	}()

	pl, err := p.pluginRepo.FindByID(ctx, id, user.IDRef())
	if err != nil {
		return nil, err
	}

	if err := p.pluginRepo.Like(ctx, user.ID(), id); err != nil {
		return nil, err
	}

	pl.AddLike(1)
	if err := p.pluginRepo.Save(ctx, pl); err != nil {
		return nil, err
	}

	tx.Commit()
	return plugin.Versioned(pl).Build()
}

func (p *Plugin) Unlike(ctx context.Context, user *user.User, id id.PluginID) (*plugin.VersionedPlugin, error) {
	if user == nil {
		return nil, interfaces.ErrOperationDenied
	}

	tx, err := p.transaction.Begin(ctx)
	if err != nil {
		return nil, err
	}

	ctx = tx.Context()
	defer func() {
		err2 := tx.End(ctx)
		if err == nil {
			err = err2
		}
	}()

	pl, err := p.pluginRepo.FindByID(ctx, id, user.IDRef())
	if err != nil {
		return nil, err
	}

	if err := p.pluginRepo.Unlike(ctx, user.ID(), id); err != nil {
		return nil, err
	}

	pl.AddLike(-1)
	if err := p.pluginRepo.Save(ctx, pl); err != nil {
		return nil, err
	}

	tx.Commit()
	return plugin.Versioned(pl).Build()
}

func (p *Plugin) UpdateVersion(ctx context.Context, user *user.User, param interfaces.UpdatePluginVersionParam) (_ *plugin.VersionedPlugin, err error) {
	if user == nil {
		return nil, interfaces.ErrOperationDenied
	}

	tx, err := p.transaction.Begin(ctx)
	if err != nil {
		return nil, err
	}

	ctx = tx.Context()
	defer func() {
		err2 := tx.End(ctx)
		if err == nil {
			err = err2
		}
	}()

	vp, err := p.pluginRepo.FindByVersion(ctx, param.PluginID, param.Version)
	if err != nil {
		return nil, err
	}
	v := vp.Version()
	updated := false
	if param.Active != nil {
		if v.SetActive(*param.Active) {
			updated = true
		}
	}
	if param.Description != nil {
		if v.SetDescription(*param.Description) {
			updated = true
		}
	}
	if updated {
		v.SetUpdatedAt(time.Now())
	}
	if err := p.pluginRepo.SaveVersion(ctx, v); err != nil {
		return nil, err
	}
	// update vp.Plugin() object
	if _, err := p.pluginRepo.UpdateLatest(ctx, vp.Plugin()); err != nil {
		return nil, err
	}
	tx.Commit()
	return vp, nil
}

func (p *Plugin) Versions(ctx context.Context, id id.PluginID) ([]*plugin.Version, error) {
	return p.pluginRepo.Versions(ctx, id)
}

func (p *Plugin) ImageURL(ctx context.Context, name string) string {
	return p.file.AssetsURL(ctx, name)
}

func (p *Plugin) List(ctx context.Context, u *id.UserID, param interfaces.ListPluginParam) ([]*plugin.VersionedPlugin, *usecasex.PageInfo, error) {
	if u == nil {
		return nil, nil, interfaces.ErrOperationDenied
	}

	return p.pluginRepo.List(ctx, *u, &param)
}

func (p *Plugin) Liked(ctx context.Context, user *user.User, id id.PluginID) (bool, error) {
	if user == nil {
		return false, nil
	}
	return p.pluginRepo.Liked(ctx, user.ID(), id)
}

func (p *Plugin) Download(ctx context.Context, id id.PluginID, version string) (io.ReadCloser, error) {
	vp, err := p.pluginRepo.FindByVersion(ctx, id, version)
	if err != nil {
		return nil, err
	}
	return p.download(ctx, vp, false)
}

func (p *Plugin) DownloadLatest(ctx context.Context, id id.PluginID) (io.ReadCloser, error) {
	pl, err := p.pluginRepo.FindByID(ctx, id, nil)
	if err != nil {
		return nil, err
	}
	vp, err := plugin.Versioned(pl).Build()
	if err != nil {
		return nil, err
	}
	return p.download(ctx, vp, false)
}

func (p *Plugin) IncreaseDownloadCount(ctx context.Context, id id.PluginID, version string) error {
	vp, err := p.pluginRepo.FindByVersion(ctx, id, version)
	if err != nil {
		return err
	}
	_, err = p.download(ctx, vp, true)
	return err
}

func (p *Plugin) download(ctx context.Context, vp *plugin.VersionedPlugin, onlyIncrease bool) (_ io.ReadCloser, err error) {
	tx, err := p.transaction.Begin(ctx)
	if err != nil {
		return nil, err
	}

	ctx = tx.Context()
	defer func() {
		err2 := tx.End(ctx)
		if err == nil {
			err = err2
		}
	}()
	vp2, err := p.FindByVersion(ctx, vp.Plugin().ID(), vp.Version().Version().String())
	if err != nil {
		return nil, err
	}
	vp2.Plugin().AddDownloads(1)
	vp2.Version().AddDownloads(1)

	if err := p.pluginRepo.Save(ctx, vp2.Plugin()); err != nil {
		return nil, err
	}
	if err := p.pluginRepo.SaveVersion(ctx, vp2.Version()); err != nil {
		return nil, err
	}
	tx.Commit()
	if onlyIncrease {
		return nil, nil
	}

	b, err := p.file.DownloadPlugin(ctx, vp2.Version().ID())
	if err != nil {
		return nil, err
	}
	return b, nil
}

func (p *Plugin) create(ctx context.Context, publisher *user.User, pkg *pluginpack.Package, core bool) (_ *plugin.VersionedPlugin, err error) {
	if publisher == nil {
		return nil, interfaces.ErrOperationDenied
	}

	vp, err := pluginpack.ToPlugin(ctx, pkg, publisher.ID(), core)
	if err != nil {
		return nil, err
	}

	tx, err := p.transaction.Begin(ctx)
	if err != nil {
		return nil, err
	}

	ctx = tx.Context()
	defer func() {
		err2 := tx.End(ctx)
		if err == nil {
			err = err2
		}
	}()
	if err := p.pluginRepo.Create(ctx, vp); err != nil {
		return nil, err
	}
	if err := p.file.UploadPlugin(ctx, vp.Version().ID(), pkg.Content()); err != nil {
		return nil, err
	}
	tx.Commit()
	return vp, nil
}

func (p *Plugin) fetchFromRepo(ctx context.Context, repo *string) (*pluginpack.Package, error) {
	u, err := url.Parse(*repo)
	if err != nil {
		return nil, err
	}
	ru, err := repourl.New(u)
	if err != nil {
		return nil, err
	}

	req, _ := http.NewRequestWithContext(ctx, http.MethodGet, ru.ArchiveURL().String(), nil)
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return nil, interfaces.ErrInvalidPluginPackage
	}
	defer resp.Body.Close()
	return packageFromZip(resp.Body)
}

func packageFromZip(r io.Reader) (*pluginpack.Package, error) {
	return pluginpack.PackageFromZip(r, pluginPackageSizeLimit)
}

func applyTagsDiff(dst, src, deletedTags, newTags []string) []string {
	deleted := make(map[string]bool)
	for _, t := range deletedTags {
		deleted[t] = true
	}
	current := make(map[string]bool)
	for _, t := range src {
		current[t] = true
	}
	for _, t := range src {
		if !deleted[t] {
			dst = append(dst, t)
		}
	}
	for _, t := range newTags {
		if !current[t] {
			dst = append(dst, t)
		}
	}
	return dst
}
