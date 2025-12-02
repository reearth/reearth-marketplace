package app

import (
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/reearth/reearth-marketplace/server/internal/adapter"
	"github.com/reearth/reearth-marketplace/server/internal/usecase/repo"
	"github.com/reearth/reearth-marketplace/server/pkg/id"
	"github.com/reearth/reearthx/appx"
)

// Validate the access token and inject the user clams into ctx
func jwtEchoMiddleware(cfg *ServerConfig) echo.MiddlewareFunc {
	// In debug mode, skip JWT validation entirely if no auth providers configured
	if cfg.Debug && len(cfg.Config.AuthProviders()) == 0 {
		return func(next echo.HandlerFunc) echo.HandlerFunc {
			return next // No-op middleware
		}
	}
	
	// In debug mode, allow requests without valid JWT tokens for testing
	strict := !cfg.Debug
	mw, err := appx.AuthMiddleware(cfg.Config.AuthProviders(), adapter.ContextAuthInfo, strict)
	if err != nil {
		panic(err)
	}
	return echo.WrapMiddleware(mw)
}

func authMiddleware(cfg *ServerConfig) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			req := c.Request()
			ctx := req.Context()

			au := adapter.GetAuthInfo(ctx)
			if au != nil && (cfg.Config.Auth_M2M.Sub == "" || au.Sub != cfg.Config.Auth_M2M.Sub) {
				u, err := cfg.Repos.User.FindOrCreate(ctx, repo.AuthInfo{
					Sub:   au.Sub,
					Iss:   au.Iss,
					Token: au.Token,
				})
				if err != nil {
					return err
				}
				ctx = adapter.AttachUser(ctx, u)
			} else if cfg.Debug {
				// Used during E2E test
				if userID := c.Request().Header.Get("X-Reearth-Debug-User"); userID != "" {
					uId, err := id.UserIDFrom(userID)
					if err != nil {
						return fmt.Errorf("invalid debug user ID: %w", err)
					}
					users, err := cfg.Repos.User.FindByIDs(ctx, []id.UserID{uId})
					if err != nil {
						return fmt.Errorf("failed to find debug user: %w", err)
					}
					if len(users) == 0 {
						return fmt.Errorf("debug user not found: %s", userID)
					}
					ctx = adapter.AttachUser(ctx, users[0])
				}
			}

			c.SetRequest(req.WithContext(ctx))
			return next(c)
		}
	}
}

func serverAuthMiddleware(cfg *AuthM2MConfig) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			req := c.Request()
			ctx := req.Context()

			if cfg.Sub != "" {
				if ai := adapter.GetAuthInfo(ctx); ai == nil || ai.Sub != cfg.Sub {
					return c.NoContent(http.StatusUnauthorized)
				}
			}

			if cfg.Secret != "" && req.Header.Get("X-Reearth-Secret") != cfg.Secret {
				return c.NoContent(http.StatusUnauthorized)
			}

			return next(c)
		}
	}
}
