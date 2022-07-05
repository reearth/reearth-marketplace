package app

import (
	"context"
	"fmt"
	"log"
	"time"

	jwtmiddleware "github.com/auth0/go-jwt-middleware/v2"
	"github.com/auth0/go-jwt-middleware/v2/jwks"
	"github.com/auth0/go-jwt-middleware/v2/validator"
	"github.com/labstack/echo/v4"
)

const (
	defaultJWTTTL = 5 * time.Minute
)

type customClaims struct {
	Name          string `json:"name"`
	Nickname      string `json:"nickname"`
	Email         string `json:"email"`
	EmailVerified *bool  `json:"email_verified"`
}

func (c *customClaims) Validate(ctx context.Context) error {
	return nil
}

func newValidator(p AuthConfig) (*validator.Validator, error) {
	issuerURL := p.ISS
	issuerURL.Path = "/"

	var ttl time.Duration
	if p.TTL != nil {
		ttl = time.Duration(*p.TTL) * time.Minute
	} else {
		ttl = defaultJWTTTL
	}
	provider := jwks.NewCachingProvider(&issuerURL, ttl)
	alg := p.ALG
	algorithm := validator.SignatureAlgorithm(alg)

	var aud []string
	if len(p.AUD) > 0 {
		aud = p.AUD
	} else {
		aud = []string{}
	}
	v, err := validator.New(
		provider.KeyFunc,
		algorithm,
		issuerURL.String(),
		aud,
		validator.WithCustomClaims(func() validator.CustomClaims {
			return &customClaims{}
		}),
	)
	if err != nil {
		return nil, fmt.Errorf("validator new: %w", err)
	}
	return v, nil
}

// Validate the access token and inject the user clams into ctx
func jwtEchoMiddleware(cfg *Config) echo.MiddlewareFunc {
	jwtValidator, err := newValidator(cfg.Auth)
	if err != nil {
		log.Fatalf("failed to set up the validator: %v", err)
	}
	middleware := jwtmiddleware.New(jwtValidator.ValidateToken, jwtmiddleware.WithCredentialsOptional(true))
	return echo.WrapMiddleware(middleware.CheckJWT)
}
