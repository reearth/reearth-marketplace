package interfaces

import (
	"context"

	"github.com/reearth/reearth-marketplace/server/pkg/user"
)

type User interface {
	Update(ctx context.Context, user *user.User, param UpdateUserParam) (*user.User, error)
}

type UpdateUserParam struct {
	Name        *string
	Lang        *string
	DisplayName *string
	Description *string
	Tel         *string
}
