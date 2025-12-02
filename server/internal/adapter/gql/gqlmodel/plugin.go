package gqlmodel

import (
	"context"
	"time"

	"github.com/reearth/reearth-marketplace/server/internal/adapter"
	"github.com/reearth/reearth-marketplace/server/pkg/id"
	"github.com/reearth/reearth-marketplace/server/pkg/plugin"
	"github.com/samber/lo"
)

type Plugin struct {
	id            id.PluginID
	ID            string     `json:"id"`
	Type          PluginType `json:"type"`
	CreatedAt     time.Time  `json:"createdAt"`
	UpdatedAt     time.Time  `json:"updatedAt"`
	Name          string     `json:"name"`
	Author        *string    `json:"author"`
	Description   *string    `json:"description"`
	Icon          *string    `json:"icon"`
	Repository    *string    `json:"repository"`
	PublishedAt   time.Time  `json:"publishedAt"`
	Downloads     int        `json:"downloads"`
	Active        bool       `json:"active"`
	Readme        string     `json:"readme"`
	Tags          []string   `json:"tags"`
	LatestVersion *Version   `json:"latestVersion"`
	Images        []string   `json:"images"`
	Like          int        `json:"like"`
	Core          bool       `json:"core"`

	publisherID id.UserID
}

func (*Plugin) IsNode() {}

func (p *Plugin) GetID() string {
	return p.ID
}

func (p *Plugin) Versions(ctx context.Context) ([]*Version, error) {
	vs, err := adapter.Usecases(ctx).Plugin.Versions(ctx, p.id)
	if err != nil {
		return nil, err
	}
	return lo.Map(vs, func(x *plugin.Version, _ int) *Version {
		return ToVersion(x)
	}), nil
}

func (p *Plugin) Liked(ctx context.Context) (bool, error) {
	return adapter.Usecases(ctx).Plugin.Liked(ctx, adapter.User(ctx), p.id)
}

func (p *Plugin) Publisher(ctx context.Context) (Publisher, error) {
	u, err := adapter.Usecases(ctx).User.FindByID(ctx, p.publisherID)
	if err != nil {
		return nil, err
	}
	return ToUser(u), nil
}

func (p *Plugin) PublisherID() string {
	return p.publisherID.String()
}
