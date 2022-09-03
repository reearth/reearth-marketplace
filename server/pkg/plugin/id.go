package plugin

import (
	"github.com/reearth/reearth-marketplace/server/pkg/id"
)

type ID = id.PluginID

type VersionID = id.VersionID

type PublisherID = id.UserID // TODO: organization の場合にも対応する

var NewID = id.NewPluginID
var NewVersionID = id.NewVersionID

var MustID = id.MustPluginID

var IDFrom = id.PluginIDFrom

var IDFromRef = id.PluginIDFromRef

var ErrInvalidID = id.ErrInvalidID
