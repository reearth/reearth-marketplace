package user

import (
	"golang.org/x/text/language"
)

type Builder struct {
	u   *User
	err error
}

func New() *Builder {
	return &Builder{u: &User{}}
}

func (b *Builder) Build() (*User, error) {
	if b.err != nil {
		return nil, b.err
	}
	if b.u.id.IsNil() {
		return nil, ErrInvalidID
	}
	return b.u, nil
}

func (b *Builder) ID(id ID) *Builder {
	b.u.id = id
	return b
}

func (b *Builder) NewID() *Builder {
	b.u.id = NewID()
	return b
}

func (b *Builder) Name(name string) *Builder {
	b.u.name = name
	return b
}

func (b *Builder) DisplayName(displayName string) *Builder {
	b.u.displayName = displayName
	return b
}

func (b *Builder) Description(description string) *Builder {
	b.u.description = description
	return b
}

func (b *Builder) Auth(auth Auth) *Builder {
	b.u.auth = auth
	return b
}

func (b *Builder) Lang(lang language.Tag) *Builder {
	b.u.lang = lang
	return b
}

func (b *Builder) LangFrom(lang string) *Builder {
	if lang == "" {
		b.u.lang = language.Tag{}
	} else if l, err := language.Parse(lang); err == nil {
		b.u.lang = l
	} else {
		b.err = err
	}
	return b
}

func (b *Builder) Organizations(organizations []OrganizationID) *Builder {
	b.u.organizations = organizations
	return b
}
