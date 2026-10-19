package interactor

import (
	"context"
	"errors"
	"io"
	"testing"

	"github.com/reearth/reearth-marketplace/server/internal/usecase/gateway"
	"github.com/reearth/reearth-marketplace/server/internal/usecase/repo"
	"github.com/reearth/reearth-marketplace/server/pkg/plugin"
	"github.com/reearth/reearth-marketplace/server/pkg/user"
	"github.com/reearth/reearthx/usecasex"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

type downloadCountingPluginRepo struct {
	repo.Plugin
	vp             *plugin.VersionedPlugin
	incrementCalls int
	incrementErr   error
}

func (r *downloadCountingPluginRepo) FindByVersion(_ context.Context, _ plugin.ID, _ string) (*plugin.VersionedPlugin, error) {
	return r.vp, nil
}

func (r *downloadCountingPluginRepo) IncrementDownloads(_ context.Context, _ plugin.ID, _ plugin.VersionID) error {
	r.incrementCalls++
	return r.incrementErr
}

type fakeFileGateway struct {
	gateway.File
	downloadCalls int
	downloadErr   error
}

func (g *fakeFileGateway) DownloadPlugin(_ context.Context, _ plugin.VersionID) (io.ReadCloser, error) {
	g.downloadCalls++
	if g.downloadErr != nil {
		return nil, g.downloadErr
	}
	return io.NopCloser(nil), nil
}

func testVersionedPluginForDownload(t *testing.T) *plugin.VersionedPlugin {
	t.Helper()
	publisher, err := user.New().NewID().Build()
	require.NoError(t, err)
	pv, err := plugin.NewPartialVersion().Version("1.0.0").Build()
	require.NoError(t, err)
	pl, err := plugin.New(publisher.ID()).NewID("some-plugin").LatestVersion(pv).Build()
	require.NoError(t, err)
	vp, err := plugin.Versioned(pl).Version("1.0.0").Build()
	require.NoError(t, err)
	return vp
}

func TestPlugin_IncreaseDownloadCount_UsesAtomicIncrement(t *testing.T) {
	vp := testVersionedPluginForDownload(t)
	pluginRepo := &downloadCountingPluginRepo{vp: vp}
	fileGateway := &fakeFileGateway{}
	p := &Plugin{
		pluginRepo:  pluginRepo,
		file:        fileGateway,
		transaction: &usecasex.NopTransaction{},
	}

	err := p.IncreaseDownloadCount(context.Background(), vp.Plugin().ID(), vp.Version().Version().String())
	require.NoError(t, err)

	assert.Equal(t, 1, pluginRepo.incrementCalls)
	assert.Equal(t, 0, fileGateway.downloadCalls, "IncreaseDownloadCount must not fetch the file")
}

func TestPlugin_Download_SkipsFileFetchWhenIncrementFails(t *testing.T) {
	vp := testVersionedPluginForDownload(t)
	pluginRepo := &downloadCountingPluginRepo{incrementErr: errors.New("db unavailable")}
	fileGateway := &fakeFileGateway{}
	p := &Plugin{
		pluginRepo:  pluginRepo,
		file:        fileGateway,
		transaction: &usecasex.NopTransaction{},
	}

	_, err := p.download(context.Background(), vp, false)
	require.Error(t, err)
	assert.Equal(t, 0, fileGateway.downloadCalls, "a failed increment must not still fetch the file")
}
