package interfaces

import (
	"context"

	"github.com/reearth/reearth-marketplace/server/pkg/user"
)

type Organization interface {
	Create(ctx context.Context, u *user.User, param *CreateOrganizationParam) (*user.Organization, error)
}

type CreateOrganizationParam struct {
	Name        string
	Description *string
	Members     []string
}
