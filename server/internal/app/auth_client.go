package app

import (
	"github.com/labstack/echo/v4"
	"github.com/reearth/reearth-marketplace/server/internal/adapter"
)

func authMiddleware(cfg *ServerConfig) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			req := c.Request()
			ctx := req.Context()

			au := adapter.GetAuthInfo(ctx)
			if au != nil {
				u, err := cfg.Repos.User.FindOrCreate(ctx, au.Sub)
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
