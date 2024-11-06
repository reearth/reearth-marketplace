package mongodoc

import (
	"time"

	"github.com/reearth/reearth-marketplace/server/pkg/id"
	"github.com/reearth/reearth-marketplace/server/pkg/plugin"
	"go.mongodb.org/mongo-driver/bson"
)

type PluginDocument struct {
	ID          string    `bson:"id"`
	Type        string    `bson:"type"`
	CreatedAt   time.Time `bson:"createdAt"`
	UpdatedAt   time.Time `bson:"updatedAt"`
	Active      bool      `bson:"active"`
	Core        bool      `bson:"core"`
	Tags        []string  `bson:"tags"`
	Images      []string  `bson:"images"`
	PublisherID string    `bson:"publisherId"`

	// materialized for search
	Name        string `bson:"name"`
	Author      string `bson:"author"`
	Description string `bson:"description"`
	Icon        string `bson:"icon"`
	Repository  string `bson:"repository"`

	// materialized for sort
	PublishedAt time.Time `bson:"publishedAt"`
	Downloads   int64     `bson:"downloads"`

	// materialized for read
	Readme        string `bson:"readme"`
	Like          int64  `bson:"like"`
	LatestVersion string `bson:"latestVersion"`
}

type PluginLikeDocument struct {
	PluginID string `bson:"pluginId"`
	UserID   string `bson:"userId"`
}

func NewPluginLike(userID id.UserID, pluginID id.PluginID) *PluginLikeDocument {
	return &PluginLikeDocument{
		PluginID: pluginID.String(),
		UserID:   userID.String(),
	}
}

type PluginVersionDocument struct {
	ID          string    `bson:"id"`
	PluginID    string    `bson:"pluginId"`
	Name        string    `bson:"name"`
	Version     string    `bson:"version"`
	Author      string    `bson:"author"`
	Repository  string    `bson:"repository"`
	Description string    `bson:"description"`
	Readme      string    `bson:"readme"`
	Icon        string    `bson:"icon"`
	Downloads   int64     `bson:"downloads"`
	Active      bool      `bson:"active"`
	CreatedAt   time.Time `bson:"createdAt"`
	UpdatedAt   time.Time `bson:"updatedAt"`
	PublishedAt time.Time `bson:"publishedAt"`
	Checksum    string    `bson:"checksum"`
}

func NewPlugin(p *plugin.Plugin) *PluginDocument {
	return &PluginDocument{
		ID:          p.ID().String(),
		Type:        p.Type(),
		CreatedAt:   p.CreatedAt(),
		UpdatedAt:   p.UpdatedAt(),
		Active:      p.Active(),
		Core:        p.Core(),
		Tags:        p.Tags(),
		Images:      p.Images(),
		PublisherID: p.PublisherID().String(),
		Downloads:   p.Downloads(),
		Like:        p.Like(),

		Name:          p.Name(),
		Author:        p.LatestVersion().Author(),
		Description:   p.LatestVersion().Description(),
		Icon:          p.LatestVersion().Icon(),
		Repository:    p.LatestVersion().Repository(),
		PublishedAt:   p.LatestVersion().PublishedAt(),
		Readme:        p.LatestVersion().Readme(),
		LatestVersion: p.LatestVersion().Version().String(),
	}
}

