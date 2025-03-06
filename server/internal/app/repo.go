package app

import (
	"context"
	"time"

	"github.com/reearth/reearth-marketplace/server/internal/infrastructure/gcs"
	mongorepo "github.com/reearth/reearth-marketplace/server/internal/infrastructure/mongo"
	"github.com/reearth/reearth-marketplace/server/internal/usecase/gateway"
	"github.com/reearth/reearth-marketplace/server/internal/usecase/repo"
	"github.com/reearth/reearthx/log"
	"github.com/reearth/reearthx/mongox"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func initReposAndGateways(ctx context.Context, conf *Config, debug bool) (*repo.Container, *gateway.Container) {
	repos := &repo.Container{}
	gateways := &gateway.Container{}

	// Mongo
	client, err := mongo.Connect(
		ctx,
		options.Client().
			ApplyURI(conf.DB).
			SetConnectTimeout(time.Second*10),
	)
	if err != nil {
		log.Fatalf("repo initialization error: %+v\n", err)
	}
	if err := mongorepo.InitRepos(ctx, repos, client, "reearth-marketplace", mongox.IsTransactionAvailable(conf.DB)); err != nil {
		log.Fatalf("Failed to init mongo: %+v\n", err)
	}

	// File (GCS)
	fileRepo, err := gcs.NewFile(conf.GCS.Bucket, conf.GCS.AssetsBucket, conf.GCS.AssetsBaseURL)
	if err != nil {
		log.Fatalf("file: init error: %v", err)
	}

	gateways.File = fileRepo

	return repos, gateways
}
