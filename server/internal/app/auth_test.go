package app

import (
	"context"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/labstack/echo/v4"
	"github.com/reearth/reearth-marketplace/server/internal/adapter"
	"github.com/reearth/reearth-marketplace/server/internal/usecase/repo"
	"github.com/reearth/reearth-marketplace/server/pkg/user"
	"github.com/reearth/reearthx/appx"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

type callCountingUserRepo struct {
	repo.User
	findOrCreateCalls int
	u                 *user.User
}

func (r *callCountingUserRepo) FindOrCreate(_ context.Context, _ repo.AuthInfo) (*user.User, error) {
	r.findOrCreateCalls++
	return r.u, nil
}

// TestAuthMiddleware_CachesResolvedUser is a regression test for SCA-08: authMiddleware called
// FindOrCreate (a write-path upsert against the Mongo primary) on every authenticated request
// with no caching, so the primary's command rate scaled with total request rate instead of
// actual signups. This confirms repeated requests from the same account reuse the cached user
// instead of hitting FindOrCreate every time.
func TestAuthMiddleware_CachesResolvedUser(t *testing.T) {
	u, err := user.New().NewID().Build()
	require.NoError(t, err)
	userRepo := &callCountingUserRepo{u: u}

	cfg := &ServerConfig{
		Config: &Config{},
		Repos:  &repo.Container{User: userRepo},
	}

	mw := authMiddleware(cfg)
	handler := mw(func(c echo.Context) error {
		return c.NoContent(http.StatusOK)
	})

	for i := 0; i < 5; i++ {
		req := httptest.NewRequest(http.MethodGet, "/", nil)
		ctx := context.WithValue(req.Context(), adapter.ContextAuthInfo, appx.AuthInfo{Sub: "same-user-sub"})
		req = req.WithContext(ctx)
		rec := httptest.NewRecorder()
		e := echo.New()
		c := e.NewContext(req, rec)

		assert.NoError(t, handler(c))
	}

	assert.Equal(t, 1, userRepo.findOrCreateCalls, "repeated requests from the same account should reuse the cached user")
}
