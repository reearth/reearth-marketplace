package app

import (
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/handler/extension"
	"github.com/99designs/gqlgen/graphql/handler/lru"
	"github.com/labstack/echo/v4"
	"github.com/reearth/reearth-marketplace/server/internal/adapter"
	"github.com/reearth/reearth-marketplace/server/internal/adapter/gql"
)

func GraphqlAPI(conf GraphQLConfig) echo.HandlerFunc {
	schema := gql.NewExecutableSchema(gql.Config{
		Resolvers: &gql.Resolver{},
	})

	srv := handler.NewDefaultServer(schema)
	if conf.ComplexityLimit > 0 {
		srv.Use(extension.FixedComplexityLimit(conf.ComplexityLimit))
	}
	srv.Use(extension.AutomaticPersistedQuery{
		Cache: lru.New[string](30),
	})

	return func(c echo.Context) error {
		req := c.Request()
		ctx := req.Context()

		usecases := adapter.Usecases(ctx)
		ctx = gql.AttachUsecases(ctx, usecases)
		c.SetRequest(req.WithContext(ctx))
		srv.ServeHTTP(c.Response(), c.Request())
		return nil
	}
}
