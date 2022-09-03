package manifest

import (
	"io"

	"gopkg.in/yaml.v3"
)

type Manifest struct {
	ID          string `yaml:"id"`
	Name        string `yaml:"name"`
	Version     string `yaml:"version"`
	Description string `yaml:"description"`
	Author      string `yaml:"author"`
	Icon        string `yaml:"icon"`
	Repository  string `yaml:"repository"`
}

func Parse(r io.Reader) (*Manifest, error) {
	var m Manifest
	if err := yaml.NewDecoder(r).Decode(&m); err != nil {
		return nil, err
	}
	// TODO: validation
	return &m, nil
}
