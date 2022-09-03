package user

import (
	"github.com/reearth/reearth-marketplace/server/pkg/id"
)

type ID = id.UserID
type OrganizationID = id.OrganizationID
type OrganizationIDs = id.OrganizationIDList

var NewID = id.NewUserID
var NewOrganizationID = id.NewOrganizationID

var ErrInvalidID = id.ErrInvalidID
