package user

import (
	"strings"
)

type Auth struct {
	Provider string
	Sub      string
}

func AuthFromOIDCSub(sub string) Auth {
	provider, _, found := strings.Cut(sub, "|")
	if found {
		return Auth{Provider: provider, Sub: sub}
	} else {
		return Auth{Provider: "", Sub: sub}
	}
}
