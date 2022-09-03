package repo

import (
	"context"

	"github.com/reearth/reearth-marketplace/server/pkg/user"
)

type Organization interface {
	Save(ctx context.Context, organization *user.Organization) error
}
