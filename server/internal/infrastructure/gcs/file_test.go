package gcs

import (
	"errors"
	"testing"
)

// fakeWriteCloser lets tests control what Write and Close return, without needing
// a real or fake GCS backend.
type fakeWriteCloser struct {
	writeErr error
	closeErr error
	closed   bool
}

func (w *fakeWriteCloser) Write(p []byte) (int, error) {
	if w.writeErr != nil {
		return 0, w.writeErr
	}
	return len(p), nil
}

func (w *fakeWriteCloser) Close() error {
	w.closed = true
	return w.closeErr
}

func TestWriteAndClose_Success(t *testing.T) {
	w := &fakeWriteCloser{}
	if err := writeAndClose(w, []byte("content")); err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if !w.closed {
		t.Error("writer should have been closed")
	}
}

func TestWriteAndClose_WriteError(t *testing.T) {
	w := &fakeWriteCloser{writeErr: errors.New("write failed")}
	if err := writeAndClose(w, []byte("content")); err == nil {
		t.Fatal("expected an error, got nil")
	}
	if !w.closed {
		t.Error("writer should still be closed after a write error")
	}
}

// TestWriteAndClose_CloseErrorIsNotDropped is a regression test for REL-05: a
// storage.Writer buffers writes and only reports the upload's real outcome on
// Close, but UploadPlugin used to discard the Close error entirely
// (defer func() { _ = w.Close() }()) and unconditionally return nil. A GCS
// failure at Close time (transient 5xx, token refresh failure, permission
// change) would then be invisible: the caller commits a database record
// pointing at an object that was never actually written.
func TestWriteAndClose_CloseErrorIsNotDropped(t *testing.T) {
	w := &fakeWriteCloser{closeErr: errors.New("close failed")}
	err := writeAndClose(w, []byte("content"))
	if err == nil {
		t.Fatal("a Close error must be surfaced, not silently dropped")
	}
	if !w.closed {
		t.Error("writer should have been closed")
	}
}
