package user

import (
	"strings"
)

type Auth struct {
	Provider string
	Sub      string
}

func AuthFromOIDCSub(oidcSub string) Auth {
	provider, _, found := strings.Cut(oidcSub, "|")
	if found {
		return Auth{Provider: provider, Sub: oidcSub}
	} else {
		return Auth{Provider: "", Sub: oidcSub}
	}
}
