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
		// logger.AccessLogger(),
		middleware.CORSWithConfig(middleware.CORSConfig{
			AllowOrigins: cfg.Config.Origins,
		}),
		jwtEchoMiddleware(cfg),
		authMiddleware(cfg),
	)
	e.Use(UsecaseMiddleware(cfg.Repos, cfg.Gateways))
	e.POST("/api/graphql", GraphqlAPI(cfg.Config.GraphQL))
	e.GET("/api/plugins/:id/:version", DownloadPlugin())
	e.GET("/api/plugins/:id/latest.zip", DownloadPluginLatest())

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
