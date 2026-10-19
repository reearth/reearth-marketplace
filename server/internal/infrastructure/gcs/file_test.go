package gcs

import (
	"errors"
	"testing"
)

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
