package id

import (
	"github.com/reearth/reearthx/idx"
)

type User struct{}
type Plugin struct{}
type Organization struct{}
type Version struct{}

func (User) Type() string         { return "user" }
func (Plugin) Type() string       { return "plugin" }
func (Organization) Type() string { return "organization" }
func (Version) Type() string      { return "version" }

type UserID = idx.ID[User]

var UserIDFrom = idx.From[User]
var UserIDsFrom = idx.ListFrom[User]
var NewUserID = idx.New[User]

type UserIDList = idx.List[User]
type UserIDSet = idx.Set[User]

type OrganizationID = idx.ID[Organization]
type OrganizationIDList = idx.List[Organization]

var NewOrganizationID = idx.New[Organization]
var OrganizationIDFrom = idx.From[Organization]
var OrganizationIDsFrom = idx.ListFrom[Organization]
