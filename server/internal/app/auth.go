package app

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/reearth/reearth-marketplace/server/internal/adapter"
	"github.com/reearth/reearth-marketplace/server/internal/usecase/repo"
	"github.com/reearth/reearthx/appx"
)

// Validate the access token and inject the user clams into ctx
func jwtEchoMiddleware(cfg *ServerConfig) echo.MiddlewareFunc {
	mw, err := appx.AuthMiddleware(cfg.Config.AuthProviders(), adapter.ContextAuthInfo, true)
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
			}
			c.SetRequest(req.WithContext(ctx))
			return next(c)
		}
	}
}

func serverAuthMiddleware(cfg *ServerConfig) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			req := c.Request()
			ctx := req.Context()

			if sub := cfg.Config.Auth_M2M.Sub; sub != "" {
				ai := adapter.GetAuthInfo(ctx)
				if ai == nil || ai.Sub != sub {
					return c.NoContent(http.StatusUnauthorized)
				}
			}
			return next(c)
		}
	}
}
