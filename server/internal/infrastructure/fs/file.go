package fs

import (
	"context"
	"errors"
	"io"

	"github.com/reearth/reearth-marketplace/server/internal/usecase/gateway"
	"github.com/reearth/reearth-marketplace/server/pkg/id"
)

type fileRepo struct {
	pluginBucketName string
	assetsBucketName string
	assetsBaseURL    string
}

func NewFile(bucketName, assetsBucketName, assetsBaseURL string) (gateway.File, error) {
	if bucketName == "" {
		return nil, errors.New("bucket name is empty")
	}
	if assetsBucketName == "" {
		return nil, errors.New("assets bucket name is empty")
	}
	return &fileRepo{
		pluginBucketName: bucketName,
		assetsBucketName: assetsBucketName,
		assetsBaseURL:    assetsBaseURL,
	}, nil
}

func (f *fileRepo) UploadPlugin(ctx context.Context, vid id.VersionID, content []byte) error {
	// TODO Implement this when handling a local file system in E2E, etc.
	return nil
}

func (f *fileRepo) DownloadPlugin(ctx context.Context, vid id.VersionID) (io.ReadCloser, error) {
	// TODO Implement this when handling a local file system in E2E, etc.
	return nil, nil
}

func (f *fileRepo) UploadImage(ctx context.Context, image io.ReadSeeker) (string, error) {
	// TODO Implement this when handling a local file system in E2E, etc.
	return "", nil
}

func (f *fileRepo) AssetsURL(ctx context.Context, name string) string {
	return f.assetsBaseURL + name
}
