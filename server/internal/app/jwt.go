package app

import (
	"github.com/labstack/echo/v4"
	"github.com/reearth/reearth-marketplace/server/internal/adapter"
	"github.com/reearth/reearthx/appx"
)

// Validate the access token and inject the user clams into ctx
func jwtEchoMiddleware(cfg *ServerConfig) echo.MiddlewareFunc {
	mw, err := appx.AuthMiddleware([]appx.JWTProvider{
		{
			ISS: cfg.Config.Auth.ISS.String(),
			AUD: cfg.Config.Auth.AUD,
			ALG: &cfg.Config.Auth.ALG,
			TTL: cfg.Config.Auth.TTL,
		},
	}, adapter.ContextAuthInfo, true)
	if err != nil {
		panic(err)
	}
	return echo.WrapMiddleware(mw)
}
