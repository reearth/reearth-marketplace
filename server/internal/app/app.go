package app

import (
	"github.com/labstack/echo/v4"
)

func initEcho(cfg *ServerConfig) *echo.Echo {
	e := echo.New()
	e.Debug = cfg.Debug
	e.HideBanner = true
	e.HidePort = true
	e.Use(
		jwtEchoMiddleware(cfg),
		authMiddleware(cfg),
	)
	return e
}
