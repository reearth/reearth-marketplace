package id

import (
	"github.com/reearth/reearthx/idx"
)

type User struct{}

func (User) Type() string { return "user" }

type UserID = idx.ID[User]

var UserIDFrom = idx.From[User]

var NewUserID = idx.New[User]
