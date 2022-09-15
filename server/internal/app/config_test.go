package app

import (
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
