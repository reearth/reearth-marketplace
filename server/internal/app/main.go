package app

import (
	"fmt"

	"github.com/kelseyhightower/envconfig"
)

type Config struct {
	Port  string `default:"8080" envconfig:"PORT"`
	DB    string `default:"mongodb://localhost"`
	Auth  AuthConfig
	GCS   GCSConfig
	Debug bool
}

func Start(debug bool, version string) error {
	var c Config
	if err := envconfig.Process("REEARTH_MARKETPLACE", &c); err != nil {
		return fmt.Errorf("load a config from env: %w", err)
	}
	e := initEcho(&c)
	return e.Start(":" + c.Port)
}
