package app

import (
	"context"
	"net"
	"net/http"
	"os"
	"os/signal"

	"github.com/labstack/echo/v4"
	"github.com/reearth/reearth-marketplace/server/internal/usecase/gateway"
	"github.com/reearth/reearth-marketplace/server/internal/usecase/repo"
	"github.com/reearth/reearthx/log"
)

func Start(debug bool, version string) error {
	ctx := context.Background()

	c, err := LoadConfig()
	if err != nil {
		return err
	}

	log.Infof("config: %s", c.Print())
	repos, gateways := initReposAndGateways(ctx, c, debug)

	NewServer(ctx, &ServerConfig{
		Config:   c,
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
		log.Fatal(err.Error())
	}()
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt)
	<-quit
}

func (w *WebServer) Serve(l net.Listener) error {
	return w.appServer.Server.Serve(l)
}

func (w *WebServer) ServeHTTP(wr http.ResponseWriter, r *http.Request) {
	w.appServer.ServeHTTP(wr, r)
}

func (w *WebServer) Shutdown(ctx context.Context) error {
	return w.appServer.Shutdown(ctx)
}
