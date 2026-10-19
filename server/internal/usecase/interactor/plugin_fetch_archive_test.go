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

func TestFetchArchive_TransportErrorIsNotMasked(t *testing.T) {
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
