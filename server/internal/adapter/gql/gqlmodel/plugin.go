package gqlmodel

import (
	"context"
	"time"

	"github.com/reearth/reearth-marketplace/server/internal/adapter"
	"github.com/reearth/reearth-marketplace/server/pkg/plugin"
	"github.com/samber/lo"
)

type Plugin struct {
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
	PublisherID   string     `json:"publisherId"`
	Publisher     Publisher  `json:"publisher"`
	Like          int        `json:"like"`
}

func (*Plugin) IsNode() {}

func (p *Plugin) Versions(ctx context.Context) ([]*Version, error) {
	pid, err := plugin.IDFrom(p.ID)
	if err != nil {
		return nil, err
	}
	vs, err := adapter.Usecases(ctx).Plugin.Versions(ctx, pid)
	if err != nil {
		return nil, err
	}
	return lo.Map(vs, func(x *plugin.Version, _ int) *Version {
		return ToVersion(x)
	}), nil
}
