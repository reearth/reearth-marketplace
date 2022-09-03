package gql

import (
	"context"

	"github.com/reearth/reearth-marketplace/server/internal/adapter"
	"github.com/reearth/reearth-marketplace/server/internal/usecase/interfaces"
	"github.com/reearth/reearth-marketplace/server/pkg/user"
)

type ContextKey string

func AttachUsecases(ctx context.Context, u *interfaces.Container) context.Context {
	ctx = adapter.AttachUsecases(ctx, u)
	return ctx
}

func usecases(ctx context.Context) *interfaces.Container {
	return adapter.Usecases(ctx)
}

func getUser(ctx context.Context) *user.User {
	return adapter.User(ctx)
}
