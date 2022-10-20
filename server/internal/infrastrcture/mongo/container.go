package mongo

import (
	"context"
	"fmt"

	"github.com/reearth/reearth-marketplace/server/internal/usecase/repo"
	"github.com/reearth/reearthx/mongox"
	"go.mongodb.org/mongo-driver/mongo"
)

func InitRepos(ctx context.Context, c *repo.Container, mc *mongo.Client, databaseName string) error {
	client := mongox.NewClient(databaseName, mc)
	c.User = NewUser(client)
	c.Plugin = NewPlugin(client)
	c.Transaction = mongox.NewTransaction(client)
	c.Organization = NewOrganization(client)
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
