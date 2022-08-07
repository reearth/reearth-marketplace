package main

import (
	"github.com/labstack/echo/v4"
)

func main() {
	println("hello, world.")
	e := echo.New()
	e.GET("/", func(c echo.Context) error {
		return c.JSON(200, "hello")
	})
	e.Start(":8080")
}
