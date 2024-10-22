package mongodoc

import (
	"github.com/reearth/reearth-marketplace/server/pkg/id"
	"github.com/reearth/reearth-marketplace/server/pkg/user"
)

type OrganizationDocument struct {
	ID          string `bson:"id"`
	Name        string `bson:"name"`
	DisplayName string `bson:"displayName"`
	Description string `bson:"description"`
	Active      bool   `bson:"active"`
}

func NewOrganization(organization *user.Organization) *OrganizationDocument {
	return &OrganizationDocument{
		ID:          organization.ID().String(),
		Name:        organization.Name(),
		DisplayName: organization.DisplayName(),
		Description: organization.Description(),
		Active:      organization.Active(),
	}
}

func (d *OrganizationDocument) Model() (*user.Organization, error) {
	oid, err := id.OrganizationIDFrom(d.ID)
	if err != nil {
		return nil, err
	}
	return user.NewOrganization().
		ID(oid).
		Name(d.Name).
		DisplayName(d.DisplayName).
		Description(d.Description).
		Active(d.Active).
		Build(), nil
}
