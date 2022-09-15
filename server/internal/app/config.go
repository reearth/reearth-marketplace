package app

import (
	"fmt"
	"net/url"

	"github.com/kelseyhightower/envconfig"
	"github.com/reearth/reearthx/appx"
)

const configPrefix = "REEARTH_MARKETPLACE"

type Config struct {
	Port     string `default:"8080" envconfig:"PORT"`
	DB       string `default:"mongodb://localhost"`
	Auth     AuthConfig
	Auth_M2M AuthM2MConfig
	GCS      GCSConfig
	GraphQL  GraphQLConfig
	Origins  []string
	Debug    bool
}

func (c Config) AuthProviders() (p []appx.JWTProvider) {
	if c.Auth.ISS != nil {
		if iss := c.Auth.ISS.String(); iss != "" {
			p = append(p, appx.JWTProvider{
				ISS: iss,
				AUD: c.Auth.AUD,
				ALG: &c.Auth.ALG,
				TTL: c.Auth.TTL,
			})
		}
	}
	if c.Auth_M2M.ISS != nil {
		if iss := c.Auth_M2M.ISS.String(); iss != "" {
			p = append(p, appx.JWTProvider{
				ISS: iss,
				AUD: c.Auth_M2M.AUD,
				ALG: &c.Auth_M2M.ALG,
				TTL: c.Auth_M2M.TTL,
			})
		}
	}
	return
}

type AuthConfig struct {
	ISS *url.URL
	AUD []string
	ALG string `default:"RS256"`
	TTL *int
}

type AuthM2MConfig struct {
	ISS *url.URL
	AUD []string
	ALG string `default:"RS256"`
	TTL *int
	Sub string
}

type GCSConfig struct {
	Bucket        string
	AssetsBucket  string
	AssetsBaseURL string
}

type GraphQLConfig struct {
	ComplexityLimit int `default:"6000"`
}

func LoadConfig() (*Config, error) {
	var c Config
	if err := envconfig.Process(configPrefix, &c); err != nil {
		return nil, fmt.Errorf("load a config from env: %w", err)
	}
	return &c, nil
}
