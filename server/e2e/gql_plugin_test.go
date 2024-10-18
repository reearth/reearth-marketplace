package e2e

import (
	"net/http"
	"testing"

	"github.com/reearth/reearth-marketplace/server/internal/app"
)

// go test -v -run TestGetPlugins ./e2e/...

func TestGetPlugins(t *testing.T) {
	e := StartServer(t, &app.Config{
		Origins: []string{"https://example.com"},
	})

	requestBody := GraphQLRequest{
		OperationName: "Plugins",
		Query: `
			query Plugins($input: PluginsInput!) {
				plugins(input: $input) {
					totalCount
					nodes {
						id
						name
						description
						__typename
					}
					pageInfo {
						hasNextPage
						hasPreviousPage
						startCursor
						endCursor
						__typename
					}
					__typename
				}
			}`,
		Variables: map[string]any{
			"input": map[string]any{
				"first":     10,
				"keyword":   "test",
				"liked":     true,
				"tags":      []string{"tag1", "tag2"},
				"types":     []string{"PLUGIN_TYPE_1", "PLUGIN_TYPE_2"},
				"publisher": "publisher_id",
				"sort":      "POPULARITY",
			},
		},
	}

	e.POST("/api/graphql").
		WithHeader("Origin", "https://example.com").
		WithHeader("authorization", "Bearer test").
		WithHeader("X-Reearth-Debug-User", "xxxx").
		WithHeader("Content-Type", "application/json").
		WithJSON(requestBody).
		Expect().
		Status(http.StatusOK)
	// 	JSON().
	// 	Object().
	// 	Value("data").Object().
	// 	Value("createProject").Object().
	// 	Value("project").Object().
	// 	// ValueEqual("id", pId.String()).
	// 	ValueEqual("name", "test").
	// 	ValueEqual("description", "abc").
	// 	ValueEqual("imageUrl", "").
	// 	ValueEqual("coreSupport", false)

	// // create coreSupport project
	// requestBody = GraphQLRequest{
	// 	OperationName: "CreateProject",
	// 	Query:         "mutation CreateProject($teamId: ID!, $visualizer: Visualizer!, $name: String!, $description: String!, $imageUrl: URL, $coreSupport: Boolean) {\n createProject(\n input: {teamId: $teamId, visualizer: $visualizer, name: $name, description: $description, imageUrl: $imageUrl, coreSupport: $coreSupport}\n ) {\n project {\n id\n name\n description\n imageUrl\n coreSupport\n __typename\n }\n __typename\n }\n}",
	// 	Variables: map[string]any{
	// 		"name":        "test",
	// 		"description": "abc",
	// 		"imageUrl":    "",
	// 		"teamId":      wID.String(),
	// 		"visualizer":  "CESIUM",
	// 		"coreSupport": true,
	// 	},
	// }

	// e.POST("/api/graphql").
	// 	WithHeader("Origin", "https://example.com").
	// 	// WithHeader("authorization", "Bearer test").
	// 	WithHeader("X-Reearth-Debug-User", uID.String()).
	// 	WithHeader("Content-Type", "application/json").
	// 	WithJSON(requestBody).
	// 	Expect().
	// 	Status(http.StatusOK).
	// 	JSON().
	// 	Object().
	// 	Value("data").Object().
	// 	Value("createProject").Object().
	// 	Value("project").Object().
	// 	// ValueEqual("id", pId.String()).
	// 	ValueEqual("name", "test").
	// 	ValueEqual("description", "abc").
	// 	ValueEqual("imageUrl", "").
	// 	ValueEqual("coreSupport", true)
}
