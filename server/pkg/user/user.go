package user

import (
	"encoding/binary"
	"fmt"
	"io"
	"math/rand"
	"regexp"

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

var urlSafeRe = regexp.MustCompile("^[a-zA-Z0-9._~-]+$")

func IsSafeName(name string) bool {
	return urlSafeRe.MatchString(name)
}

func RandomName(randReader io.Reader, n int) (string, error) {
	var seed [8]byte
	if _, err := io.ReadFull(randReader, seed[:]); err != nil {
		return "", fmt.Errorf("read rand: %w", err)
	}
	rng := rand.New(rand.NewSource(int64(binary.LittleEndian.Uint64(seed[:]))))
	alphabet := "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789._~-"
	b := make([]byte, n)
	for i := range b {
		b[i] = alphabet[rng.Intn(len(alphabet))]
	}
	return string(b), nil
}
