package app

import (
	"net/url"
	"os"
	"testing"

	"github.com/reearth/reearthx/appx"
	"github.com/samber/lo"
	"github.com/stretchr/testify/assert"
)

func TestConfig_AuthProviders(t *testing.T) {
	setupEnvvars(t, map[string]string{
		"REEARTH_MARKETPLACE_AUTH_ISS":     "https://example.com",
		"REEARTH_MARKETPLACE_AUTH_AUD":     "a,b",
		"REEARTH_MARKETPLACE_AUTH_ALG":     "",
		"REEARTH_MARKETPLACE_AUTH_TTL":     "",
		"REEARTH_MARKETPLACE_AUTH_M2M_ISS": "",
		"REEARTH_MARKETPLACE_AUTH_N2M_AUD": "",
		"REEARTH_MARKETPLACE_AUTH_N2M_ALG": "",
		"REEARTH_MARKETPLACE_AUTH_N2M_TTL": "",
	})

	c, err := LoadConfig()
	assert.NoError(t, err)
	providers := c.AuthProviders()

	assert.Equal(t, []appx.JWTProvider{
		{
			ISS: "https://example.com",
			AUD: []string{"a", "b"},
			ALG: lo.ToPtr("RS256"),
			TTL: nil,
		},
	}, providers)
}

func setupEnvvars(t *testing.T, envs map[string]string) {
	t.Helper()
	for k, v := range envs {
		k := k
		v := v
		prev, ok := os.LookupEnv(k)
		var err error
		if v == "" {
			err = os.Unsetenv(k)
		} else {
			err = os.Setenv(k, v)
		}
		if err != nil {
			t.Fatalf("cannot set environment key: %q", k)
		}
		if ok {
			t.Cleanup(func() {
				_ = os.Setenv(k, prev)
			})
		} else {
			t.Cleanup(func() {
				_ = os.Unsetenv(k)
			})
		}
	}
}

func TestConfig_Print_HidesSecrets(t *testing.T) {
	iss, err := url.Parse("https://issuer.example.com/")
	assert.NoError(t, err)

	c := &Config{
		Port:   "8080",
		DB:     "mongodb+srv://user:SENTINEL_DB_PASSWORD@host",
		DBName: "visible_db_name",
		Auth: AuthConfig{
			ISS: iss,
			AUD: []string{"visible_aud"},
			ALG: "RS256",
		},
		Auth_M2M: AuthM2MConfig{
			ISS:    iss,
			AUD:    []string{"visible_m2m_aud"},
			ALG:    "RS256",
			Sub:    "visible_m2m_sub",
			Secret: "SENTINEL_M2M_SECRET",
		},
		GCS: GCSConfig{
			Bucket:        "visible_bucket",
			AssetsBucket:  "visible_assets_bucket",
			AssetsBaseURL: "https://assets.example.com",
		},
		Origins: []string{"https://visible-origin.example.com"},
	}

	out := c.Print()

	for _, secret := range []string{
		"SENTINEL_DB_PASSWORD",
		"SENTINEL_M2M_SECRET",
	} {
		assert.NotContains(t, out, secret)
	}
	for _, visible := range []string{
		"visible_db_name",
		"issuer.example.com",
		"visible_m2m_sub",
		"visible_bucket",
		"visible-origin.example.com",
	} {
		assert.Contains(t, out, visible)
	}

	// Print must not mutate the config it is called on.
	assert.Equal(t, "mongodb+srv://user:SENTINEL_DB_PASSWORD@host", c.DB)
	assert.Equal(t, "SENTINEL_M2M_SECRET", c.Auth_M2M.Secret)
}
