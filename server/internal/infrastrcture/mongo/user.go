package mongo

import (
	"context"
	"fmt"

	"github.com/reearth/reearth-marketplace/server/internal/infrastrcture/mongo/mongodoc"
	"github.com/reearth/reearth-marketplace/server/internal/usecase/repo"
	"github.com/reearth/reearth-marketplace/server/pkg/id"
	"github.com/reearth/reearth-marketplace/server/pkg/user"
	"github.com/reearth/reearthx/mongox"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
	"golang.org/x/text/language"
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
	u.client.CreateUniqueIndex(context.Background(), []string{"oidcSub"}, []string{"oidcSub"})
}

func (u *userRepo) FindOrCreate(ctx context.Context, oidcSub string) (*user.User, error) {
	newUser, err := user.New().
		NewID().
		Auth(user.AuthFromOIDCSub(oidcSub)).
		Lang(language.Und).
		Build()
	if err != nil {
		return nil, fmt.Errorf("new user: %w", err)
	}

	var userDoc mongodoc.UserDocument
	newUserDoc, _ := mongodoc.NewUser(newUser)
	if err := u.client.Collection().
		FindOneAndUpdate(ctx,
			bson.M{"oidcSub": oidcSub},
			bson.M{"$setOnInsert": newUserDoc},
			options.FindOneAndUpdate().SetUpsert(true).SetReturnDocument(options.After),
		).
		Decode(&userDoc); err != nil {
		return nil, fmt.Errorf("find user: %w", err)
	}
	return userDoc.Model()
}

func (u *userRepo) FindByIDs(ctx context.Context, ids id.UserIDList) ([]*user.User, error) {
	if len(ids) == 0 {
		return nil, nil
	}
	filter := bson.M{
		"id": bson.M{
			"$in": ids.Strings(),
		},
	}
	c := mongodoc.UserConsumer{
		Rows: make([]*user.User, 0, len(ids)),
	}
	if err := u.client.Find(ctx, filter, &c); err != nil {
		return nil, err
	}
	return c.Rows, nil
}

func (u *userRepo) SaveAll(ctx context.Context, users []*user.User) error {
	ids, docs := mongodoc.NewUsers(users)
	if err := u.client.SaveAll(ctx, ids, docs); err != nil {
		return err
	}
	return nil
}

func (u *userRepo) Save(ctx context.Context, user *user.User) error {
	doc, uid := mongodoc.NewUser(user)
	if err := u.client.SaveOne(ctx, uid, doc); err != nil {
		return err
	}
	return nil
}
