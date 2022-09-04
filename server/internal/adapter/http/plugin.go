package http

import (
	"context"

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

type DownloadPluginLatestInput struct {
	PluginID id.PluginID
}

type DownloadPluginOutput struct {
	Content []byte
}

func (c *PluginController) DownloadPlugin(ctx context.Context, input DownloadPluginInput) (DownloadPluginOutput, error) {
	b, err := c.usecase.Download(ctx, input.PluginID, input.Version)
	return DownloadPluginOutput{Content: b}, err
}

func (c *PluginController) DownloadPluginLatest(ctx context.Context, input DownloadPluginLatestInput) (DownloadPluginOutput, error) {
	b, err := c.usecase.DownloadLatest(ctx, input.PluginID)
	return DownloadPluginOutput{Content: b}, err
}
