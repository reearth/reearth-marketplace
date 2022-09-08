package user

import (
	"golang.org/x/text/language"
)

type User struct {
	id            ID
	name          string
	displayName   string
	description   string
	auth          Auth
	lang          language.Tag
	organizations OrganizationIDs
}

func (u *User) ID() ID                         { return u.id }
func (u *User) Name() string                   { return u.name }
func (u *User) DisplayName() string            { return u.displayName }
func (u *User) Description() string            { return u.description }
func (u *User) Auth() Auth                     { return u.auth }
func (u *User) Lang() language.Tag             { return u.lang }
func (u *User) Organizations() OrganizationIDs { return u.organizations }

func (u *User) IDRef() *ID {
	if u == nil {
		return nil
	}
	return u.id.Ref()
}

func (u *User) SetName(name string) {
	u.name = name
}

func (u *User) SetDisplayName(displayName string) {
	u.displayName = displayName
}

func (u *User) SetDescription(description string) {
	u.description = description
}

func (u *User) SetLang(lang language.Tag) {
	u.lang = lang
}

func (u *User) AddOrganization(organizationID OrganizationID) {
	u.organizations.AddUniq(organizationID)
}
