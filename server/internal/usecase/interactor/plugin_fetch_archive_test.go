package interactor

import (
	"context"
	"io"
	"net"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

// TestFetchArchive_Success confirms a normal 200 response streams through untouched.
func TestFetchArchive_Success(t *testing.T) {
	const body = "zip-bytes"
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		_, _ = w.Write([]byte(body))
	}))
	defer srv.Close()

	rc, err := fetchArchive(context.Background(), srv.Client(), srv.URL)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	defer rc.Close()

	got, err := io.ReadAll(rc)
	if err != nil {
		t.Fatalf("unexpected read error: %v", err)
	}
	if string(got) != body {
		t.Fatalf("body = %q, want %q", got, body)
	}
}

// TestFetchArchive_NonOKStatus is a regression test for REL-08: fetchFromRepo used to
// never check the response status, so GitHub's HTML error body for a 404/451/5xx was fed
// straight into the zip parser, producing a misleading "invalid package" error instead of
// reporting the actual fetch failure.
func TestFetchArchive_NonOKStatus(t *testing.T) {
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusNotFound)
		_, _ = w.Write([]byte("<html>not found</html>"))
	}))
	defer srv.Close()

	_, err := fetchArchive(context.Background(), srv.Client(), srv.URL)
	if err == nil {
		t.Fatal("expected an error for a non-200 status, got nil")
	}
	if !strings.Contains(err.Error(), "404") {
		t.Errorf("error = %q, want it to mention the status code", err.Error())
	}
}

// TestFetchArchive_TransportErrorIsNotMasked is a regression test for REL-08: a transport
// failure (timeout, DNS, connection refused) used to be collapsed into the generic
// ErrInvalidPluginPackage, which told the publisher to go debug their zip file even though
// it was never fetched at all, and hid the real network failure from anyone reading the
// error.
func TestFetchArchive_TransportErrorIsNotMasked(t *testing.T) {
	// Bind a listener, then close it immediately so the port is guaranteed
	// closed -- the connection attempt fails fast and deterministically with
	// "connection refused", without depending on network access or timing.
	l, err := net.Listen("tcp", "127.0.0.1:0")
	if err != nil {
		t.Fatalf("failed to reserve a port: %v", err)
	}
	addr := l.Addr().String()
	l.Close()

	_, err = fetchArchive(context.Background(), http.DefaultClient, "http://"+addr+"/archive.zip")
	if err == nil {
		t.Fatal("expected a transport error, got nil")
	}
	if strings.Contains(err.Error(), "invalid plugin package") {
		t.Errorf("error = %q, a transport failure must not be reported as an invalid package", err.Error())
	}
}
