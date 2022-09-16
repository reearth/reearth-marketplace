package mongo

import (
	"context"
	"testing"

	"github.com/reearth/reearth-marketplace/server/pkg/id"
	"github.com/reearth/reearth-marketplace/server/pkg/plugin"
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
