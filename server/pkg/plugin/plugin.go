package plugin

import (
	"time"

	"github.com/blang/semver"
	"github.com/reearth/reearth-marketplace/server/pkg/id"
)

type Publisher interface {
	id.User | id.Organization
}

type Plugin struct {
	id            ID
	pluginType    string
	createdAt     time.Time
	updatedAt     time.Time
	tags          []string
	images        []string
	active        bool
	downloads     int64
	like          int64
	publisherID   id.UserID // TODO: organization の場合にも対応する必要があるが generics にすると repo などが実装できない
	core          bool
	latestVersion *PartialVersion
}

func (p *Plugin) ID() ID {
	if p == nil {
		return ID{}
	}
	return p.id
}

func (p *Plugin) Name() string {
	return p.latestVersion.name
}

func (p *Plugin) Type() string {
	return p.pluginType
}

func (p *Plugin) CreatedAt() time.Time {
	return p.createdAt
}

func (p *Plugin) UpdatedAt() time.Time {
	return p.updatedAt
}

func (p *Plugin) Tags() []string {
	return p.tags
}

func (p *Plugin) Active() bool {
	return p.active
}

func (p *Plugin) Images() []string {
	return p.images
}

func (p *Plugin) PublisherID() id.UserID {
	return p.publisherID
}

func (p *Plugin) Downloads() int64 {
	return p.downloads
}

func (p *Plugin) AddDownloads(add int64) {
	p.downloads += add
}

func (p *Plugin) Like() int64 {
	return p.like
}

func (p *Plugin) SetActive(active bool) (changed bool) {
	old := p.active
	p.active = active
	return old != active
}

func (p *Plugin) SetTags(tags []string) {
	p.tags = tags
}

func (p *Plugin) SetImages(images []string) {
	p.images = images
}

func (p *Plugin) AddLike(add int64) {
	p.like += add
}

func (p *Plugin) LatestVersion() *PartialVersion {
	return p.latestVersion
}

func (p *Plugin) SetLatestVersion(latestVersion *PartialVersion) {
	p.latestVersion = latestVersion
}

func (p *Plugin) SetUpdatedAt(updatedAt time.Time) {
	p.updatedAt = updatedAt
}

type Version struct {
	PartialVersion
	id        VersionID
	downloads int64
	active    bool
}

func (v *Version) ID() VersionID {
	return v.id
}

func (v *Version) Downloads() int64 {
	return v.downloads
}

func (v *Version) AddDownloads(add int64) {
	v.downloads += add
}

func (v *Version) Active() bool {
	return v.active
}

func (v *Version) SetActive(active bool) (changed bool) {
	old := v.active
	v.active = active
	return old != active
}

// PartialVersion is a subset type of Version for de-normalization.
type PartialVersion struct {
	name        string
	version     semver.Version
	author      string
	repository  string
	description string
	readme      string
	icon        string
	publishedAt time.Time
	checksum    string
	createdAt   time.Time
	updatedAt   time.Time
}

func (v *PartialVersion) Name() string {
	return v.name
}

func (v *PartialVersion) Version() semver.Version {
	return v.version
}

func (v *PartialVersion) Author() string {
	return v.author
}

func (v *PartialVersion) Repository() string {
	return v.repository
}

func (v *PartialVersion) Description() string {
	return v.description
}

func (v *PartialVersion) SetDescription(description string) (changed bool) {
	old := v.description
	v.description = description
	return old != description
}

func (v *PartialVersion) Readme() string {
	return v.readme
}

func (v *PartialVersion) Icon() string {
	return v.icon
}

func (v *PartialVersion) PublishedAt() time.Time {
	return v.publishedAt
}

func (v *PartialVersion) Checksum() string {
	return v.checksum
}

func (v *PartialVersion) CreatedAt() time.Time {
	return v.createdAt
}

func (v *PartialVersion) UpdatedAt() time.Time {
	return v.updatedAt
}

func (v *PartialVersion) SetUpdatedAt(updatedAt time.Time) {
	v.updatedAt = updatedAt
}

type VersionedPlugin struct {
	version *Version
	plugin  *Plugin
}

func (v *VersionedPlugin) Plugin() *Plugin {
	return v.plugin
}

func (v *VersionedPlugin) Version() *Version {
	return v.version
}
