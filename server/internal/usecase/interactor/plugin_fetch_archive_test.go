package interactor

import (
	"context"
	"errors"
	"io"
	"net"
	"net/http"
	"net/http/httptest"
	"net/url"
	"testing"

	"github.com/reearth/reearth-marketplace/server/internal/usecase/interfaces"
)

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
	defer func() { _ = rc.Close() }()

	got, err := io.ReadAll(rc)
	if err != nil {
		t.Fatalf("unexpected read error: %v", err)
	}
	if string(got) != body {
		t.Fatalf("body = %q, want %q", got, body)
	}
}

func TestFetchArchive_NonOKStatus(t *testing.T) {
	tests := []struct {
		status int
		want   error
	}{
		{http.StatusNotFound, interfaces.ErrRepoNotFound},
		{http.StatusInternalServerError, interfaces.ErrFailedToFetchRepo},
	}
	for _, tt := range tests {
		srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.WriteHeader(tt.status)
			_, _ = w.Write([]byte("<html>error</html>"))
		}))

		_, err := fetchArchive(context.Background(), srv.Client(), srv.URL)
		srv.Close()
		if !errors.Is(err, tt.want) {
			t.Errorf("status %d: error = %v, want %v", tt.status, err, tt.want)
		}
	}
}

func TestFetchArchive_TransportErrorIsNotMasked(t *testing.T) {
	l, err := net.Listen("tcp", "127.0.0.1:0")
	if err != nil {
		t.Fatalf("failed to reserve a port: %v", err)
	}
	addr := l.Addr().String()
	_ = l.Close()

	_, err = fetchArchive(context.Background(), http.DefaultClient, "http://"+addr+"/archive.zip")
	if !errors.Is(err, interfaces.ErrFailedToFetchRepo) {
		t.Fatalf("error = %v, want %v", err, interfaces.ErrFailedToFetchRepo)
	}
	if errors.Is(err, interfaces.ErrInvalidPluginPackage) {
		t.Errorf("a transport failure must not be reported as an invalid package")
	}
}

func TestCheckRepoRedirect(t *testing.T) {
	tests := []struct {
		target  string
		allowed bool
	}{
		{"https://codeload.github.com/owner/repo/zip/refs/heads/main", true},
		{"https://github.com/owner/repo/archive/refs/heads/main.zip", true},
		{"http://codeload.github.com/owner/repo/zip/refs/heads/main", false},
		{"https://example.com/archive.zip", false},
		{"https://169.254.169.254/computeMetadata/v1/", false},
	}
	for _, tt := range tests {
		u, err := url.Parse(tt.target)
		if err != nil {
			t.Fatal(err)
		}
		err = checkRepoRedirect(&http.Request{URL: u}, []*http.Request{{}})
		if (err == nil) != tt.allowed {
			t.Errorf("%s: allowed = %v, want %v (err: %v)", tt.target, err == nil, tt.allowed, err)
		}
	}

	u, _ := url.Parse("https://codeload.github.com/owner/repo/zip/main")
	if err := checkRepoRedirect(&http.Request{URL: u}, make([]*http.Request, 5)); err == nil {
		t.Error("expected an error after 5 redirects")
	}
}
