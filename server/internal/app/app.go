package app

import (
	"errors"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/reearth/reearthx/log"
	"github.com/reearth/reearthx/rerror"
)

func initEcho(cfg *ServerConfig) *echo.Echo {
	e := echo.New()
	e.Debug = cfg.Debug
	e.HideBanner = true
	e.HidePort = true

	logger := log.NewEcho()
	e.Logger = logger
	e.HTTPErrorHandler = errorHandler(e.DefaultHTTPErrorHandler)

	e.Use(
		middleware.Recover(),
		logger.AccessLogger(),
		middleware.CORSWithConfig(middleware.CORSConfig{
			AllowOrigins: cfg.Config.Origins,
		}),
		jwtEchoMiddleware(cfg),
		authMiddleware(cfg),
		UsecaseMiddleware(cfg.Repos, cfg.Gateways),
		private,
	)

	e.GET("/api/ping", Ping())
	e.POST("/api/graphql", GraphqlAPI(cfg.Config.GraphQL))

	pluginAPI := e.Group("/api/plugins/:id")
	pluginAPI.Use(serverAuthMiddleware(&cfg.Config.Auth_M2M))
	pluginAPI.GET("/:version", DownloadPlugin())
	pluginAPI.POST("/:version/download", IncreasePluginDownloadCount())

	return e
}

func errorHandler(next func(error, echo.Context)) func(error, echo.Context) {
	return func(err error, c echo.Context) {
		if c.Response().Committed {
			return
		}

		code, msg := errorMessage(err, func(f string, args ...interface{}) {
			c.Echo().Logger.Errorf(f, args...)
		})
		if err := c.JSON(code, map[string]string{
			"error": msg,
		}); err != nil {
			next(err, c)
		}
	}
}

func errorMessage(err error, log func(string, ...interface{})) (int, string) {
	code := http.StatusBadRequest
	msg := err.Error()

	if err2, ok := err.(*echo.HTTPError); ok {
		code = err2.Code
		if msg2, ok := err2.Message.(string); ok {
			msg = msg2
		} else if msg2, ok := err2.Message.(error); ok {
			msg = msg2.Error()
		} else {
			msg = "error"
		}
		if err2.Internal != nil {
			log("echo internal err: %+v", err2)
		}
	} else if errors.Is(err, rerror.ErrNotFound) {
		code = http.StatusNotFound
		msg = "not found"
	} else {
		if ierr := rerror.UnwrapErrInternal(err); ierr != nil {
			code = http.StatusInternalServerError
			msg = "internal server error"
		}
	}

	return code, msg
}

func private(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		c.Response().Header().Set(echo.HeaderCacheControl, "private, no-store, no-cache, must-revalidate")
		return next(c)
	}
}
