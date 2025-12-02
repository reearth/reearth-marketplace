package gql

// THIS CODE WILL BE UPDATED WITH SCHEMA CHANGES. PREVIOUS IMPLEMENTATION FOR SCHEMA CHANGES WILL BE KEPT IN THE COMMENT SECTION. IMPLEMENTATION FOR UNCHANGED SCHEMA WILL BE KEPT.

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
	"github.com/reearth/reearth-marketplace/server/pkg/user"
	"github.com/reearth/reearthx/util"
	"github.com/samber/lo"
)

type Resolver struct{}

func NewResolver() *Resolver {
	return &Resolver{}
}

// Utility functions
func pluginIDFrom(s string) (id.PluginID, error) {
	return id.PluginIDFrom(s)
}

// UpdateMe is the resolver for the updateMe field.
func (r *mutationResolver) UpdateMe(ctx context.Context, input gqlmodel.UpdateMeInput) (*gqlmodel.MePayload, error) {
	u, err := usecases(ctx).User.Update(ctx, getUser(ctx), interfaces.UpdateUserParam{
		Name:        input.Name,
		Lang:        input.Lang,
		DisplayName: input.DisplayName,
		Description: input.Description,
		Tel:         input.Tel,
	})
	if err != nil {
		return nil, err
	}
	return &gqlmodel.MePayload{
		Me: gqlmodel.ToMe(u),
	}, nil
}

// ParsePlugin is the resolver for the parsePlugin field.
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

// CreatePlugin is the resolver for the createPlugin field.
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

// UpdatePlugin is the resolver for the updatePlugin field.
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

// DeletePlugin is the resolver for the deletePlugin field.
func (r *mutationResolver) DeletePlugin(ctx context.Context, input gqlmodel.DeletePluginInput) (*gqlmodel.DeletePluginPayload, error) {
	panic("not implemented")
}

// UpdateVersion is the resolver for the updateVersion field.
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

// DeleteVersion is the resolver for the deleteVersion field.
func (r *mutationResolver) DeleteVersion(ctx context.Context, input gqlmodel.DeleteVersionInput) (*gqlmodel.DeleteVersionPayload, error) {
	panic("not implemented")
}

// LikePlugin is the resolver for the likePlugin field.
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

// UnlikePlugin is the resolver for the unlikePlugin field.
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

// CreateOrganization is the resolver for the createOrganization field.
func (r *mutationResolver) CreateOrganization(ctx context.Context, input gqlmodel.CreateOrganizationInput) (*gqlmodel.OrganizationPayload, error) {
	organization, err := usecases(ctx).Organization.Create(ctx, getUser(ctx), &interfaces.CreateOrganizationParam{
		Name:        input.Name,
		Description: input.Description,
		Members:     input.Members,
	})
	if err != nil {
		return nil, err
	}
	return &gqlmodel.OrganizationPayload{
		Organization: gqlmodel.ToOrganization(organization),
	}, nil
}

// UpdateOrganization is the resolver for the updateOrganization field.
func (r *mutationResolver) UpdateOrganization(ctx context.Context, input gqlmodel.UpdateOrganizationInput) (*gqlmodel.OrganizationPayload, error) {
	panic("not implemented")
}

// DeleteOrganization is the resolver for the deleteOrganization field.
func (r *mutationResolver) DeleteOrganization(ctx context.Context, input gqlmodel.DeleteOrganizationInput) (*gqlmodel.DeleteOrganizationPayload, error) {
	panic("not implemented")
}

// Me is the resolver for the me field.
func (r *queryResolver) Me(ctx context.Context) (*gqlmodel.Me, error) {
	return gqlmodel.ToMe(getUser(ctx)), nil
}

// Node is the resolver for the node field.
func (r *queryResolver) Node(ctx context.Context, idStr string, typeArg gqlmodel.NodeType) (gqlmodel.Node, error) {
	switch typeArg {
	case gqlmodel.NodeTypeUser:
		uid, err := id.UserIDFrom(idStr)
		if err != nil {
			return nil, err
		}
		u, err := usecases(ctx).User.FindByID(ctx, uid)
		if err != nil {
			return nil, err
		}
		return gqlmodel.ToUser(u), nil
	case gqlmodel.NodeTypePlugin:
		pid, err := id.PluginIDFrom(idStr)
		if err != nil {
			return nil, err
		}
		p, err := usecases(ctx).Plugin.FindByID(ctx, pid, getUser(ctx).IDRef())
		if err != nil {
			return nil, err
		}
		return gqlmodel.ToPlugin(ctx, p), nil
	}
	return nil, fmt.Errorf("invalid id: %s", idStr)
}

