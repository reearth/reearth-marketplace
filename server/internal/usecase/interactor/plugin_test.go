package interactor

import (
	"context"
	"testing"

	"github.com/reearth/reearth-marketplace/server/internal/usecase/interfaces"
	"github.com/reearth/reearth-marketplace/server/internal/usecase/repo"
	"github.com/reearth/reearth-marketplace/server/pkg/id"
	"github.com/reearth/reearth-marketplace/server/pkg/plugin"
	"github.com/reearth/reearth-marketplace/server/pkg/user"
	"github.com/reearth/reearthx/usecasex"
	"github.com/stretchr/testify/assert"
)

// fakePluginRepo implements repo.Plugin, backing only the methods UpdateVersion needs.
// Every other method panics if called, so an unexpected code path fails loudly.
type fakePluginRepo struct {
	repo.Plugin
	vp           *plugin.VersionedPlugin
	savedVersion *plugin.Version
}

func (r *fakePluginRepo) FindByVersion(_ context.Context, _ plugin.ID, _ string) (*plugin.VersionedPlugin, error) {
	return r.vp, nil
}

func (r *fakePluginRepo) SaveVersion(_ context.Context, v *plugin.Version) error {
	r.savedVersion = v
	return nil
}

func (r *fakePluginRepo) UpdateLatest(_ context.Context, p *plugin.Plugin) (*plugin.Plugin, error) {
	return p, nil
}

func newTestVersionedPlugin(t *testing.T, publisherID id.UserID) *plugin.VersionedPlugin {
	t.Helper()
	pv, err := plugin.NewPartialVersion().Version("1.0.0").Build()
	assert.NoError(t, err)
	pl, err := plugin.New(publisherID).NewID("some-plugin").LatestVersion(pv).Build()
	assert.NoError(t, err)
	vp, err := plugin.Versioned(pl).Version("1.0.0").Build()
	assert.NoError(t, err)
	return vp
}

func newTestUser(t *testing.T) *user.User {
	t.Helper()
	u, err := user.New().NewID().Build()
	assert.NoError(t, err)
	return u
}

func TestPlugin_UpdateVersion_RejectsNonOwner(t *testing.T) {
	owner := newTestUser(t)
	attacker := newTestUser(t)
	vp := newTestVersionedPlugin(t, owner.ID())

	fakeRepo := &fakePluginRepo{vp: vp}
	p := &Plugin{
		pluginRepo:  fakeRepo,
		transaction: &usecasex.NopTransaction{},
	}

	active := true
	_, err := p.UpdateVersion(context.Background(), attacker, interfaces.UpdatePluginVersionParam{
		PluginID: vp.Plugin().ID(),
		Version:  "1.0.0",
		Active:   &active,
	})

	assert.Error(t, err)
	assert.Nil(t, fakeRepo.savedVersion, "version must not be saved when the caller doesn't own the plugin")
}

func TestPlugin_UpdateVersion_AllowsOwner(t *testing.T) {
	owner := newTestUser(t)
	vp := newTestVersionedPlugin(t, owner.ID())

	fakeRepo := &fakePluginRepo{vp: vp}
	p := &Plugin{
		pluginRepo:  fakeRepo,
		transaction: &usecasex.NopTransaction{},
	}

	active := false
	_, err := p.UpdateVersion(context.Background(), owner, interfaces.UpdatePluginVersionParam{
		PluginID: vp.Plugin().ID(),
		Version:  "1.0.0",
		Active:   &active,
	})

	assert.NoError(t, err)
	assert.NotNil(t, fakeRepo.savedVersion, "version must be saved when the caller owns the plugin")
}
