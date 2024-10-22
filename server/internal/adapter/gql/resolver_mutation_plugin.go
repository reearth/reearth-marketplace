package gql

import (
	"context"
	"errors"
	"fmt"
	"io"

	"github.com/99designs/gqlgen/graphql"
	"github.com/reearth/reearth-marketplace/server/internal/adapter/gql/gqlmodel"
	"github.com/reearth/reearth-marketplace/server/internal/usecase/interfaces"
	"github.com/reearth/reearth-marketplace/server/pkg/id"
	"github.com/reearth/reearth-marketplace/server/pkg/plugin"
	"github.com/samber/lo"
)

func (r *mutationResolver) ParsePlugin(ctx context.Context, input gqlmodel.CreatePluginInput) (*gqlmodel.PluginPayload, error) {
	var p *plugin.VersionedPlugin
	var err error

	core := *input.Core

	if input.File != nil {
		p, err = usecases(ctx).Plugin.Parse(ctx, getUser(ctx), input.File.File, core)
	} else if input.Repo != nil {
		p, err = usecases(ctx).Plugin.ParseFromRepo(ctx, getUser(ctx), input.Repo, core)
	} else {
		return nil, errors.New("either file or repo is required")
	}
	if err != nil {
		return nil, fmt.Errorf("parse: %w", err)
	}
	return &gqlmodel.PluginPayload{
		Plugin: gqlmodel.ToPlugin(ctx, p),
	}, nil
}

func (r *mutationResolver) CreatePlugin(ctx context.Context, input gqlmodel.CreatePluginInput) (*gqlmodel.PluginPayload, error) {
	var p *plugin.VersionedPlugin
	var err error

	core := *input.Core

	if input.File != nil {
		p, err = usecases(ctx).Plugin.Create(ctx, getUser(ctx), input.File.File, core)
	} else if input.Repo != nil {
		p, err = usecases(ctx).Plugin.CreateFromRepo(ctx, getUser(ctx), input.Repo, core)
	} else {
		return nil, errors.New("either file or repo is required")
	}
	if err != nil {
		return nil, fmt.Errorf("create: %w", err)
	}
	return &gqlmodel.PluginPayload{
		Plugin: gqlmodel.ToPlugin(ctx, p),
	}, nil
}

func (r *mutationResolver) UpdatePlugin(ctx context.Context, input gqlmodel.UpdatePluginInput) (*gqlmodel.PluginPayload, error) {
	pluginID, err := pluginIDFrom(input.PluginID)
	if err != nil {
		return nil, fmt.Errorf("invalid plugin id: %w", err)
	}
	p, err := usecases(ctx).Plugin.Update(ctx, interfaces.UpdatePluginParam{
		Publisher: getUser(ctx),
		PluginID:  pluginID,
		Active:    input.Active,
		Images: lo.Map(input.Images, func(x *graphql.Upload, _ int) io.ReadSeeker {
			return x.File
		}),
		NewTags:     input.NewTags,
		DeletedTags: input.DeletedTags,
	})
	if err != nil {
		return nil, fmt.Errorf("update plugin: %w", err)
	}
	return &gqlmodel.PluginPayload{
		Plugin: gqlmodel.ToPlugin(ctx, p),
	}, nil
}

func (r *mutationResolver) DeletePlugin(ctx context.Context, input gqlmodel.DeletePluginInput) (*gqlmodel.DeletePluginPayload, error) {
	panic("not implemented")
}

func (r *mutationResolver) LikePlugin(ctx context.Context, input gqlmodel.LikePluginInput) (*gqlmodel.PluginPayload, error) {
	pid, err := pluginIDFrom(input.PluginID)
	if err != nil {
		return nil, err
	}

	vp, err := usecases(ctx).Plugin.Like(ctx, getUser(ctx), pid)
	if err != nil {
		return nil, err
	}
	return &gqlmodel.PluginPayload{
		Plugin: gqlmodel.ToPlugin(ctx, vp),
	}, nil
}

func (r *mutationResolver) UnlikePlugin(ctx context.Context, input gqlmodel.UnlikePluginInput) (*gqlmodel.PluginPayload, error) {
	pid, err := pluginIDFrom(input.PluginID)
	if err != nil {
		return nil, err
	}
	vp, err := usecases(ctx).Plugin.Unlike(ctx, getUser(ctx), pid)
	if err != nil {
		return nil, err
	}
	return &gqlmodel.PluginPayload{
		Plugin: gqlmodel.ToPlugin(ctx, vp),
	}, nil
}

func (r *mutationResolver) UpdateVersion(ctx context.Context, input gqlmodel.UpdateVersionInput) (*gqlmodel.VersionPayload, error) {
	pid, err := pluginIDFrom(input.PluginID)
	if err != nil {
		return nil, err
	}
	p, err := usecases(ctx).Plugin.UpdateVersion(ctx, getUser(ctx), interfaces.UpdatePluginVersionParam{
		PluginID:    pid,
		Version:     input.Version,
		Active:      input.Active,
		Description: input.Description,
	})
	if err != nil {
		return nil, err
	}
	return &gqlmodel.VersionPayload{
		Plugin:  gqlmodel.ToPlugin(ctx, p),
		Version: gqlmodel.ToVersion(p.Version()),
	}, nil
}

func (r *mutationResolver) DeleteVersion(ctx context.Context, input gqlmodel.DeleteVersionInput) (*gqlmodel.DeleteVersionPayload, error) {
	panic("not implemented")
}

func pluginIDFrom(goid string) (id.PluginID, error) {
	return id.PluginIDFrom(goid)
}
