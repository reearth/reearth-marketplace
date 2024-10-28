package app

import (
	"fmt"
	"net/url"

	"github.com/joho/godotenv"
	"github.com/kelseyhightower/envconfig"
	"github.com/reearth/reearthx/appx"
	"github.com/yudai/pp"
)

const configPrefix = "REEARTH_MARKETPLACE"

type Config struct {
	Port     string        `default:"8080" envconfig:"PORT"`
	DB       string        `default:"mongodb://localhost" pp:"-"`
	Auth     AuthConfig    `pp:",omitempty"`
	Auth_M2M AuthM2MConfig `pp:",omitempty"`
	GCS      GCSConfig     `pp:",omitempty"`
	GraphQL  GraphQLConfig `pp:",omitempty"`
	Origins  []string      `pp:",omitempty"`
	Debug    bool          `pp:",omitempty"`
}

func (c *Config) AuthProviders() (p []appx.JWTProvider) {
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
	ISS *url.URL `pp:",omitempty"`
	AUD []string `pp:",omitempty"`
	ALG string   `default:"RS256"`
	TTL *int     `pp:",omitempty"`
}

type AuthM2MConfig struct {
	ISS    *url.URL `pp:",omitempty"`
	AUD    []string `pp:",omitempty"`
	ALG    string   `default:"RS256" pp:",omitempty"`
	TTL    *int     `pp:",omitempty"`
	Sub    string   `pp:",omitempty"`
	Secret string   `pp:",omitempty"`
}

type GCSConfig struct {
	Bucket        string `pp:",omitempty"`
	AssetsBucket  string `pp:",omitempty"`
	AssetsBaseURL string `pp:",omitempty"`
}

type GraphQLConfig struct {
	ComplexityLimit int `default:"6000"`
}

func LoadConfig() (*Config, error) {
	err := godotenv.Load(".env")
	if err != nil {
		fmt.Println("Error loading .env file")
	}

	var c Config
	if err := envconfig.Process(configPrefix, &c); err != nil {
		return nil, fmt.Errorf("load a config from env: %w", err)
	}

	return &c, nil
}

func (c *Config) Print() string {
	return pp.Sprint(c)
}
