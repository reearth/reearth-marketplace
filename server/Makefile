help:
	@echo "Usage:"
	@echo "  make <target>"
	@echo ""
	@echo "Targets:"
	@echo "  lint       Run golangci-lint with auto-fix"
	@echo "  test       Run unit tests with race detector in short mode"
	@echo "  e2e        Run end-to-end tests"
	@echo "  build      Build the project"
	@echo "  run-app    Run the application"
	@echo "  gql        Generate GraphQL code"

lint:
	golangci-lint run --fix

test:
	go test -race -short -v ./...

e2e:
	go test -v ./e2e/...

build:
	go build ./cmd/reearth-marketplace

run-app:
	go run ./cmd/reearth-marketplace

gql:
	go generate ./internal/adapter/gql

.PHONY: lint test e2e build run-app gql
