package gqlmodel

import (
	"context"

	"github.com/reearth/reearth-marketplace/server/internal/adapter"
	"github.com/reearth/reearth-marketplace/server/internal/usecase/interfaces"
	"github.com/reearth/reearth-marketplace/server/pkg/id"
)

type User struct {
	id              id.UserID
	Name            string          `json:"name"`
	DisplayName     *string         `json:"displayName"`
	Description     *string         `json:"description"`
	OrganizationIds []string        `json:"organizationIds"`
	Organizations   []*Organization `json:"organizations"`
}

func (*User) IsNode()      {}
func (*User) IsPublisher() {}

func (u *User) ID() string {
	return u.id.String()
}

func (u *User) Plugins(ctx context.Context, first *int, last *int, before *string, after *string) (*PluginConnection, error) {
	ps, pageInfo, err := adapter.Usecases(ctx).Plugin.List(ctx,
		u.id,
		interfaces.ListPluginParam{
			First:      first,
			Last:       last,
			Before:     before,
			After:      after,
			ActiveOnly: true,
		},
	)
	if err != nil {
		return nil, err
	}
	var nodes []*Plugin
	for _, p := range ps {
		nodes = append(nodes, ToPlugin(ctx, p))
	}
	var edges []*PluginEdge
	for _, p := range ps {
		edges = append(edges, &PluginEdge{
			Cursor: "", // TODO:
			Node:   ToPlugin(ctx, p),
		})
	}
	return &PluginConnection{
		Edges: edges,
		Nodes: nodes,
		PageInfo: &PageInfo{
			StartCursor:     pageInfo.StartCursor.StringRef(),
			EndCursor:       pageInfo.EndCursor.StringRef(),
			HasNextPage:     pageInfo.HasNextPage,
			HasPreviousPage: pageInfo.HasPreviousPage,
		},
		TotalCount: pageInfo.TotalCount,
	}, nil
}
