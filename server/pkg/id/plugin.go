package id

import (
	"regexp"
	"strings"

	"github.com/blang/semver"
)

type PluginID struct {
	id string
}

var (
	versionSeparator = "~"
	pluginIDRe       = regexp.MustCompile("^[a-zA-Z0-9_-]+$")
)

func validatePluginID(s string) bool {
	if len(s) == 0 || len(s) > 100 || s == "reearth" {
		return false
	}
	return pluginIDRe.MatchString(s)
}

func NewPluginID(id string) (PluginID, error) {
	if !validatePluginID(id) {
		return PluginID{}, ErrInvalidID
	}
	return PluginID{
		id: id,
	}, nil
}

// PluginIDFrom generates a new id.PluginID from a string.
func PluginIDFrom(id string) (PluginID, error) {
	return NewPluginID(id)
}

// MustPluginID generates a new id.PluginID from a string, but panics if the string cannot be parsed.
func MustPluginID(id string) PluginID {
	did, err := PluginIDFrom(id)
	if err != nil {
		panic(err)
	}
	return did
}

// PluginIDFromRef generates a new id.PluginID from a string ref.
func PluginIDFromRef(id *string) *PluginID {
	if id == nil {
		return nil
	}
	did, err := PluginIDFrom(*id)
	if err != nil {
		return nil
	}
	return &did
}

// Clone duplicates the PluginID
func (d PluginID) Clone() PluginID {
	return PluginID{
		id: d.id,
	}
}

// IsNil checks if ID is empty or not.
func (d PluginID) IsNil() bool {
	return d.id == ""
}

// Validate returns true if id is valid.
func (d PluginID) Validate() bool {
	return validatePluginID(d.id)
}

// String returns a string representation.
func (d PluginID) String() (s string) {
	return d.id
}

// Ref returns a reference.
func (d PluginID) Ref() *PluginID {
	d2 := d
	return &d2
}

func (d *PluginID) CopyRef() *PluginID {
	if d == nil {
		return nil
	}
	d2 := *d
	return &d2
}

// StringRef returns a reference of a string representation.
func (d *PluginID) StringRef() *string {
	if d == nil {
		return nil
	}
	id := (*d).String()
	return &id
}

// Equal returns true if two IDs are equal.
func (d PluginID) Equal(d2 PluginID) bool {
	return d.id == d2.id
}

// MarshalText implements encoding.TextMarshaler interface
func (d *PluginID) MarshalText() ([]byte, error) {
	return []byte(d.String()), nil
}

// UnmarshalText implements encoding.TextUnmarshaler interface
func (d *PluginID) UnmarshalText(text []byte) (err error) {
	*d, err = PluginIDFrom(string(text))
	return
}

// PluginIDsToStrings converts IDs into a string slice.
func PluginIDsToStrings(ids []PluginID) []string {
	keys := make([]string, 0, len(ids))
	for _, id := range ids {
		keys = append(keys, id.String())
	}
	return keys
}

// PluginIDsFrom converts a string slice into a ID slice.
func PluginIDsFrom(ids []string) ([]PluginID, error) {
	dids := make([]PluginID, 0, len(ids))
	for _, id := range ids {
		did, err := PluginIDFrom(id)
		if err != nil {
			return nil, err
		}
		dids = append(dids, did)
	}
	return dids, nil
}

type VersionID struct {
	pluginID PluginID
	version  string
}

func NewVersionID(pid PluginID, version string) (VersionID, error) {
	if _, err := semver.Parse(version); err != nil {
		return VersionID{}, ErrInvalidID
	}
	return VersionID{
		pluginID: pid,
		version:  version,
	}, nil
}

func VersionIDFrom(id string) (VersionID, error) {
	id, version, ok := strings.Cut(id, versionSeparator)
	if !ok {
		return VersionID{}, ErrInvalidID
	}
	pid, err := NewPluginID(id)
	if err != nil {
		return VersionID{}, err
	}
	return NewVersionID(pid, version)
}

func (i VersionID) PluginID() PluginID {
	return i.pluginID
}

func (i VersionID) Version() string {
	return i.version
}

func (i VersionID) String() string {
	return i.pluginID.String() + versionSeparator + i.version
}
