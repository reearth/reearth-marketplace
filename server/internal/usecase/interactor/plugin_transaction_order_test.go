package interactor

import (
	"context"
	"io"
	"os"
	"testing"

	"github.com/reearth/reearth-marketplace/server/internal/usecase/gateway"
	"github.com/reearth/reearth-marketplace/server/internal/usecase/interfaces"
	"github.com/reearth/reearth-marketplace/server/internal/usecase/repo"
	"github.com/reearth/reearth-marketplace/server/pkg/id"
	"github.com/reearth/reearth-marketplace/server/pkg/plugin"
	"github.com/reearth/reearth-marketplace/server/pkg/user"
	"github.com/reearth/reearthx/usecasex"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

// orderTrackingTransaction wraps NopTransaction and records whether Begin has
// been called, so tests can assert an upload happened before the transaction
// opened rather than inside it.
type orderTrackingTransaction struct {
	usecasex.NopTransaction
	began bool
}

func (t *orderTrackingTransaction) Begin(ctx context.Context) (usecasex.Tx, error) {
	t.began = true
	return t.NopTransaction.Begin(ctx)
}

type orderTrackingPluginRepo struct {
	repo.Plugin
	pl               *plugin.Plugin
	createCalledWith func(began bool)
	saveCalledWith   func(began bool)
	tx               *orderTrackingTransaction
}

func (r *orderTrackingPluginRepo) Create(_ context.Context, _ *plugin.VersionedPlugin) error {
	if r.createCalledWith != nil {
		r.createCalledWith(r.tx.began)
	}
	return nil
}

func (r *orderTrackingPluginRepo) FindByID(_ context.Context, _ plugin.ID, _ *id.UserID) (*plugin.Plugin, error) {
	return r.pl, nil
}

func (r *orderTrackingPluginRepo) Save(_ context.Context, _ *plugin.Plugin) error {
	if r.saveCalledWith != nil {
		r.saveCalledWith(r.tx.began)
	}
	return nil
}

type orderTrackingFileGateway struct {
	gateway.File
	uploadCalledWith func(began bool)
	tx               *orderTrackingTransaction
}

func (g *orderTrackingFileGateway) UploadPlugin(_ context.Context, _ plugin.VersionID, _ []byte) error {
	if g.uploadCalledWith != nil {
		g.uploadCalledWith(g.tx.began)
	}
	return nil
}

func (g *orderTrackingFileGateway) UploadImage(_ context.Context, _ io.ReadSeeker) (string, error) {
	if g.uploadCalledWith != nil {
		g.uploadCalledWith(g.tx.began)
	}
	return "image-name", nil
}

func TestPlugin_Create_UploadsBeforeTransaction(t *testing.T) {
	publisher, err := user.New().NewID().Build()
	require.NoError(t, err)

	tx := &orderTrackingTransaction{}
	var uploadBegan, createBegan *bool
	fileGateway := &orderTrackingFileGateway{
		uploadCalledWith: func(began bool) { uploadBegan = &began },
		tx:               tx,
	}
	pluginRepo := &orderTrackingPluginRepo{
		createCalledWith: func(began bool) { createBegan = &began },
		tx:               tx,
	}
	p := &Plugin{
		pluginRepo:  pluginRepo,
		file:        fileGateway,
		transaction: tx,
	}

	zipFile, err := os.Open("../../../pkg/plugin/pluginpack/testdata/test.zip")
	require.NoError(t, err)
	defer zipFile.Close()

	_, err = p.Create(context.Background(), publisher, zipFile, false)
	require.NoError(t, err)

	require.NotNil(t, uploadBegan)
	require.NotNil(t, createBegan)
	assert.False(t, *uploadBegan, "UploadPlugin must run before the transaction opens")
	assert.True(t, *createBegan, "Create must run inside the transaction")
}

func TestPlugin_Update_UploadsImagesBeforeTransaction(t *testing.T) {
	publisher, err := user.New().NewID().Build()
	require.NoError(t, err)
	pl := plugin.New(publisher.ID()).NewID("some-plugin").MustBuild()

	tx := &orderTrackingTransaction{}
	var uploadBegan, saveBegan *bool
	fileGateway := &orderTrackingFileGateway{
		uploadCalledWith: func(began bool) { uploadBegan = &began },
		tx:               tx,
	}
	pluginRepo := &orderTrackingPluginRepo{
		pl:             pl,
		saveCalledWith: func(began bool) { saveBegan = &began },
		tx:             tx,
	}
	p := &Plugin{
		pluginRepo:  pluginRepo,
		file:        fileGateway,
		transaction: tx,
	}

	_, err = p.Update(context.Background(), interfaces.UpdatePluginParam{
		Publisher: publisher,
		PluginID:  pl.ID(),
		Images:    []io.ReadSeeker{nil},
	})
	require.NoError(t, err)

	require.NotNil(t, uploadBegan)
	require.NotNil(t, saveBegan)
	assert.False(t, *uploadBegan, "UploadImage must run before the transaction opens")
	assert.True(t, *saveBegan, "Save must run inside the transaction")
}

func TestPlugin_Update_RejectsNonOwnerWithoutSaving(t *testing.T) {
	owner, err := user.New().NewID().Build()
	require.NoError(t, err)
	attacker, err := user.New().NewID().Build()
	require.NoError(t, err)
	pl := plugin.New(owner.ID()).NewID("some-plugin").MustBuild()

	tx := &orderTrackingTransaction{}
	fileGateway := &orderTrackingFileGateway{tx: tx}
	saveCalls := 0
	pluginRepo := &orderTrackingPluginRepo{
		pl:             pl,
		saveCalledWith: func(bool) { saveCalls++ },
		tx:             tx,
	}
	p := &Plugin{
		pluginRepo:  pluginRepo,
		file:        fileGateway,
		transaction: tx,
	}

	_, err = p.Update(context.Background(), interfaces.UpdatePluginParam{
		Publisher: attacker,
		PluginID:  pl.ID(),
	})
	require.Error(t, err)
	assert.Equal(t, 0, saveCalls)
}
