package gql

import (
	"context"

	"github.com/reearth/reearth-marketplace/server/internal/adapter/gql/gqlmodel"
	"github.com/reearth/reearth-marketplace/server/internal/usecase/interfaces"
)

func (r *mutationResolver) CreateOrganization(ctx context.Context, input gqlmodel.CreateOrganizationInput) (*gqlmodel.OrganizationPayload, error) {
	organization, err := usecases(ctx).Organization.Create(ctx, getUser(ctx), &interfaces.CreateOrganizationParam{
		Name:        input.Name,
		Description: input.Description,
		Members:     input.Members,
	})
	if err != nil {
		return nil, err
	}
	return &gqlmodel.OrganizationPayload{
		Organization: gqlmodel.ToOrganization(organization),
	}, nil
}

func (r *mutationResolver) UpdateOrganization(ctx context.Context, input gqlmodel.UpdateOrganizationInput) (*gqlmodel.OrganizationPayload, error) {
	panic("not implemented")
}

func (r *mutationResolver) DeleteOrganization(ctx context.Context, input gqlmodel.DeleteOrganizationInput) (*gqlmodel.DeleteOrganizationPayload, error) {
	panic("not implemented")
}
