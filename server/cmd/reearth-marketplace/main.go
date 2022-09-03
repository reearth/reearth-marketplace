package main

import (
	"github.com/reearth/reearth-marketplace/server/internal/app"
	"github.com/reearth/reearthx/log"
)

func main() {
	if err := app.Start(false, "0.0.0"); err != nil {
		log.Fatal(err)
	}
}
