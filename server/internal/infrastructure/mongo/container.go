package mongo

import (
	"context"
	"fmt"

	"github.com/reearth/reearth-marketplace/server/internal/usecase/repo"
	"github.com/reearth/reearthx/mongox"
	"go.mongodb.org/mongo-driver/mongo"
)

func InitRepos(ctx context.Context, c *repo.Container, mc *mongo.Client, databaseName string, useTransaction bool) error {
	client := mongox.NewClient(databaseName, mc)
	if useTransaction {
		client = client.WithTransaction()
	}
	c.User = NewUser(client)
	c.Plugin = NewPlugin(client)
	c.Organization = NewOrganization(client)
	c.Transaction = client.Transaction()
	return nil
}

func initIndexes(ctx context.Context, c *mongox.ClientCollection, indexes []string, unique []string) {
	added, deleted, err := c.Indexes(
		context.Background(),
		indexes,
		unique,
	)
	if len(added) > 0 || len(deleted) > 0 {
		fmt.Printf("mongo: %s: indexes deleted: %v, added: %v\n", c.Client().Name(), deleted, added)
	}
	if err != nil {
		panic(err)
	}
}
