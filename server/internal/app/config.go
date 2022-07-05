package app

import (
	"net/url"
)

type AuthConfig struct {
	ISS      url.URL
	AUD      []string
	ALG      string `default:"RS256"`
	TTL      *int
	ClientID *string
}

type GCSConfig struct {
	Bucket string
}