func NewVersionedPlugin(p *plugin.VersionedPlugin) (*PluginDocument, *PluginVersionDocument) {
	pluginDoc := &PluginDocument{
		ID:          p.Plugin().ID().String(),
		Type:        p.Plugin().Type(),
		CreatedAt:   p.Plugin().CreatedAt(),
		UpdatedAt:   p.Plugin().UpdatedAt(),
		Active:      p.Plugin().Active(),
		Core:        p.Plugin().Core(),
		Tags:        p.Plugin().Tags(),
		Images:      p.Plugin().Images(),
		PublisherID: p.Plugin().PublisherID().String(),
		Downloads:   p.Plugin().Downloads(),
		Like:        p.Plugin().Like(),

		Name:          p.Plugin().Name(),
		Author:        p.Version().Author(),
		Description:   p.Version().Description(),
		Icon:          p.Version().Icon(),
		Repository:    p.Version().Repository(),
		PublishedAt:   p.Version().PublishedAt(),
		Readme:        p.Version().Readme(),
		LatestVersion: p.Version().Version().String(),
	}
	pluginVersionDoc := &PluginVersionDocument{
		ID:          p.Version().ID().String(),
		PluginID:    pluginDoc.ID,
		Name:        p.Version().Name(),
		Version:     p.Version().Version().String(),
		Author:      p.Version().Author(),
		Repository:  p.Version().Repository(),
		Description: p.Version().Description(),
		Readme:      p.Version().Readme(),
		Icon:        p.Version().Icon(),
		Active:      p.Version().Active(),
		CreatedAt:   p.Version().CreatedAt(),
		UpdatedAt:   p.Version().UpdatedAt(),
		PublishedAt: p.Version().PublishedAt(),
		Checksum:    p.Version().Checksum(),
	}
	return pluginDoc, pluginVersionDoc
}

type PluginConsumer struct {
	Rows []*plugin.Plugin
}

func (c *PluginConsumer) Consume(raw bson.Raw) error {
	if raw == nil {
		return nil
	}
	var doc PluginDocument
	if err := bson.Unmarshal(raw, &doc); err != nil {
		return err
	}
	p, err := doc.Model()
	if err != nil {
		return err
	}
	c.Rows = append(c.Rows, p)
	return nil
}

func (d *PluginDocument) Model() (*plugin.Plugin, error) {
	pid, err := id.PluginIDFrom(d.ID)
	if err != nil {
		return nil, err
	}
	publisherID, err := id.UserIDFrom(d.PublisherID) // TODO: organization support
	if err != nil {
		return nil, err
	}
	latestVersion, err := plugin.NewPartialVersion().
		Name(d.Name).
		Version(d.LatestVersion).
		Author(d.Author).
		Repository(d.Repository).
		Description(d.Description).
		PublishedAt(d.PublishedAt).
		Readme(d.Readme).
		Icon(d.Icon).
		UpdatedAt(d.UpdatedAt).
		CreatedAt(d.CreatedAt).
		Checksum(""). // TODO: fill
		Build()
	if err != nil {
		return nil, err
	}

	return plugin.New(publisherID).
		ID(pid).
		Type(d.Type).
		CreatedAt(d.CreatedAt).
		UpdatedAt(d.UpdatedAt).
		Tags(d.Tags).
		Images(d.Images).
		Active(d.Active).
		Core(d.Core).
		Downloads(d.Downloads).
		Like(d.Like).
		LatestVersion(latestVersion).
		Build()
}

func (d *PluginVersionDocument) Model() (*plugin.Version, error) {
	vid, err := id.VersionIDFrom(d.ID)
	if err != nil {
		return nil, err
	}
	pv, err := plugin.NewPartialVersion().
		Version(d.Version).
		Author(d.Author).
		Repository(d.Repository).
		Description(d.Description).
		Readme(d.Readme).
		Icon(d.Icon).
		CreatedAt(d.CreatedAt).
		UpdatedAt(d.UpdatedAt).
		PublishedAt(d.PublishedAt).
		Checksum(d.Checksum).
		Build()
	if err != nil {
		return nil, err
	}
	return plugin.NewVersion(pv).
		ID(vid).
		Active(d.Active).
		Downloads(d.Downloads).
		Build(), nil
}

func NewVersion(v *plugin.Version) *PluginVersionDocument {
	return &PluginVersionDocument{
		ID:          v.ID().String(),
		PluginID:    v.ID().PluginID().String(),
		Version:     v.Version().String(),
		Author:      v.Author(),
		Repository:  v.Repository(),
		Description: v.Description(),
		Readme:      v.Readme(),
		Icon:        v.Icon(),
		Downloads:   v.Downloads(),
		Active:      v.Active(),
		CreatedAt:   v.CreatedAt(),
		UpdatedAt:   v.UpdatedAt(),
		PublishedAt: v.PublishedAt(),
		Checksum:    v.Checksum(),
	}
}
