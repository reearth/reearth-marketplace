package http

import (
	"context"
	"io"

	"github.com/reearth/reearth-marketplace/server/internal/usecase/interfaces"
	"github.com/reearth/reearth-marketplace/server/pkg/id"
)

type PluginController struct {
	usecase interfaces.Plugin
}

func NewPluginController(usecase interfaces.Plugin) *PluginController {
	return &PluginController{
		usecase: usecase,
	}
}

type DownloadPluginInput struct {
	PluginID id.PluginID
	Version  string
}

func (c *PluginController) DownloadPlugin(ctx context.Context, input DownloadPluginInput) (io.ReadCloser, error) {
	return c.usecase.Download(ctx, input.PluginID, input.Version)
}

// DryDonwloadPlugin only increases the download count.
func (c *PluginController) IncreasePluginDownloadCount(ctx context.Context, input DownloadPluginInput) error {
	return c.usecase.IncreaseDownloadCount(ctx, input.PluginID, input.Version)
}
