package e2e

import (
	"archive/zip"
	"bytes"
	"fmt"
	"net/http"
	"testing"

	"github.com/gavv/httpexpect/v2"
	"github.com/reearth/reearth-marketplace/server/internal/app"
	"github.com/reearth/reearth-marketplace/server/pkg/id"
)

// export REEARTH_MARKETPLACE_DB=mongodb://localhost
// go test -v -run TestGetPlugins ./e2e/...

func createDummyZip() []byte {
	var buf bytes.Buffer
	w := zip.NewWriter(&buf)
	
	// Create the expected reearth.yml manifest file
	f, _ := w.Create("reearth.yml")
	f.Write([]byte(`id: reearth-plugin-tag-filter
name: Tag Filter Plugin
version: "1.0.0"
main: index.js
`))
	
	// Create a dummy index.js file
	f2, _ := w.Create("index.js")
	f2.Write([]byte(`console.log("Hello from test plugin");`))
	
	w.Close()
	return buf.Bytes()
}

func TestCreatePlugin(t *testing.T) {
	e := StartServer(t, &app.Config{
		Origins: []string{"https://example.com"},
	}, baseSeeder)

	core := true

	// Test plugin creation - the validation is done within createPlugin function
	createPlugin(e, "https://github.com/airslice/reearth-plugin-tag-filter", uID, core)
	
	// If we reach here, the plugin was created successfully and validated
}

func createPlugin(e *httpexpect.Expect, repo string, publisherID id.UserID, core bool) {
	// Use multipart/form-data for GraphQL mutation with Upload type - only using file upload, no repo
	operations := fmt.Sprintf(`{"operationName":"CreatePlugin","query":"mutation CreatePlugin($file: Upload, $publisher: ID, $core: Boolean) { createPlugin(input: { file: $file, publisher: $publisher, core: $core }) { plugin { id name description latestVersion { version } images core } } }","variables":{"file":null,"publisher":"%s","core":%v}}`, publisherID.String(), core)
	resp := e.POST("/api/graphql").
		WithHeader("Origin", "https://example.com").
		WithHeader("X-Reearth-Debug-User", uID.String()).
		WithMultipart().
		WithFormField("operations", operations).
		WithFormField("map", "{\"0\": [\"variables.file\"]}").
		WithFileBytes("0", "dummy.zip", createDummyZip()).
		Expect()
	if resp.Raw().StatusCode != http.StatusOK {
		errMsg := resp.Body().Raw()
		panic("CreatePlugin failed with status: " + resp.Raw().Status + ", body: " + errMsg)
	}
	// Check for GraphQL errors and return early if they exist
	jsonResp := resp.Status(http.StatusOK).JSON().Object()
	// Try to get the data, if it fails, there might be errors
	data := jsonResp.Value("data")
	if data.Raw() == nil {
		respBody := resp.Body().Raw()
		panic("CreatePlugin GraphQL errors: " + respBody)
	}
	
	// Validate the response structure and data
	r := jsonResp.Value("data").
		Object().
		Value("createPlugin").
		Object().
		Value("plugin").
		Object()

	r.Value("id").IsEqual("reearth-plugin-tag-filter")
	r.Value("name").IsEqual("Tag Filter Plugin")
	r.Value("core").IsEqual(core)
	r.Value("latestVersion").Object().Value("version").IsEqual("1.0.0")
	r.Value("images").Array().IsEmpty() // Should be empty array
}
