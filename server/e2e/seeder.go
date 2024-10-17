package e2e

import (
	"context"
	"time"

	"github.com/reearth/reearth-marketplace/server/internal/usecase/repo"
	"github.com/reearth/reearth-marketplace/server/pkg/id"
	"github.com/reearth/reearth-marketplace/server/pkg/user"
	"github.com/reearth/reearthx/idx"
	"github.com/reearth/reearthx/util"
)

var (
	oID          = user.NewOrganizationID()
	oName        = "e2e org"
	oDescription = "e2e org description"

	uID          = user.NewID()
	uName        = "e2e"
	uDispName    = "e2e naame"
	uDescription = "e2e description"

	now = time.Date(2022, time.January, 1, 0, 0, 0, 0, time.UTC)
)

func baseSeeder(ctx context.Context, r *repo.Container) error {
	defer util.MockNow(now)()

	o := user.NewOrganization().
		ID(oID).
		Name(oName).
		Description(oDescription).
		Build()

	if err := r.Organization.Save(ctx, o); err != nil {
		return err
	}

	u, err := user.New().
		ID(uID).
		Auth(user.AuthFromOIDCSub("reearth|" + uID.String())).
		Name(uName).
		DisplayName(uDispName).
		Description(uDescription).
		// LangFrom("").
		Organizations([]idx.ID[id.Organization]{oID}).
		Build()
	if err != nil {
		return err
	}
	if err := r.User.Save(ctx, u); err != nil {
		return err
	}

	return nil
}
