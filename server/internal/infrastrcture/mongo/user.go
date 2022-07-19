package mongo

import (
	"context"

	"github.com/reearth/reearth-marketplace/server/internal/usecase/repo"
	"github.com/reearth/reearth-marketplace/server/pkg/id"
	"github.com/reearth/reearth-marketplace/server/pkg/user"
	"github.com/reearth/reearthx/mongox"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type userRepo struct {
	client *mongox.ClientCollection
}

func NewUser(client *mongox.Client) repo.User {
	r := &userRepo{client: client.WithCollection("user")}
	r.init()
	return r
}

func (u *userRepo) init() {
	u.client.CreateUniqueIndex(context.Background(), []string{"auth0sub"}, []string{"auth0sub"})
}

func (u *userRepo) FindOrCreate(ctx context.Context, auth0sub string) (*user.User, error) {
	u.client.Collection().
		FindOneAndUpdate(ctx,
			bson.M{"auth0sub": auth0sub},
			bson.M{"$setOnInsert": bson.M{
				"id":       id.NewUserID().String(),
				"auth0sub": auth0sub,
				"lang":     "und",
			}},
			options.FindOneAndUpdate().SetUpsert(true).SetReturnDocument(options.After),
		)
}
