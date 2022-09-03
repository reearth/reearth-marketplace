package gqlmodel

import (
	"context"

	"github.com/reearth/reearth-marketplace/server/internal/adapter"
	"github.com/reearth/reearth-marketplace/server/pkg/plugin"
	"github.com/samber/lo"
)

func strRef(s string) *string {
	return &s
}

func ToPlugin(ctx context.Context, p *plugin.VersionedPlugin) *Plugin {
	if p == nil {
		return nil
	}
	pid := IDFromPluginID(p.Plugin().ID())
	return &Plugin{
		ID:          string(pid),
		Name:        p.Plugin().Name(),
		Author:      strRef(p.Version().Author()),
		Description: strRef(p.Version().Description()),
		Repository:  strRef(p.Version().Repository()),
		Type:        PluginType(p.Plugin().Type()),
		CreatedAt:   p.Plugin().CreatedAt(),
		UpdatedAt:   p.Plugin().UpdatedAt(),
		Icon:        strRef(p.Version().Icon()),
		PublishedAt: p.Version().PublishedAt(),
		Downloads:   int(p.Plugin().Downloads()),
		Active:      p.Plugin().Active(),
		Readme:      p.Version().Readme(),
		Tags:        p.Plugin().Tags(),
		LatestVersion: &Version{
			Version:     p.Version().Version().String(),
			Description: p.Version().Description(),
			Downloads:   int(p.Version().Downloads()),
			Active:      p.Version().Active(),
			CreatedAt:   p.Version().CreatedAt(),
			UpdatedAt:   p.Version().UpdatedAt(),
			PublishedAt: p.Version().PublishedAt(),
			Checksum:    p.Version().Checksum(),
		},
		Images: lo.Map(p.Plugin().Images(), func(x string, _ int) string {
			return adapter.Usecases(ctx).Plugin.ImageURL(ctx, x)
		}),
		PublisherID: p.Plugin().PublisherID().String(),
		Like:        int(p.Plugin().Like()),
		// TODO: fill
		Publisher: nil,
	}
}

func ToVersion(v *plugin.Version) *Version {
	return &Version{
		Version:     v.Version().String(),
		Description: v.Description(),
		Downloads:   int(v.Downloads()),
		Active:      v.Active(),
		CreatedAt:   v.CreatedAt(),
		UpdatedAt:   v.UpdatedAt(),
		PublishedAt: v.PublishedAt(),
		Checksum:    v.Checksum(),
	}
}
