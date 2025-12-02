package e2e

import (
	"net/http"
	"testing"

	"github.com/gavv/httpexpect/v2"
	"github.com/reearth/reearth-marketplace/server/internal/app"
	"github.com/reearth/reearth-marketplace/server/pkg/id"
)

// export REEARTH_MARKETPLACE_DB=mongodb://localhost
// go test -v -run TestGetPlugins ./e2e/...

func TestGetPlugins(t *testing.T) {
	e := StartServer(t, &app.Config{
		Origins: []string{"https://example.com"},
	}, baseSeeder)

	core := true

	createPlugin(e, "https://github.com/airslice/reearth-plugin-tag-filter", uID, core)

	requestBody := GraphQLRequest{
		OperationName: "Plugins",
		Query: `
			query Plugins($ids: [ID!]!) {
				nodes(ids: $ids, type: PLUGIN) {
					id
					... on Plugin {
						id
						images
						author
						publisher {
							id
							name
							displayName
						}
						like
						downloads
						name
						icon
						readme
						description
						liked
						updatedAt
						latestVersion {
							version
						}
						core
					}
				}
			}`,
		Variables: map[string]any{
			"ids": []string{"reearth-plugin-tag-filter"},
		},
	}
	r := e.POST("/api/graphql").
		WithHeader("Origin", "https://example.com").
		WithHeader("X-Reearth-Debug-User", uID.String()).
		WithHeader("Content-Type", "application/json").
		WithJSON(requestBody).
		Expect().
		Status(http.StatusOK).
		JSON().
		Object().
		Value("data").
		Object().
		Value("nodes").
		Array().
		Value(0).
		Object()

	r.Value("id").IsEqual("reearth-plugin-tag-filter")
	r.Value("core").IsEqual(core)
}

func createPlugin(e *httpexpect.Expect, repo string, publisherID id.UserID, core bool) {
	requestBody := GraphQLRequest{
		OperationName: "CreatePlugin",
		Query: `
			mutation CreatePlugin($file: Upload, $repo: String, $publisher: ID, $core: Boolean) {
				createPlugin(input: { file: $file, repo: $repo, publisher: $publisher, core: $core }) {
					plugin {
						id
						name
						description
						latestVersion {
							version
						}
						images
						core
					}
				}
			}`,
		Variables: map[string]any{
			"file":      nil,
			"repo":      repo,
			"publisher": publisherID.String(),
			"core":      core,
		},
	}
	r := e.POST("/api/graphql").
		WithHeader("Origin", "https://example.com").
		WithHeader("X-Reearth-Debug-User", uID.String()).
		WithHeader("Content-Type", "application/json").
		WithJSON(requestBody).
		Expect().
		Status(http.StatusOK).
		JSON().
		Object().
		Value("data").
		Object().
		Value("createPlugin").
		Object().
		Value("plugin").
		Object()

	r.Value("id").IsEqual("reearth-plugin-tag-filter")
	r.Value("core").IsEqual(core)
}
