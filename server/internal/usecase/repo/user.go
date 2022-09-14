package repo

import (
	"context"

	"github.com/reearth/reearth-marketplace/server/pkg/id"
	"github.com/reearth/reearth-marketplace/server/pkg/user"
)

type AuthInfo struct {
	Sub   string
	Iss   string
	Token string
}

type User interface {
	FindOrCreate(ctx context.Context, authInfo AuthInfo) (*user.User, error)
	FindByIDs(ctx context.Context, ids id.UserIDList) ([]*user.User, error)
	SaveAll(ctx context.Context, users []*user.User) error
	Save(ctx context.Context, user *user.User) error
}
