package repo

import "github.com/reearth/reearthx/usecasex"

type Container struct {
	User         User
	Organization Organization
	Plugin       Plugin
	Transaction  usecasex.Transaction
}
