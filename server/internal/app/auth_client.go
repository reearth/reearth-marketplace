package app

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/reearth/reearth-marketplace/server/internal/adapter"
	"github.com/reearth/reearth-marketplace/server/internal/usecase/repo"
)

func authMiddleware(cfg *ServerConfig) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			req := c.Request()
			ctx := req.Context()

			au := adapter.GetAuthInfo(ctx)
			if au != nil {
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

			if sub := cfg.Config.MachineAuthSub; sub != "" {
				ai := adapter.GetAuthInfo(ctx)
				if ai == nil || ai.Sub != sub {
					return c.NoContent(http.StatusUnauthorized)
				}
			}
			return next(c)
		}
	}
}
