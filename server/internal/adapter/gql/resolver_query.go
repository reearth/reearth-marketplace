package gql

import (
	"context"
	"fmt"
	"strings"

	"github.com/reearth/reearth-marketplace/server/internal/adapter/gql/gqlmodel"
	"github.com/reearth/reearth-marketplace/server/internal/usecase/interfaces"
	"github.com/reearth/reearth-marketplace/server/pkg/id"
	"github.com/samber/lo"
)

// Query returns QueryResolver implementation.
func (r *Resolver) Query() QueryResolver { return &queryResolver{r} }

type queryResolver struct{ *Resolver }

func (r *queryResolver) Me(ctx context.Context) (*gqlmodel.Me, error) {
	return gqlmodel.ToMe(getUser(ctx)), nil
}

func (r *queryResolver) Node(ctx context.Context, idStr string) (gqlmodel.Node, error) {
	kind, idStr, _ := strings.Cut(idStr, ":")
	switch kind {
	case "u":
		uid, err := id.UserIDFrom(idStr)
		if err != nil {
			return nil, err
		}
		u, err := usecases(ctx).User.FindByID(ctx, uid)
		if err != nil {
			return nil, err
		}
		return gqlmodel.ToUser(u), nil
	case "p":
		pid, err := id.PluginIDFrom(idStr)
		if err != nil {
			return nil, err
		}
		p, err := usecases(ctx).Plugin.FindByID(ctx, pid)
		if err != nil {
			return nil, err
		}
		return gqlmodel.ToPlugin(ctx, p), nil
	}
	return nil, fmt.Errorf("invalid id: %s", idStr)
}

func (r *queryResolver) Nodes(ctx context.Context, ids []string) ([]gqlmodel.Node, error) {
	panic("not implemented")
}

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
		TotalCount: pageInfo.TotalCount,
	}, nil
}
