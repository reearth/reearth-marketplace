package adapter

import (
	"context"
	"sync"
	"testing"

	"github.com/reearth/reearth-marketplace/server/internal/usecase/interfaces"
	"github.com/reearth/reearth-marketplace/server/pkg/id"
	"github.com/reearth/reearth-marketplace/server/pkg/user"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

type batchCountingUserRepo struct {
	interfaces.User
	mu         sync.Mutex
	batchCalls int
	users      map[id.UserID]*user.User
}

func (r *batchCountingUserRepo) FindByIDs(_ context.Context, ids []id.UserID) ([]*user.User, error) {
	r.mu.Lock()
	r.batchCalls++
	r.mu.Unlock()
	out := make([]*user.User, 0, len(ids))
	for _, id := range ids {
		if u := r.users[id]; u != nil {
			out = append(out, u)
		}
	}
	return out, nil
}

// TestLoaders_User_BatchesConcurrentLoads is a regression test for SCA-01: Plugin.Publisher
// used to call User.FindByID once per plugin with no batching, so a list query fanned out
// to one sequential DB round trip per plugin. This confirms N concurrent loads for distinct
// users, plus a repeated load of one of them, collapse into a single FindByIDs call.
func TestLoaders_User_BatchesConcurrentLoads(t *testing.T) {
	u1, err := user.New().NewID().Build()
	require.NoError(t, err)
	u2, err := user.New().NewID().Build()
	require.NoError(t, err)
	u3, err := user.New().NewID().Build()
	require.NoError(t, err)

	repo := &batchCountingUserRepo{
		users: map[id.UserID]*user.User{
			u1.ID(): u1,
			u2.ID(): u2,
			u3.ID(): u3,
		},
	}
	usecases := &interfaces.Container{User: repo}

	ctx := AttachLoaders(context.Background(), usecases)
	loaders := GetLoaders(ctx)
	require.NotNil(t, loaders)

	ids := []id.UserID{u1.ID(), u2.ID(), u3.ID(), u1.ID()}
	var wg sync.WaitGroup
	got := make([]*user.User, len(ids))
	for i, uid := range ids {
		wg.Add(1)
		go func(i int, uid id.UserID) {
			defer wg.Done()
			result, err := loaders.User.Load(ctx, uid)()
			assert.NoError(t, err)
			got[i] = result
		}(i, uid)
	}
	wg.Wait()

	assert.Equal(t, 1, repo.batchCalls, "concurrent loads must collapse into a single FindByIDs call")
	assert.Equal(t, u1.ID(), got[0].ID())
	assert.Equal(t, u2.ID(), got[1].ID())
	assert.Equal(t, u3.ID(), got[2].ID())
	assert.Equal(t, u1.ID(), got[3].ID())
}
