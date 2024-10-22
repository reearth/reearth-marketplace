package interfaces

import (
	"context"
	"errors"
	"io"

	"github.com/reearth/reearth-marketplace/server/pkg/id"
	"github.com/reearth/reearth-marketplace/server/pkg/plugin"
	"github.com/reearth/reearth-marketplace/server/pkg/user"
	"github.com/reearth/reearthx/usecasex"
)

var (
	ErrPluginAlreadyRegistered = errors.New("plugin already registered")
	ErrInvalidPluginPackage    = errors.New("invalid plugin package")
)

type Plugin interface {
	FindByID(ctx context.Context, id id.PluginID, user *id.UserID) (*plugin.VersionedPlugin, error)
	FindByIDs(ctx context.Context, ids []id.PluginID, user *id.UserID) ([]*plugin.VersionedPlugin, error)
	Parse(ctx context.Context, publisher *user.User, r io.Reader, core bool) (*plugin.VersionedPlugin, error)
	ParseFromRepo(ctx context.Context, publisher *user.User, repo *string, core bool) (*plugin.VersionedPlugin, error)
	Create(ctx context.Context, publisher *user.User, r io.Reader, core bool) (*plugin.VersionedPlugin, error)
	CreateFromRepo(ctx context.Context, publisher *user.User, repo *string, core bool) (*plugin.VersionedPlugin, error)
	Update(ctx context.Context, param UpdatePluginParam) (_ *plugin.VersionedPlugin, err error)
	Search(ctx context.Context, user *user.User, param SearchPluginParam) ([]*plugin.VersionedPlugin, *usecasex.PageInfo, error)
	Like(ctx context.Context, user *user.User, id id.PluginID) (*plugin.VersionedPlugin, error)
	Unlike(ctx context.Context, user *user.User, id id.PluginID) (*plugin.VersionedPlugin, error)
	UpdateVersion(ctx context.Context, user *user.User, param UpdatePluginVersionParam) (*plugin.VersionedPlugin, error)
	Versions(ctx context.Context, id id.PluginID) ([]*plugin.Version, error)
	ImageURL(ctx context.Context, name string) string
	List(ctx context.Context, uid *id.UserID, param ListPluginParam) ([]*plugin.VersionedPlugin, *usecasex.PageInfo, error)
	Liked(ctx context.Context, user *user.User, id id.PluginID) (bool, error)
	Download(ctx context.Context, id id.PluginID, version string) (io.ReadCloser, error)
	IncreaseDownloadCount(ctx context.Context, id id.PluginID, version string) error
}

type UpdatePluginParam struct {
	Publisher   *user.User
	PluginID    id.PluginID
	Active      *bool
	Images      []io.ReadSeeker
	NewTags     []string
	DeletedTags []string
}

type SearchPluginParam struct {
	First     *int     `json:"first"`
	Last      *int     `json:"last"`
	Before    *string  `json:"before"`
	After     *string  `json:"after"`
	Offset    *int     `json:"offset"`
	Keyword   *string  `json:"keyword"`
	Liked     *bool    `json:"liked"`
	Tags      []string `json:"tags"`
	Types     []string `json:"types"`
	Publisher *string  `json:"publisher"`
	Sort      string   `json:"sort"`
}

type UpdatePluginVersionParam struct {
	PluginID    id.PluginID
	Version     string
	Active      *bool
	Description *string
}

type ListPluginParam struct {
	First      *int
	Last       *int
	Before     *string
	After      *string
	Offset     *int
	ActiveOnly bool
}
