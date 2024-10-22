package mongo

import (
	"context"
	"testing"
	"time"

	"github.com/reearth/reearth-marketplace/server/internal/infrastructure/mongo/mongodoc"
	"github.com/reearth/reearth-marketplace/server/internal/usecase/interfaces"
	"github.com/reearth/reearth-marketplace/server/pkg/id"
	"github.com/reearth/reearth-marketplace/server/pkg/plugin"
	"github.com/reearth/reearth-marketplace/server/pkg/user"
	"github.com/reearth/reearthx/mongox"
	"github.com/reearth/reearthx/mongox/mongotest"
	"github.com/reearth/reearthx/rerror"
	"github.com/stretchr/testify/assert"
	"go.mongodb.org/mongo-driver/bson"
)

func init() {
	mongotest.Env = "REEARTH_MARKETPLACE_DB"
}

func TestPlugin_FindByID(t *testing.T) {
	ctx := context.Background()
	db := mongotest.Connect(t)(t)
	r := NewPlugin(mongox.NewClientWithDatabase(db))

	uid := id.NewUserID()
	pid := id.MustPluginID("xxxxxx1aaas")

	pl, err := r.FindByID(ctx, pid, nil)
	assert.Equal(t, rerror.ErrNotFound, err)
	assert.Nil(t, pl)

	_, _ = db.Collection("plugin").InsertOne(ctx, bson.M{
		"id":          pid.String(),
		"publisherId": uid.String(),
		"active":      true,
	})

	pl, err = r.FindByID(ctx, pid, nil)
	assert.NoError(t, err)
	assert.Equal(t, plugin.New(uid).ID(pid).Active(true).MustBuild(), pl)

	_, _ = db.Collection("plugin").UpdateOne(ctx, bson.M{
		"id": pid.String(),
	}, bson.M{
		"$set": bson.M{"active": false},
	})

	pl, err = r.FindByID(ctx, pid, nil)
	assert.Equal(t, rerror.ErrNotFound, err)
	assert.Nil(t, pl)

	pl, err = r.FindByID(ctx, pid, uid.Ref())
	assert.NoError(t, err)
	assert.Equal(t, plugin.New(uid).ID(pid).Active(false).MustBuild(), pl)
}

func TestPlugin_FindByIDs(t *testing.T) {
	ctx := context.Background()
	db := mongotest.Connect(t)(t)
	r := NewPlugin(mongox.NewClientWithDatabase(db))

	uid := id.NewUserID()
	pid := id.MustPluginID("xxxxxx1aaas")
	pid2 := id.MustPluginID("xxxxxx1aaas2")

	pl, err := r.FindByIDs(ctx, []plugin.ID{pid}, nil)
	assert.Nil(t, err)
	assert.Nil(t, pl)

	_, _ = db.Collection("plugin").InsertOne(ctx, bson.M{
		"id":          pid.String(),
		"publisherId": uid.String(),
		"active":      true,
	})

	pl, err = r.FindByIDs(ctx, []plugin.ID{pid, pid2}, nil)
	assert.NoError(t, err)
	assert.Equal(t, []*plugin.Plugin{plugin.New(uid).ID(pid).Active(true).MustBuild()}, pl)

	_, _ = db.Collection("plugin").UpdateOne(ctx, bson.M{
		"id": pid.String(),
	}, bson.M{
		"$set": bson.M{"active": false},
	})

	pl, err = r.FindByIDs(ctx, []plugin.ID{pid}, nil)
	assert.Nil(t, err)
	assert.Nil(t, pl)

	pl, err = r.FindByIDs(ctx, []plugin.ID{pid}, uid.Ref())
	assert.NoError(t, err)
	assert.Equal(t, []*plugin.Plugin{plugin.New(uid).ID(pid).Active(false).MustBuild()}, pl)
}

