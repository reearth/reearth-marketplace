package mongodoc

import (
	"github.com/reearth/reearth-marketplace/server/pkg/id"
	"github.com/reearth/reearth-marketplace/server/pkg/user"
)

type UserDocument struct {
	ID          string
	OIDCSub     string `bson:"oidcSub"`
	Name        string
	DisplayName string
	Description string
	Lang        string
}

func NewUser(u *user.User) (*UserDocument, string) {
	userID := u.ID().String()
	return &UserDocument{
		ID:          userID,
		OIDCSub:     u.Auth().Sub,
		Name:        u.Name(),
		DisplayName: u.DisplayName(),
		Description: u.Description(),
		Lang:        u.Lang().String(),
	}, userID
}

func (d *UserDocument) Model() (*user.User, error) {
	uid, err := id.UserIDFrom(d.ID)
	if err != nil {
		return nil, err
	}
	auth := user.AuthFromOIDCSub(d.OIDCSub)
	u, err := user.New().
		ID(uid).
		Auth(auth).
		Name(d.Name).
		DisplayName(d.DisplayName).
		Description(d.Description).
		LangFrom(d.Lang).
		Build()
	if err != nil {
		return nil, err
	}
	return u, nil
}
