package gqlmodel

import (
	"github.com/reearth/reearth-marketplace/server/pkg/user"
)

func ToMe(u *user.User) *Me {
	if u == nil {
		return nil
	}
	return &Me{
		id:          u.ID(),
		Lang:        strRef(u.Lang().String()),
		Name:        u.Name(),
		DisplayName: strRef(u.DisplayName()),
		Description: strRef(u.Description()),
		Tel:         strRef(""),
		Publishable: true, // TODO: publishable
	}
}

func ToUser(u *user.User) *User {
	if u == nil {
		return nil
	}
	return &User{
		id:              u.ID(),
		Name:            u.Name(),
		DisplayName:     strRef(u.DisplayName()),
		Description:     strRef(u.Description()),
		OrganizationIds: nil,
		Organizations:   nil,
	}
}
