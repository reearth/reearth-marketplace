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
	UploadPlugin(ctx context.Context, vid id.VersionID, content []byte) error
	DownloadPlugin(ctx context.Context, vid id.VersionID) ([]byte, error)
	UploadImage(ctx context.Context, img io.ReadSeeker) (string, error)
	AssetsURL(ctx context.Context, name string) string
}
