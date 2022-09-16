package repo

import (
	"context"

	"github.com/reearth/reearth-marketplace/server/internal/usecase/interfaces"
	"github.com/reearth/reearth-marketplace/server/pkg/id"
	"github.com/reearth/reearth-marketplace/server/pkg/plugin"
	"github.com/reearth/reearthx/usecasex"
)

type Plugin interface {
	Create(ctx context.Context, p *plugin.VersionedPlugin) error
	FindByID(ctx context.Context, id plugin.ID, user *id.UserID) (*plugin.Plugin, error)
	FindByIDs(ctx context.Context, ids []plugin.ID, user *id.UserID) ([]*plugin.Plugin, error)
	FindByVersion(ctx context.Context, id plugin.ID, version string) (*plugin.VersionedPlugin, error)
	SaveVersion(ctx context.Context, v *plugin.Version) error
	Save(ctx context.Context, p *plugin.Plugin) error
	Search(ctx context.Context, user *id.UserID, filter *interfaces.SearchPluginParam) ([]*plugin.VersionedPlugin, *usecasex.PageInfo, error)
	Like(ctx context.Context, user id.UserID, id plugin.ID) error
	Unlike(ctx context.Context, user id.UserID, id plugin.ID) error
	Versions(ctx context.Context, id plugin.ID) ([]*plugin.Version, error)
	UpdateLatest(ctx context.Context, p *plugin.Plugin) (*plugin.Plugin, error)
	List(ctx context.Context, uid id.UserID, filter *interfaces.ListPluginParam) ([]*plugin.VersionedPlugin, *usecasex.PageInfo, error)
	Liked(ctx context.Context, user id.UserID, id plugin.ID) (bool, error)
}
