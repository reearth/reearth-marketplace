package app

import (
	nhttp "net/http"
	"strings"

	"github.com/labstack/echo/v4"
	"github.com/reearth/reearth-marketplace/server/internal/adapter"
	"github.com/reearth/reearth-marketplace/server/internal/adapter/http"
	"github.com/reearth/reearth-marketplace/server/pkg/id"
	"github.com/reearth/reearthx/rerror"
)

func Ping() echo.HandlerFunc {
	return func(c echo.Context) error {
		return c.JSON(nhttp.StatusOK, "pong")
	}
}

func DownloadPlugin() echo.HandlerFunc {
	return func(c echo.Context) error {
		idStr := c.Param("id")
		if idStr == "" {
			return rerror.ErrNotFound
		}
		version := strings.TrimSuffix(c.Param("version"), ".zip")
		if version == "" {
			return rerror.ErrNotFound
		}
		pid, err := id.PluginIDFrom(idStr)
		if err != nil {
			return rerror.ErrNotFound
		}
		pc := pluginController(c)
		output, err := pc.DownloadPlugin(c.Request().Context(), http.DownloadPluginInput{
			PluginID: pid,
			Version:  version,
		})
		if err != nil {
			return err
		}
		defer func() {
			_ = output.Close()
		}()
		return c.Stream(200, "application/zip", output)
	}
}

func IncreasePluginDownloadCount() echo.HandlerFunc {
	return func(c echo.Context) error {
		idStr := c.Param("id")
		if idStr == "" {
			return rerror.ErrNotFound
		}
		version := strings.TrimSuffix(c.Param("version"), ".zip")
		if version == "" {
			return rerror.ErrNotFound
		}
		pid, err := id.PluginIDFrom(idStr)
		if err != nil {
			return rerror.ErrNotFound
		}
		pc := pluginController(c)
		if err := pc.IncreasePluginDownloadCount(c.Request().Context(), http.DownloadPluginInput{
			PluginID: pid,
			Version:  version,
		}); err != nil {
			return err
		}
		return c.NoContent(200)
	}
}

func pluginController(c echo.Context) *http.PluginController {
	uc := adapter.Usecases(c.Request().Context())
	return http.NewPluginController(uc.Plugin)
}
