package app

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func initEcho(cfg *ServerConfig) *echo.Echo {
	e := echo.New()
	e.Debug = cfg.Debug
	e.HideBanner = true
	e.HidePort = true
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: cfg.Config.Origins,
	}))
	e.Use(
		jwtEchoMiddleware(cfg),
		authMiddleware(cfg),
	)
	e.Use(UsecaseMiddleware(cfg.Repos, cfg.Gateways))
	e.POST("/api/graphql", GraphqlAPI(cfg.Config.GraphQL))
	e.GET("/api/plugins/:id/:version", DownloadPlugin())
	e.GET("/api/plugins/:id/latest.zip", DownloadPluginLatest())

	return e
}
