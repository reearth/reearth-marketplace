//go:generate go run github.com/99designs/gqlgen
package gql

// THIS CODE IS A STARTING POINT ONLY. IT WILL NOT BE UPDATED WITH SCHEMA CHANGES.

type Resolver struct{}

func NewResolver() ResolverRoot {
	return &Resolver{}
}