func TestPlugin_Create(t *testing.T) {
	connect := mongotest.Connect(t)

	now1 := time.Now().UTC().Truncate(time.Millisecond)
	now2 := time.Now().Add(time.Second).UTC().Truncate(time.Millisecond)

	publisherID := user.NewID()

	version1, err := plugin.NewPartialVersion().
		Version("0.0.1").
		Name("Test Plugin").
		Author("tester").
		Description("plugin description").
		Readme("# test-plugin\n").
		CreatedAt(now1).
		UpdatedAt(now1).
		PublishedAt(now1).
		Build()
	assert.NoError(t, err)

	plugin1 := plugin.New(publisherID).
		NewID("test-plugin").
		Type("REEARTH").
		Active(false).
		Downloads(0).
		Like(0).
		Core(true).
		CreatedAt(now1).
		UpdatedAt(now1).
		LatestVersion(version1).
		MustBuild()

	versioned1, err := plugin.Versioned(plugin1).
		Downloads(0).
		Active(true).
		Build()
	assert.NoError(t, err)

	versioned2, err := plugin.Versioned(plugin1).
		Version("0.0.2").
		CreatedAt(now2).
		Description("plugin description 0.0.2").
		Readme("# test plugin 0.0.2\n").
		Downloads(0).
		Active(true).
		Build()
	assert.NoError(t, err)

	t.Run("New", func(t *testing.T) {
		db := connect(t)
		r := NewPlugin(mongox.NewClientWithDatabase(db)).(*pluginRepo)

		ctx := context.Background()

		if err := r.Create(ctx, versioned1); err != nil {
			t.Errorf("unexpected error: %v", err)
		}
		wantPluginDoc, wantVersionDoc := mongodoc.NewVersionedPlugin(versioned1)

		var pc mongox.SliceConsumer[mongodoc.PluginDocument]
		if err := r.pluginClient().FindOne(ctx, bson.M{"id": versioned1.Plugin().ID().String()}, &pc); err != nil {
			t.Errorf("find new plugin: %v", err)
		}
		assert.Equal(t, wantPluginDoc, &pc.Result[0])
		var pvc mongox.SliceConsumer[mongodoc.PluginVersionDocument]
		if err := r.pluginVersionClient().FindOne(ctx, bson.M{"id": versioned1.Version().ID().String()}, &pvc); err != nil {
			t.Errorf("find new plugin version: %v", err)
		}
		assert.Equal(t, wantVersionDoc, &pvc.Result[0])
	})
	t.Run("NewVersion", func(t *testing.T) {
		db := connect(t)
		r := NewPlugin(mongox.NewClientWithDatabase(db)).(*pluginRepo)

		ctx := context.Background()
		if err := r.Create(ctx, versioned1); err != nil {
			t.Errorf("create version 0.0.1: %v", err)
		}
		if err := r.Create(ctx, versioned2); err != nil {
			t.Errorf("create version 0.0.2: %v", err)
		}
		if _, err := r.UpdateLatest(ctx, versioned2.Plugin()); err != nil {
			t.Errorf("update latest: %v", err)
		}
		wantPluginDoc, wantVersionDoc := mongodoc.NewVersionedPlugin(versioned2)
		var pc mongox.SliceConsumer[mongodoc.PluginDocument]
		if err := r.pluginClient().FindOne(ctx, bson.M{"id": versioned2.Plugin().ID().String()}, &pc); err != nil {
			t.Errorf("find plugin: %v", err)
		}
		assert.Equal(t, wantPluginDoc, &pc.Result[0])
		var pvc mongox.SliceConsumer[mongodoc.PluginVersionDocument]
		if err := r.pluginVersionClient().FindOne(ctx, bson.M{"id": versioned2.Version().ID().String()}, &pvc); err != nil {
			t.Errorf("find new plugin version: %v", err)
		}
		assert.Equal(t, wantVersionDoc, &pvc.Result[0])
	})
	t.Run("KeepStatus", func(t *testing.T) {
		db := connect(t)
		r := NewPlugin(mongox.NewClientWithDatabase(db)).(*pluginRepo)
		ctx := context.Background()
		if err := r.Create(ctx, versioned1); err != nil {
			t.Errorf("create version 0.0.1: %v", err)
		}
		if err := r.pluginClient().UpdateMany(ctx,
			bson.M{"id": versioned2.Plugin().ID().String()},
			bson.M{"active": true, "downloads": 1000, "like": 10000},
		); err != nil {
			t.Errorf("update: %v", err)
		}
		if err := r.Create(ctx, versioned2); err != nil {
			t.Errorf("create version 0.0.2: %v", err)
		}
		var pc mongox.SliceConsumer[mongodoc.PluginDocument]
		if err := r.pluginClient().FindOne(ctx, bson.M{"id": versioned2.Plugin().ID().String()}, &pc); err != nil {
			t.Errorf("find plugin: %v", err)
		}
		pd := pc.Result[0]
		assert.Equal(t, true, pd.Active)
		assert.Equal(t, int64(1000), pd.Downloads)
		assert.Equal(t, int64(10000), pd.Like)
	})
	t.Run("ConflictVersion", func(t *testing.T) {
		db := connect(t)
		r := NewPlugin(mongox.NewClientWithDatabase(db)).(*pluginRepo)

		ctx := context.Background()
		if err := r.Create(ctx, versioned1); err != nil {
			t.Errorf("unexpected error: %v", err)
		}
		err := r.Create(ctx, versioned1)
		assert.ErrorContains(t, err, "version already exists")
	})
	t.Run("AlreadyUsed", func(t *testing.T) {
		db := connect(t)
		r := NewPlugin(mongox.NewClientWithDatabase(db)).(*pluginRepo)

		ctx := context.Background()
		if err := r.Create(ctx, versioned1); err != nil {
			t.Errorf("create version 0.0.1: %v", err)
		}

		otherID := user.NewID()
		plugin2 := plugin.New(otherID).
			ID(plugin1.ID()).
			LatestVersion(version1).
			MustBuild()

		versioned, err := plugin.Versioned(plugin2).Build()
		assert.NoError(t, err)
		err = r.Create(ctx, versioned)
		assert.ErrorContains(t, err, "plugin id already used")
	})
}

