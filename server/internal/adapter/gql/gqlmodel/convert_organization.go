package gqlmodel

import (
	"github.com/reearth/reearth-marketplace/server/pkg/user"
)

func ToOrganization(o *user.Organization) *Organization {
	if o == nil {
		return nil
	}
	return &Organization{
		ID:          o.ID().String(),
		Name:        o.Name(),
		DisplayName: strRef(o.DisplayName()),
		Description: strRef(o.Description()),
		Active:      o.Active(),
		// TODO: fill
		Plugins:   nil,
		MemberIds: nil,
		Members:   nil,
	}
}
