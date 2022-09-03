package app

import (
	"context"
	"fmt"
	"os"
	"os/signal"

	"github.com/kelseyhightower/envconfig"
	"github.com/labstack/echo/v4"
	"github.com/reearth/reearth-marketplace/server/internal/usecase/gateway"
	"github.com/reearth/reearth-marketplace/server/internal/usecase/repo"
	"github.com/reearth/reearthx/log"
)

type Config struct {
	Port    string `default:"8080" envconfig:"PORT"`
	DB      string `default:"mongodb://localhost"`
	Auth    AuthConfig
	GCS     GCSConfig
	GraphQL GraphQLConfig
	Debug   bool
}

func Start(debug bool, version string) error {
	ctx := context.Background()

	var c Config
	if err := envconfig.Process("REEARTH_MARKETPLACE", &c); err != nil {
		return fmt.Errorf("load a config from env: %w", err)
	}
	repos, gateways := initReposAndGateways(ctx, &c, debug)

	NewServer(ctx, &ServerConfig{
		Config:   &c,
		Debug:    debug,
		Repos:    repos,
		Gateways: gateways,
	}).Run()
	return nil
}

type WebServer struct {
	address   string
	appServer *echo.Echo
}

type ServerConfig struct {
	Config   *Config
	Debug    bool
	Repos    *repo.Container
	Gateways *gateway.Container
}

func NewServer(ctx context.Context, cfg *ServerConfig) *WebServer {
	port := cfg.Config.Port
	address := "0.0.0.0:" + port
	if cfg.Debug {
		address = "localhost:" + port
	}
	w := &WebServer{
		address: address,
	}
	w.appServer = initEcho(cfg)
	return w
}

func (w *WebServer) Run() {
	go func() {
		err := w.appServer.Start(w.address)
		log.Fatalln(err.Error())
	}()
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt)
	<-quit
}
