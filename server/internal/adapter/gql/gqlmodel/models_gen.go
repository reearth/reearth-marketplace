// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package gqlmodel

import (
	"fmt"
	"io"
	"strconv"
	"time"

	"github.com/99designs/gqlgen/graphql"
)

type Node interface {
	IsNode()
}

type Publisher interface {
	IsPublisher()
}

type CreateOrganizationInput struct {
	Name        string   `json:"name"`
	Description *string  `json:"description"`
	Members     []string `json:"members"`
}

type CreatePluginInput struct {
	File      *graphql.Upload `json:"file"`
	Repo      *string         `json:"repo"`
	Publisher *string         `json:"publisher"`
	Core      *bool           `json:"core"`
}

type DeleteOrganizationInput struct {
	OrganizationID string `json:"organizationId"`
}

type DeleteOrganizationPayload struct {
	OrganizationID string `json:"organizationId"`
}

type DeletePluginInput struct {
	PluginID string `json:"pluginId"`
}

type DeletePluginPayload struct {
	PluginID string `json:"pluginId"`
}

type DeleteVersionInput struct {
	VersionID string `json:"versionId"`
}

type DeleteVersionPayload struct {
	VersionID string `json:"versionId"`
}

type LikePluginInput struct {
	PluginID string `json:"pluginId"`
}

type MePayload struct {
	Me *Me `json:"me"`
}

type Organization struct {
	ID          string            `json:"id"`
	Name        string            `json:"name"`
	DisplayName *string           `json:"displayName"`
	Description *string           `json:"description"`
	Active      bool              `json:"active"`
	Plugins     *PluginConnection `json:"plugins"`
	MemberIds   []string          `json:"memberIds"`
	Members     []*User           `json:"members"`
}

func (Organization) IsNode()      {}
func (Organization) IsPublisher() {}

type OrganizationPayload struct {
	Organization *Organization `json:"organization"`
}

type PageInfo struct {
	StartCursor     *string `json:"startCursor"`
	EndCursor       *string `json:"endCursor"`
	HasNextPage     bool    `json:"hasNextPage"`
	HasPreviousPage bool    `json:"hasPreviousPage"`
}

type PluginConnection struct {
	Edges      []*PluginEdge `json:"edges"`
	Nodes      []*Plugin     `json:"nodes"`
	PageInfo   *PageInfo     `json:"pageInfo"`
	TotalCount int           `json:"totalCount"`
}

type PluginEdge struct {
	Cursor string  `json:"cursor"`
	Node   *Plugin `json:"node"`
}

type PluginPayload struct {
	Plugin *Plugin `json:"plugin"`
}

type PluginsInput struct {
	First     *int         `json:"first"`
	Last      *int         `json:"last"`
	Before    *string      `json:"before"`
	After     *string      `json:"after"`
	Offset    *int         `json:"offset"`
	Keyword   *string      `json:"keyword"`
	Liked     *bool        `json:"liked"`
	Tags      []string     `json:"tags"`
	Types     []PluginType `json:"types"`
	Publisher *string      `json:"publisher"`
	Sort      *PluginSort  `json:"sort"`
}

type UnlikePluginInput struct {
	PluginID string `json:"pluginId"`
}

type UpdateMeInput struct {
	Name        *string `json:"name"`
	Lang        *string `json:"lang"`
	DisplayName *string `json:"displayName"`
	Description *string `json:"description"`
	Tel         *string `json:"tel"`
}

type UpdateOrganizationInput struct {
	OrganizationID string   `json:"organizationId"`
	Name           *string  `json:"name"`
	Description    *string  `json:"description"`
	Active         *bool    `json:"active"`
	NewMembers     []string `json:"newMembers"`
	DeletedMembers []string `json:"deletedMembers"`
}

type UpdatePluginInput struct {
	PluginID    string            `json:"pluginId"`
	Active      *bool             `json:"active"`
	Images      []*graphql.Upload `json:"images"`
	NewTags     []string          `json:"newTags"`
	DeletedTags []string          `json:"deletedTags"`
}

type UpdateVersionInput struct {
	PluginID    string  `json:"pluginId"`
	Version     string  `json:"version"`
	Description *string `json:"description"`
	Active      *bool   `json:"active"`
}

type Version struct {
	Version     string    `json:"version"`
	Description string    `json:"description"`
	Downloads   int       `json:"downloads"`
	Active      bool      `json:"active"`
	CreatedAt   time.Time `json:"createdAt"`
	UpdatedAt   time.Time `json:"updatedAt"`
	PublishedAt time.Time `json:"publishedAt"`
	Checksum    string    `json:"checksum"`
}

type VersionPayload struct {
	Plugin  *Plugin  `json:"plugin"`
	Version *Version `json:"version"`
}

type NodeType string

const (
	NodeTypePlugin NodeType = "PLUGIN"
	NodeTypeUser   NodeType = "USER"
)

var AllNodeType = []NodeType{
	NodeTypePlugin,
	NodeTypeUser,
}

func (e NodeType) IsValid() bool {
	switch e {
	case NodeTypePlugin, NodeTypeUser:
		return true
	}
	return false
}

func (e NodeType) String() string {
	return string(e)
}

func (e *NodeType) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = NodeType(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid NodeType", str)
	}
	return nil
}

func (e NodeType) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}

type PluginSort string

const (
	PluginSortNameAsc         PluginSort = "NAME_ASC"
	PluginSortNameDesc        PluginSort = "NAME_DESC"
	PluginSortPublisherAsc    PluginSort = "PUBLISHER_ASC"
	PluginSortPublisherDesc   PluginSort = "PUBLISHER_DESC"
	PluginSortPublishedatAsc  PluginSort = "PUBLISHEDAT_ASC"
	PluginSortPublishedatDesc PluginSort = "PUBLISHEDAT_DESC"
	PluginSortDownloadsAsc    PluginSort = "DOWNLOADS_ASC"
	PluginSortDownloadsDesc   PluginSort = "DOWNLOADS_DESC"
)

var AllPluginSort = []PluginSort{
	PluginSortNameAsc,
	PluginSortNameDesc,
	PluginSortPublisherAsc,
	PluginSortPublisherDesc,
	PluginSortPublishedatAsc,
	PluginSortPublishedatDesc,
	PluginSortDownloadsAsc,
	PluginSortDownloadsDesc,
}

func (e PluginSort) IsValid() bool {
	switch e {
	case PluginSortNameAsc, PluginSortNameDesc, PluginSortPublisherAsc, PluginSortPublisherDesc, PluginSortPublishedatAsc, PluginSortPublishedatDesc, PluginSortDownloadsAsc, PluginSortDownloadsDesc:
		return true
	}
	return false
}

func (e PluginSort) String() string {
	return string(e)
}

func (e *PluginSort) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = PluginSort(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid PluginSort", str)
	}
	return nil
}

func (e PluginSort) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}

type PluginType string

const (
	PluginTypeReearth    PluginType = "REEARTH"
	PluginTypeReearthCms PluginType = "REEARTH_CMS"
)

var AllPluginType = []PluginType{
	PluginTypeReearth,
	PluginTypeReearthCms,
}

func (e PluginType) IsValid() bool {
	switch e {
	case PluginTypeReearth, PluginTypeReearthCms:
		return true
	}
	return false
}

func (e PluginType) String() string {
	return string(e)
}

func (e *PluginType) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = PluginType(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid PluginType", str)
	}
	return nil
}

func (e PluginType) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}
