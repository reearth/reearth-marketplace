package gql

import (
	"context"

	"github.com/reearth/reearth-marketplace/server/internal/adapter/gql/gqlmodel"
	"github.com/reearth/reearth-marketplace/server/internal/usecase/interfaces"
)

func (r *mutationResolver) UpdateMe(ctx context.Context, input gqlmodel.UpdateMeInput) (*gqlmodel.MePayload, error) {
	u, err := usecases(ctx).User.Update(ctx, getUser(ctx), interfaces.UpdateUserParam{
		Name:        input.Name,
		Lang:        input.Lang,
		DisplayName: input.DisplayName,
		Description: input.Description,
		Tel:         input.Tel,
	})
	if err != nil {
		return nil, err
	}
	return &gqlmodel.MePayload{
		Me: gqlmodel.ToMe(u),
	}, nil
}
