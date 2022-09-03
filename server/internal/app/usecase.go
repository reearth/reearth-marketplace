package app

import (
	"context"

	"github.com/labstack/echo/v4"
	"github.com/reearth/reearth-marketplace/server/internal/adapter"
	"github.com/reearth/reearth-marketplace/server/internal/usecase/gateway"
	"github.com/reearth/reearth-marketplace/server/internal/usecase/interactor"
	"github.com/reearth/reearth-marketplace/server/internal/usecase/repo"
)

func UsecaseMiddleware(r *repo.Container, g *gateway.Container) echo.MiddlewareFunc {
	return ContextMiddleware(func(ctx context.Context) context.Context {
		uc := interactor.NewContainer(r, g)
		ctx = adapter.AttachUsecases(ctx, &uc)
		return ctx
	})
}

func ContextMiddleware(fn func(ctx context.Context) context.Context) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			req := c.Request()
			c.SetRequest(req.WithContext(fn(req.Context())))
			return next(c)
		}
	}
}