func Test_pluginRepo_Search(t *testing.T) {
	now1 := time.Now().UTC().Truncate(time.Millisecond)
	now2 := time.Now().Add(time.Second).UTC().Truncate(time.Millisecond)

	publisherID := user.NewID()

	version1, err := plugin.NewPartialVersion().
		Version("0.0.1").
		Name("Test Plugin").
		Author("tester").
		Description("plugin description").
		Readme("# test-plugin\n").
		CreatedAt(now1).
		UpdatedAt(now1).
		PublishedAt(now1).
		Build()
	assert.NoError(t, err)

	plugin1 := plugin.New(publisherID).
		NewID("test-plugin").
		Type("REEARTH").
		Active(true).
		Downloads(0).
		Like(0).
		Core(false).
		CreatedAt(now1).
		UpdatedAt(now1).
		LatestVersion(version1).
		MustBuild()

	version2, err := plugin.NewPartialVersion().
		Version("0.0.2").
		Name("Test Plugin 2").
		Author("tester").
		Description("plugin description 2").
		Readme("# test-plugin 2\n").
		CreatedAt(now2).
		UpdatedAt(now2).
		PublishedAt(now2).
		Build()
	assert.NoError(t, err)

	plugin2 := plugin.New(publisherID).
		NewID("test-plugin-2").
		Type("REEARTH").
		Active(true).
		Downloads(0).
		Like(0).
		Core(false).
		CreatedAt(now2).
		UpdatedAt(now2).
		LatestVersion(version2).
		MustBuild()

	versioned1, err := plugin.Versioned(plugin1).
		Downloads(0).
		Active(true).
		Build()
	assert.NoError(t, err)

	versioned2, err := plugin.Versioned(plugin2).
		Downloads(0).
		Active(true).
		Build()
	assert.NoError(t, err)

	connect := mongotest.Connect(t)
	t.Run("Pagination", func(t *testing.T) {
		ctx := context.Background()
		db := connect(t)
		r := NewPlugin(mongox.NewClientWithDatabase(db))
		if err := r.Create(ctx, versioned1); err != nil {
			t.Fatalf("failed to create versioned1: %v", err)
		}
		if err := r.Create(ctx, versioned2); err != nil {
			t.Fatalf("failed to create versioned2: %v", err)
		}
		first := 1
		sort := "PUBLISHEDAT_DESC"
		ps1, pi1, err := r.Search(ctx, nil, &interfaces.SearchPluginParam{
			First: &first,
			Sort:  sort,
		})
		if err != nil {
			t.Errorf("search: unexpected error: %v", err)
		}
		assert.Equal(t, int64(2), pi1.TotalCount)
		assert.Equal(t, 1, len(ps1))
		assert.Equal(t, versioned2, ps1[0])
		assert.Equal(t, true, pi1.HasNextPage)

		ps2, pi2, err := r.Search(ctx, nil, &interfaces.SearchPluginParam{
			First: &first,
			After: pi1.EndCursor.StringRef(),
			Sort:  sort,
		})
		if err != nil {
			t.Errorf("search with after: unexpected error: %v", err)
		}
		assert.Equal(t, 1, len(ps2))
		assert.Equal(t, versioned1, ps2[0])
		assert.Equal(t, false, pi2.HasNextPage)
	})

	t.Run("PaginationOffset", func(t *testing.T) {
		ctx := context.Background()
		db := connect(t)
		r := NewPlugin(mongox.NewClientWithDatabase(db))
		if err := r.Create(ctx, versioned1); err != nil {
			t.Fatalf("failed to create versioned1: %v", err)
		}
		if err := r.Create(ctx, versioned2); err != nil {
			t.Fatalf("failed to create versioned2: %v", err)
		}
		first := 1
		offset := 1
		sort := "PUBLISHEDAT_DESC"
		ps1, pi1, err := r.Search(ctx, nil, &interfaces.SearchPluginParam{
			First:  &first,
			Offset: &offset,
			Sort:   sort,
		})
		if err != nil {
			t.Errorf("search: unexpected error: %v", err)
		}
		assert.Equal(t, int64(2), pi1.TotalCount)
		assert.Equal(t, 1, len(ps1))
		assert.Equal(t, versioned1, ps1[0])
		assert.Equal(t, false, pi1.HasNextPage)
	})
}

func TestCorePlugin_FindByID(t *testing.T) {
	ctx := context.Background()
	db := mongotest.Connect(t)(t)
	r := NewPlugin(mongox.NewClientWithDatabase(db))

	uid := id.NewUserID()
	pid := id.MustPluginID("xxxxxx1aaas")

	pl, err := r.FindByID(ctx, pid, nil)
	assert.Equal(t, rerror.ErrNotFound, err)
	assert.Nil(t, pl)

	_, _ = db.Collection("plugin").InsertOne(ctx, bson.M{
		"id":          pid.String(),
		"publisherId": uid.String(),
		"active":      true,
		"core":        true,
	})

	pl, err = r.FindByID(ctx, pid, nil)
	assert.NoError(t, err)
	assert.Equal(t, plugin.New(uid).ID(pid).Active(true).MustBuild(), pl)

}
