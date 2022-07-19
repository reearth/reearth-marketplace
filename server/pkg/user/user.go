package user

import (
	"golang.org/x/text/language"
)

type User struct {
	id          ID
	name        string
	displayName string
	description string
	auth        Auth
	lang        language.Tag
}

func (u User) ID() ID              { return u.id }
func (u User) Name() string        { return u.name }
func (u User) DisplayName() string { return u.displayName }
func (u User) Description() string { return u.description }
func (u User) Auth() Auth          { return u.auth }
func (u User) Lang() language.Tag  { return u.lang }
