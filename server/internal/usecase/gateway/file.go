package gateway

import (
	"context"
	"errors"
	"io"

	"github.com/reearth/reearth-marketplace/server/pkg/id"
)

var (
	ErrFailedToUploadFile = errors.New("failed to upload file")
)

type File interface {
	UploadPlugin(ctx context.Context, pid id.VersionID, content []byte) error
	UploadImage(ctx context.Context, img io.ReadSeeker) (string, error)
	AssetsURL(ctx context.Context, name string) string
}
