package mongo

import (
	"context"

	"github.com/reearth/reearth-marketplace/server/internal/infrastrcture/mongo/mongodoc"
	"github.com/reearth/reearth-marketplace/server/internal/usecase/repo"
	"github.com/reearth/reearth-marketplace/server/pkg/user"
	"github.com/reearth/reearthx/mongox"
)

type organizationRepo struct {
	client *mongox.ClientCollection
}

func NewOrganization(client *mongox.Client) repo.Organization {
	r := &organizationRepo{client: client.WithCollection("organization")}
	r.init()
	return r
}

func (r *organizationRepo) init() {
	initIndexes(
		context.Background(),
		r.client,
		nil,
		[]string{"id", "name"},
	)
}

func (r *organizationRepo) Save(ctx context.Context, organization *user.Organization) error {
	doc := mongodoc.NewOrganization(organization)
	if err := r.client.SaveOne(ctx, doc.ID, doc); err != nil {
		return err
	}
	return nil
}