// Nodes is the resolver for the nodes field.
func (r *queryResolver) Nodes(ctx context.Context, ids []string, typeArg gqlmodel.NodeType) ([]gqlmodel.Node, error) {
	switch typeArg {
	case gqlmodel.NodeTypeUser:
		uid, err := util.TryMap(ids, id.UserIDFrom)
		if err != nil {
			return nil, err
		}
		u, err := usecases(ctx).User.FindByIDs(ctx, uid)
		if err != nil {
			return nil, err
		}
		return util.Map(u, func(u *user.User) gqlmodel.Node { return gqlmodel.ToUser(u) }), nil
	case gqlmodel.NodeTypePlugin:
		pid, err := util.TryMap(ids, id.PluginIDFrom)
		if err != nil {
			return nil, err
		}
		p, err := usecases(ctx).Plugin.FindByIDs(ctx, pid, getUser(ctx).IDRef())
		if err != nil {
			return nil, err
		}
		return util.Map(p, func(p *plugin.VersionedPlugin) gqlmodel.Node { return gqlmodel.ToPlugin(ctx, p) }), nil
	}
	return nil, fmt.Errorf("invalid id: %s", ids)
}

// Plugins is the resolver for the plugins field.
func (r *queryResolver) Plugins(ctx context.Context, input gqlmodel.PluginsInput) (*gqlmodel.PluginConnection, error) {
	if input.Sort == nil {
		sort := gqlmodel.PluginSortPublishedatDesc
		input.Sort = &sort
	}
	ps, pageInfo, err := usecases(ctx).Plugin.Search(ctx, getUser(ctx), interfaces.SearchPluginParam{
		First:     input.First,
		Last:      input.Last,
		Before:    input.Before,
		After:     input.After,
		Offset:    input.Offset,
		Keyword:   input.Keyword,
		Liked:     input.Liked,
		Tags:      input.Tags,
		Types:     lo.Map(input.Types, func(x gqlmodel.PluginType, _ int) string { return x.String() }),
		Publisher: input.Publisher,
		Sort:      input.Sort.String(),
	})
	if err != nil {
		return nil, err
	}
	var nodes []*gqlmodel.Plugin
	for _, p := range ps {
		nodes = append(nodes, gqlmodel.ToPlugin(ctx, p))
	}
	var edges []*gqlmodel.PluginEdge
	for _, p := range ps {
		edges = append(edges, &gqlmodel.PluginEdge{
			Cursor: "", // TODO:
			Node:   gqlmodel.ToPlugin(ctx, p),
		})
	}
	return &gqlmodel.PluginConnection{
		Edges: edges,
		Nodes: nodes,
		PageInfo: &gqlmodel.PageInfo{
			StartCursor:     pageInfo.StartCursor.StringRef(),
			EndCursor:       pageInfo.EndCursor.StringRef(),
			HasNextPage:     pageInfo.HasNextPage,
			HasPreviousPage: pageInfo.HasPreviousPage,
		},
		TotalCount: int(pageInfo.TotalCount),
	}, nil
}

// Mutation returns MutationResolver implementation.
func (r *Resolver) Mutation() MutationResolver { return &mutationResolver{r} }

// Query returns QueryResolver implementation.
func (r *Resolver) Query() QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }

// !!! WARNING !!!
// The code below was going to be deleted when updating resolvers. It has been copied here so you have
// one last chance to move it out of harms way if you want. There are two reasons this happens:
//  - When renaming or deleting a resolver the old code will be put in here. You can safely delete
//    it when you're done.
//  - You have helper methods in this file. Move them out to keep these resolver files clean.
/*
	type Resolver struct{}
func NewResolver() ResolverRoot {
	return &Resolver{}
}
*/
