package interactor

import (
	"context"
	"testing"

	"github.com/reearth/reearth-marketplace/server/internal/usecase/repo"
	"github.com/reearth/reearth-marketplace/server/pkg/id"
	"github.com/reearth/reearth-marketplace/server/pkg/user"
	"github.com/reearth/reearthx/rerror"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

type emptyResultUserRepo struct {
	repo.User
}

func (r *emptyResultUserRepo) FindByIDs(_ context.Context, _ id.UserIDList) ([]*user.User, error) {
	return nil, nil
}

// TestUser_FindByID_UnknownUserReturnsNotFound is a regression test for REL-03: FindByID
// indexed into the FindByIDs result with us[0] unconditionally, so a well-formed but unknown
// user ID (or a plugin whose publisher no longer exists) panicked with an index-out-of-range
// instead of returning a clean not-found error.
func TestUser_FindByID_UnknownUserReturnsNotFound(t *testing.T) {
	i := NewUser(&repo.Container{User: &emptyResultUserRepo{}})

	_, err := i.FindByID(context.Background(), id.NewUserID())
	require.Error(t, err)
	assert.ErrorIs(t, err, rerror.ErrNotFound)
}
