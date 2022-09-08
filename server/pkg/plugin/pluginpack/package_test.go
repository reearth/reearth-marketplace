package pluginpack

import (
	"context"
	"os"
	"testing"

	"github.com/reearth/reearth-marketplace/server/pkg/id"
	"github.com/samber/lo"
	"github.com/stretchr/testify/assert"
)

func TestPluginPackage(t *testing.T) {
	file := lo.Must(os.Open("testdata/test.zip"))
	defer func() {
		_ = file.Close()
	}()

	p, err := PackageFromZip(file, 100000)
	assert.NoError(t, err)

	pl, err := ToPlugin(context.Background(), p, id.NewUserID())
	assert.NoError(t, err)
	assert.Equal(t, id.MustPluginID("testplugin"), pl.Plugin().ID())
}
