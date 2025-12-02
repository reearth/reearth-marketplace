package gqlmodel

import (
	"context"

	"github.com/reearth/reearth-marketplace/server/internal/adapter"
	"github.com/reearth/reearth-marketplace/server/internal/usecase/interfaces"
	"github.com/reearth/reearth-marketplace/server/pkg/id"
)

type Me struct {
	id          id.UserID
	Lang        *string `json:"lang"`
	Name        string  `json:"name"`
	DisplayName *string `json:"displayName"`
	Description *string `json:"description"`
	Tel         *string `json:"tel"`
	Publishable bool    `json:"publishable"`
}

func (*Me) IsPublisher() {}

func (m *Me) ID() string {
	return m.id.String()
}

func (m *Me) GetID() string {
	return m.id.String()
}

func (m *Me) GetName() string {
	return m.Name
}

func (m *Me) GetDisplayName() *string {
	return m.DisplayName
}

func (m *Me) GetDescription() *string {
	return m.Description
}

func (m *Me) GetPlugins() *PluginConnection {
	return nil
}

func (m *Me) Plugins(ctx context.Context, first *int, last *int, before *string, after *string, offset *int) (*PluginConnection, error) {
	ps, pageInfo, err := adapter.Usecases(ctx).Plugin.List(ctx,
		&m.id,
		interfaces.ListPluginParam{
			First:      first,
			Last:       last,
			Before:     before,
			After:      after,
			Offset:     offset,
			ActiveOnly: false,
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
		TotalCount: int(pageInfo.TotalCount),
	}, nil
}
