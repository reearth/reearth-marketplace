package gqlmodel

import (
	"github.com/reearth/reearth-marketplace/server/pkg/user"
)

func ToMe(u *user.User) *Me {
	if u == nil {
		return nil
	}
	return &Me{
		ID:          u.ID().String(),
		Lang:        strRef(u.Lang().String()),
		Name:        u.Name(),
		DisplayName: strRef(u.DisplayName()),
		Description: strRef(u.Description()),
		Tel:         strRef(""),
		Publishable: true, // TODO: publishable
	}
}
