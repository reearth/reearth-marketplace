package e2e

import (
	"context"
	"log"
	"net"
	"net/http"
	"testing"

	"github.com/gavv/httpexpect/v2"
	"github.com/reearth/reearth-marketplace/server/internal/app"
	"github.com/reearth/reearth-marketplace/server/internal/infrastructure/fs"
	mongorepo "github.com/reearth/reearth-marketplace/server/internal/infrastructure/mongo"
	"github.com/reearth/reearth-marketplace/server/internal/usecase/gateway"
	"github.com/reearth/reearth-marketplace/server/internal/usecase/repo"
	"github.com/reearth/reearthx/mongox"
	"github.com/reearth/reearthx/mongox/mongotest"
)

type GraphQLRequest struct {
	OperationName string         `json:"operationName"`
	Query         string         `json:"query"`
	Variables     map[string]any `json:"variables"`
}

func init() {
	mongotest.Env = "REEARTH_MARKETPLACE_DB"
}

type Seeder func(ctx context.Context, r *repo.Container) error

func StartServer(t *testing.T, cfg *app.Config, seeder Seeder) *httpexpect.Expect {
	ctx := context.Background()
	repos, gateways := initTestReposAndGateways(t, ctx, cfg, seeder)
	return StartServerWithRepos(t, cfg, repos, gateways)
}

func initTestReposAndGateways(t *testing.T, ctx context.Context, conf *app.Config, seeder Seeder) (*repo.Container, *gateway.Container) {

	// Mongo
	db := mongotest.Connect(t)(t)
	repos := &repo.Container{}
	if err := mongorepo.InitRepos(ctx, repos, db.Client(), db.Name(), mongox.IsTransactionAvailable(conf.DB)); err != nil {
		log.Fatalf("Failed to init mongo: %+v\n", err)
	}
	if seeder != nil {
		if err := seeder(ctx, repos); err != nil {
			t.Fatalf("failed to seed the db: %s", err)
		}
	}

	// File
	fileRepo, err := fs.NewFile("TestBucket", "TestAssetsBucket", "TestAssetsBaseURL")
	if err != nil {
		log.Fatalf("file: init error: %v", err)
	}
	gateways := &gateway.Container{}
	gateways.File = fileRepo

	return repos, gateways
}

func StartServerWithRepos(t *testing.T, cfg *app.Config, repos *repo.Container, gateways *gateway.Container) *httpexpect.Expect {
	t.Helper()
	if testing.Short() {
		t.Skip("skipping test in short mode.")
	}
	ctx := context.Background()
	l, err := net.Listen("tcp", ":0")
	if err != nil {
		t.Fatalf("server failed to listen: %v", err)
	}
	srv := app.NewServer(ctx, &app.ServerConfig{
		Config:   cfg,
		Repos:    repos,
		Gateways: gateways,
		Debug:    true,
	})
	ch := make(chan error)
	go func() {
		if err := srv.Serve(l); err != http.ErrServerClosed {
			ch <- err
		}
		close(ch)
	}()
	t.Cleanup(func() {
		if err := srv.Shutdown(context.Background()); err != nil {
			t.Fatalf("server shutdown: %v", err)
		}
		if err := <-ch; err != nil {
			t.Fatalf("server serve: %v", err)
		}
	})
	return httpexpect.Default(t, "http://"+l.Addr().String())
}
