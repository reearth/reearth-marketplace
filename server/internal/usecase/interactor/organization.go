package interactor

import (
	"context"
	"fmt"

	"github.com/reearth/reearth-marketplace/server/internal/usecase/interfaces"
	"github.com/reearth/reearth-marketplace/server/internal/usecase/repo"
	"github.com/reearth/reearth-marketplace/server/pkg/id"
	"github.com/reearth/reearth-marketplace/server/pkg/user"
)

type Organization struct {
	transaction      repo.Transaction
	organizationRepo repo.Organization
	userRepo         repo.User
}

func NewOrganization(r *repo.Container) interfaces.Organization {
	return &Organization{
		transaction:      r.Transaction,
		organizationRepo: r.Organization,
		userRepo:         r.User,
	}
}

func (o *Organization) Create(ctx context.Context, u *user.User, param *interfaces.CreateOrganizationParam) (_ *user.Organization, err error) {
	if u == nil {
		return nil, interfaces.ErrOperationDenied
	}

	description := ""
	if param.Description != nil {
		description = *param.Description
	}
	organization := user.NewOrganization().
		NewID().
		Name(param.Name).
		Description(description).
		Build()

	tx, err := o.transaction.Begin()
	if err != nil {
		return nil, err
	}
	defer func() {
		err2 := tx.End(ctx)
		if err == nil {
			err = err2
		}
	}()

	if err := o.organizationRepo.Save(ctx, organization); err != nil {
		return nil, err
	}

	ids, err := id.UserIDsFrom(param.Members)
	if err != nil {
		return nil, err
	}
	members := []id.UserID{
		u.ID(),
	}
	members = append(members, ids...)

	users, err := o.userRepo.FindByIDs(ctx, members)
	if err != nil {
		return nil, err
	}
	if len(users) != len(members) {
		return nil, fmt.Errorf("contain invalid member")
	}
	for _, u := range users {
		u.AddOrganization(organization.ID())
	}
	if err := o.userRepo.SaveAll(ctx, users); err != nil {
		return nil, err
	}
	tx.Commit()

	return organization, nil
}
