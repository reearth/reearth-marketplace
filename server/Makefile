help:
	@echo "Usage:"
	@echo "  make <target>"
	@echo ""
	@echo "Targets:"
	@echo "  test       Run unit tests with race detector in short mode"
	@echo "  build      Build the project"
	@echo "  run-app    Run the application"
	@echo "  gql        Generate GraphQL code"

test:
	go test -race -short -v ./...

build:
	go build ./cmd/reearth-marketplace

run-app:
	go run ./cmd/reearth-marketplace

gql:
	go generate ./internal/adapter/gql

.PHONY: test build run-app gql
