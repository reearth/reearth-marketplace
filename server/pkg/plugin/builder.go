package plugin

import (
	"time"

	"github.com/blang/semver"
	"github.com/reearth/reearth-marketplace/server/pkg/id"
	"github.com/samber/lo"
)

type Builder struct {
	p   Plugin
	err error
}

func New(publisherID id.UserID) *Builder {
	return &Builder{
		p: Plugin{
			publisherID:   publisherID,
			latestVersion: &PartialVersion{},
		},
	}
}

func (b *Builder) NewID(id string) *Builder {
	if b.err == nil {
		b.p.id, b.err = NewID(id)
	}
	return b
}
func (b *Builder) ID(id ID) *Builder {
	b.p.id = id
	return b
}
func (b *Builder) Type(pluginType string) *Builder {
	b.p.pluginType = pluginType
	return b
}
func (b *Builder) CreatedAt(createdAt time.Time) *Builder {
	b.p.createdAt = createdAt
	return b
}
func (b *Builder) UpdatedAt(updatedAt time.Time) *Builder {
	b.p.updatedAt = updatedAt
	return b
}
func (b *Builder) Tags(tags []string) *Builder {
	b.p.tags = tags
	return b
}
func (b *Builder) Active(active bool) *Builder {
	b.p.active = active
	return b
}
func (b *Builder) Images(images []string) *Builder {
	b.p.images = images
	return b
}
func (b *Builder) Downloads(downloads int64) *Builder {
	b.p.downloads = downloads
	return b
}
func (b *Builder) Like(like int64) *Builder {
	b.p.like = like
	return b
}
func (b *Builder) Core(core bool) *Builder {
	b.p.core = core
	return b
}

func (b *Builder) LatestVersion(latestVersion *PartialVersion) *Builder {
	b.p.latestVersion = latestVersion
	return b
}

func (b *Builder) Build() (*Plugin, error) {
	if b.err != nil {
		return nil, b.err
	}
	return &b.p, nil
}

func (b *Builder) MustBuild() *Plugin {
	return lo.Must(b.Build())
}

type VersionedBuilder struct {
	p   VersionedPlugin
	err error
}

func Versioned(plugin *Plugin) *VersionedBuilder {
	vid, _ := NewVersionID(plugin.ID(), plugin.latestVersion.version.String())
	return &VersionedBuilder{
		p: VersionedPlugin{
			plugin:  plugin,
			version: &Version{PartialVersion: *plugin.latestVersion, id: vid, active: true},
		},
	}
}

func (b *VersionedBuilder) Name(name string) *VersionedBuilder {
	b.p.version.name = name
	return b
}

func (b *VersionedBuilder) Version(version string) *VersionedBuilder {
	v, err := semver.Parse(version)
	if err != nil {
		b.err = err
		return b
	}
	b.p.version.version = v
	vid, err := NewVersionID(b.p.Plugin().ID(), version)
	if err != nil {
		b.err = err
		return b
	}
	b.p.version.id = vid
	return b
}

func (b *VersionedBuilder) Author(author string) *VersionedBuilder {
	b.p.version.author = author
	return b
}

func (b *VersionedBuilder) Repository(repository string) *VersionedBuilder {
	b.p.version.repository = repository
	return b
}

func (b *VersionedBuilder) Description(description string) *VersionedBuilder {
	b.p.version.description = description
	return b
}

func (b *VersionedBuilder) Readme(readme string) *VersionedBuilder {
	b.p.version.readme = readme
	return b
}

func (b *VersionedBuilder) Icon(icon string) *VersionedBuilder {
	b.p.version.icon = icon
	return b
}

func (b *VersionedBuilder) Downloads(downloads int64) *VersionedBuilder {
	b.p.version.downloads = downloads
	return b
}

func (b *VersionedBuilder) Active(active bool) *VersionedBuilder {
	b.p.version.active = active
	return b
}

func (b *VersionedBuilder) CreatedAt(createdAt time.Time) *VersionedBuilder {
	b.p.version.createdAt = createdAt
	return b
}

func (b *VersionedBuilder) UpdatedAt(updatedAt time.Time) *VersionedBuilder {
	b.p.version.updatedAt = updatedAt
	return b
}

func (b *VersionedBuilder) PublishedAt(publishedAt time.Time) *VersionedBuilder {
	b.p.version.publishedAt = publishedAt
	return b
}

func (b *VersionedBuilder) Checksum(checksum string) *VersionedBuilder {
	b.p.version.checksum = checksum
	return b
}

func (b *VersionedBuilder) Build() (*VersionedPlugin, error) {
	if b.err != nil {
		return nil, b.err
	}
	return &b.p, nil
}

type PartialVersionBuilder struct {
	p   *PartialVersion
	err error
}

func NewPartialVersion() *PartialVersionBuilder {
	return &PartialVersionBuilder{
		p: &PartialVersion{},
	}
}

func (b *PartialVersionBuilder) Name(name string) *PartialVersionBuilder {
	b.p.name = name
	return b
}

func (b *PartialVersionBuilder) Version(version string) *PartialVersionBuilder {
	if version == "" {
		return b
	}
	v, err := semver.Parse(version)
	if err != nil {
		b.err = err
		return b
	}
	b.p.version = v
	return b
}

func (b *PartialVersionBuilder) Author(author string) *PartialVersionBuilder {
	b.p.author = author
	return b
}

func (b *PartialVersionBuilder) Repository(repository string) *PartialVersionBuilder {
	b.p.repository = repository
	return b
}

func (b *PartialVersionBuilder) Description(description string) *PartialVersionBuilder {
	b.p.description = description
	return b
}

func (b *PartialVersionBuilder) Readme(readme string) *PartialVersionBuilder {
	b.p.readme = readme
	return b
}

func (b *PartialVersionBuilder) Icon(icon string) *PartialVersionBuilder {
	b.p.icon = icon
	return b
}

func (b *PartialVersionBuilder) CreatedAt(createdAt time.Time) *PartialVersionBuilder {
	b.p.createdAt = createdAt
	return b
}

func (b *PartialVersionBuilder) UpdatedAt(updatedAt time.Time) *PartialVersionBuilder {
	b.p.updatedAt = updatedAt
	return b
}

func (b *PartialVersionBuilder) PublishedAt(publishedAt time.Time) *PartialVersionBuilder {
	b.p.publishedAt = publishedAt
	return b
}

func (b *PartialVersionBuilder) Checksum(checksum string) *PartialVersionBuilder {
	b.p.checksum = checksum
	return b
}

func (b *PartialVersionBuilder) Build() (*PartialVersion, error) {
	if b.err != nil {
		return nil, b.err
	}
	return b.p, nil
}

type VersionBuilder struct {
	v *Version
}

func NewVersion(pv *PartialVersion) *VersionBuilder {
	return &VersionBuilder{
		v: &Version{
			PartialVersion: *pv,
		},
	}
}

func (b *VersionBuilder) ID(id VersionID) *VersionBuilder {
	b.v.id = id
	return b
}

func (b *VersionBuilder) Active(active bool) *VersionBuilder {
	b.v.active = active
	return b
}

func (b *VersionBuilder) Downloads(downloads int64) *VersionBuilder {
	b.v.downloads = downloads
	return b
}

func (b *VersionBuilder) Build() *Version {
	return b.v
}
