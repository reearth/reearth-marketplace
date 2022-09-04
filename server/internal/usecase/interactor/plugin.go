package interactor

import (
	"context"
	"io"
	"net/http"
	"net/url"

	"github.com/reearth/reearth-marketplace/server/internal/usecase/gateway"
	"github.com/reearth/reearth-marketplace/server/internal/usecase/interfaces"
	"github.com/reearth/reearth-marketplace/server/internal/usecase/repo"
	"github.com/reearth/reearth-marketplace/server/pkg/id"
	"github.com/reearth/reearth-marketplace/server/pkg/plugin"
	"github.com/reearth/reearth-marketplace/server/pkg/plugin/pluginpack"
	"github.com/reearth/reearth-marketplace/server/pkg/plugin/repourl"
	"github.com/reearth/reearth-marketplace/server/pkg/user"
	"github.com/reearth/reearthx/usecase"
)

type Plugin struct {
	pluginRepo  repo.Plugin
	transaction repo.Transaction
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

func (p *Plugin) FindByID(ctx context.Context, id id.PluginID) (*plugin.VersionedPlugin, error) {
	pl, err := p.pluginRepo.FindByID(ctx, id)
	if err != nil {
		return nil, err
	}
	return plugin.Versioned(pl).Build()
}

func (p *Plugin) Parse(ctx context.Context, publisher *user.User, r io.Reader) (*plugin.VersionedPlugin, error) {
	pkg, err := packageFromZip(r)
	if err != nil {
		return nil, err
	}
	return pluginpack.ToPlugin(ctx, pkg, publisher.ID())
}

func (p *Plugin) ParseFromRepo(ctx context.Context, publisher *user.User, repo *string) (*plugin.VersionedPlugin, error) {
	pkg, err := p.fetchFromRepo(ctx, repo)
	if err != nil {
		return nil, err
	}
	return pluginpack.ToPlugin(ctx, pkg, publisher.ID())
}

func (p *Plugin) Create(ctx context.Context, publisher *user.User, r io.Reader) (*plugin.VersionedPlugin, error) {
	pkg, err := packageFromZip(r)
	if err != nil {
		return nil, err
	}
	return p.create(ctx, publisher, pkg)
}

func (p *Plugin) CreateFromRepo(ctx context.Context, publisher *user.User, repo *string) (*plugin.VersionedPlugin, error) {
	pkg, err := p.fetchFromRepo(ctx, repo)
	if err != nil {
		return nil, err
	}
	return p.create(ctx, publisher, pkg)
}

func (p *Plugin) Update(ctx context.Context, param interfaces.UpdatePluginParam) (_ *plugin.VersionedPlugin, err error) {
	tx, err := p.transaction.Begin()
	if err != nil {
		return nil, err
	}
	defer func() {
		err2 := tx.End(ctx)
		if err == nil {
			err = err2
		}
	}()

	pl, err := p.pluginRepo.FindByID(ctx, param.PluginID)
	if err != nil {
		return nil, err
	}
	if param.Active != nil {
		pl.SetActive(*param.Active)
	}
	if len(param.DeletedTags) > 0 || len(param.NewTags) > 0 {
		var tags []string
		if tagsCap := len(pl.Tags()) - len(param.DeletedTags) + len(param.NewTags); tagsCap > 0 {
			tags = make([]string, 0, tagsCap)
		}
		tags = applyTagsDiff(tags, pl.Tags(), param.DeletedTags, param.NewTags)
		pl.SetTags(tags)
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
	}

	if err := p.pluginRepo.Save(ctx, pl); err != nil {
		return nil, err
	}

	tx.Commit()
	return plugin.Versioned(pl).Build()
}

func (p *Plugin) Search(ctx context.Context, user *user.User, param interfaces.SearchPluginParam) ([]*plugin.VersionedPlugin, *usecase.PageInfo, error) {
	return p.pluginRepo.Search(ctx, user, &param)
}

func (p *Plugin) Like(ctx context.Context, user *user.User, id id.PluginID) (_ *plugin.VersionedPlugin, err error) {
	tx, err := p.transaction.Begin()
	if err != nil {
		return nil, err
	}
	defer func() {
		err2 := tx.End(ctx)
		if err == nil {
			err = err2
		}
	}()

	pl, err := p.pluginRepo.FindByID(ctx, id)
	if err != nil {
		return nil, err
	}

	if err := p.pluginRepo.Like(ctx, user, id); err != nil {
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
	tx, err := p.transaction.Begin()
	if err != nil {
		return nil, err
	}
	defer func() {
		err2 := tx.End(ctx)
		if err == nil {
			err = err2
		}
	}()

	pl, err := p.pluginRepo.FindByID(ctx, id)
	if err != nil {
		return nil, err
	}

	if err := p.pluginRepo.Unlike(ctx, user, id); err != nil {
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
	tx, err := p.transaction.Begin()
	if err != nil {
		return nil, err
	}
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
	if param.Active != nil {
		v.SetActive(*param.Active)
	}
	if param.Description != nil {
		v.SetDescription(*param.Description)
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

func (p *Plugin) List(ctx context.Context, uid id.UserID, param interfaces.ListPluginParam) ([]*plugin.VersionedPlugin, *usecase.PageInfo, error) {
	return p.pluginRepo.List(ctx, uid, &param)
}

func (p *Plugin) Liked(ctx context.Context, user *user.User, id id.PluginID) (bool, error) {
	return p.pluginRepo.Liked(ctx, user, id)
}

func (p *Plugin) create(ctx context.Context, publisher *user.User, pkg *pluginpack.Package) (*plugin.VersionedPlugin, error) {
	vp, err := pluginpack.ToPlugin(ctx, pkg, publisher.ID())
	if err != nil {
		return nil, err
	}
	if err := p.file.UploadPlugin(ctx, vp.Version().ID(), pkg.Content()); err != nil {
		return nil, err
	}
	if err := p.pluginRepo.Create(ctx, vp); err != nil {
		return nil, err
	}
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
