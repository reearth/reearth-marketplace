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
		return c.Blob(200, "application/zip", output.Content)
	}
}

func DownloadPluginLatest() echo.HandlerFunc {
	return func(c echo.Context) error {
		idStr := c.Param("id")
		if idStr == "" {
			return rerror.ErrNotFound
		}
		pid, err := id.PluginIDFrom(idStr)
		if err != nil {
			return rerror.ErrNotFound
		}
		pc := pluginController(c)
		output, err := pc.DownloadPluginLatest(c.Request().Context(), http.DownloadPluginLatestInput{
			PluginID: pid,
		})
		if err != nil {
			return err
		}
		return c.Blob(200, "application/zip", output.Content)
	}
}

func pluginController(c echo.Context) *http.PluginController {
	uc := adapter.Usecases(c.Request().Context())
	return http.NewPluginController(uc.Plugin)
}
