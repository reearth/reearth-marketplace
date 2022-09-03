package mongo

import (
	"context"

	"github.com/reearth/reearth-marketplace/server/internal/usecase/repo"
	"github.com/reearth/reearthx/mongox"
	"go.mongodb.org/mongo-driver/mongo"
)

func InitRepos(ctx context.Context, c *repo.Container, mc *mongo.Client, databaseName string) error {
	client := mongox.NewClient(databaseName, mc)
	c.User = NewUser(client)
	c.Plugin = NewPlugin(client)
	c.Transaction = NewTransaction(client)
	c.Organization = NewOrganization(client)
	return nil
}
