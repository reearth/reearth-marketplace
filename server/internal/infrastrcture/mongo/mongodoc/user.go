package mongodoc

import (
	"github.com/reearth/reearth-marketplace/server/pkg/id"
	"github.com/reearth/reearth-marketplace/server/pkg/user"
	"go.mongodb.org/mongo-driver/bson"
)

type UserDocument struct {
	ID            string   `bson:"id"`
	OIDCSub       string   `bson:"oidcSub"`
	Name          string   `bson:"name"`
	DisplayName   string   `bson:"displayName"`
	Description   string   `bson:"description"`
	Lang          string   `bson:"lang"`
	Organizations []string `bson:"organizations"`
}

func NewUser(u *user.User) (*UserDocument, string) {
	userID := u.ID().String()
	return &UserDocument{
		ID:            userID,
		OIDCSub:       u.Auth().Sub,
		Name:          u.Name(),
		DisplayName:   u.DisplayName(),
		Description:   u.Description(),
		Lang:          u.Lang().String(),
		Organizations: u.Organizations().Strings(),
	}, userID
}

func NewUsers(users []*user.User) ([]string, []interface{}) {
	ids := make([]string, 0, len(users))
	docs := make([]interface{}, 0, len(users))
	for _, u := range users {
		doc, uid := NewUser(u)
		ids = append(ids, uid)
		docs = append(docs, doc)
	}
	return ids, docs
}

func (d *UserDocument) Model() (*user.User, error) {
	uid, err := id.UserIDFrom(d.ID)
	if err != nil {
		return nil, err
	}
	organizations, err := id.OrganizationIDsFrom(d.Organizations)
	if err != nil {
		return nil, err
	}
	return user.New().
		ID(uid).
		Auth(user.AuthFromOIDCSub(d.OIDCSub)).
		Name(d.Name).
		DisplayName(d.DisplayName).
		Description(d.Description).
		LangFrom(d.Lang).
		Organizations(organizations).
		Build()
}

type UserConsumer struct {
	Rows []*user.User
}

func (c *UserConsumer) Consume(raw bson.Raw) error {
	if raw == nil {
		return nil
	}
	var doc UserDocument
	if err := bson.Unmarshal(raw, &doc); err != nil {
		return err
	}
	p, err := doc.Model()
	if err != nil {
		return err
	}
	c.Rows = append(c.Rows, p)
	return nil
}
