package app

import (
	"context"

	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func initEcho(cfg *Config) *echo.Echo {
	e := echo.New()
	e.Debug = cfg.Debug
	e.HideBanner = true
	e.HidePort = true
	e.Use(
		jwtEchoMiddleware(cfg),
		func(next echo.HandlerFunc) echo.HandlerFunc {
			client := mongo.Client{}
			col := client.Database("marketplace").Collection("users")
			ctx := context.TODO()
			col.UpdateByID()
			col.UpdateOne(ctx, bson.D{{"_id", "foo"}})

		})
},
)
return e
}
