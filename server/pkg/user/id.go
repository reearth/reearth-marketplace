package user

import (
	"github.com/reearth/reearth-marketplace/server/pkg/id"
)

type ID = id.UserID

var NewID = id.NewUserID

var ErrInvalidID = id.ErrInvalidID
