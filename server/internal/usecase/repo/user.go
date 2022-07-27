package repo

import (
	"context"

	"github.com/reearth/reearth-marketplace/server/pkg/user"
)

type User interface {
	FindOrCreate(ctx context.Context, oidcSub string) (*user.User, error)
}
