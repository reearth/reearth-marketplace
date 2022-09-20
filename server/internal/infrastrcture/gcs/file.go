package gcs

import (
	"context"
	"crypto/sha256"
	"encoding/hex"
	"errors"
	"io"
	"path"

	"cloud.google.com/go/storage"
	"github.com/h2non/filetype"
	"github.com/h2non/filetype/matchers"
	"github.com/reearth/reearth-marketplace/server/internal/usecase/gateway"
	"github.com/reearth/reearth-marketplace/server/pkg/id"
)

const (
	gcsPluginBasePath = "plugins"
	gcsImagesBasePath = "images"
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
	client, err := storage.NewClient(ctx)
	if err != nil {
		return err
	}
	bucket := client.Bucket(f.pluginBucketName)
	name := path.Join(gcsPluginBasePath, vid.String(), "plugin.zip")
	object := bucket.Object(name)
	if err := object.Delete(ctx); err != nil && !errors.Is(err, storage.ErrObjectNotExist) {
		return gateway.ErrFailedToUploadFile
	}

	w := object.NewWriter(ctx)
	defer func() {
		_ = w.Close()
	}()
	if _, err := w.Write(content); err != nil {
		return gateway.ErrFailedToUploadFile
	}
	return nil
}

func (f *fileRepo) DownloadPlugin(ctx context.Context, vid id.VersionID) (io.ReadCloser, error) {
	client, err := storage.NewClient(ctx)
	if err != nil {
		return nil, err
	}
	bucket := client.Bucket(f.pluginBucketName)
	name := path.Join(gcsPluginBasePath, vid.String(), "plugin.zip")
	object := bucket.Object(name)
	r, err := object.NewReader(ctx)
	if err != nil {
		return nil, err
	}
	return r, nil
}

func (f *fileRepo) UploadImage(ctx context.Context, image io.ReadSeeker) (string, error) {
	client, err := storage.NewClient(ctx)
	if err != nil {
		return "", err
	}

	content, err := io.ReadAll(image) // TODO: size limit
	if err != nil {
		return "", err
	}

	extension, err := imageExtension(content)
	if err != nil {
		return "", err
	}

	bucket := client.Bucket(f.assetsBucketName)

	digest := sha256.Sum256(content)
	hexDigest := hex.EncodeToString(digest[:])
	name := path.Join(gcsImagesBasePath, hexDigest+extension)

	object := bucket.Object(name)
	if err := object.Delete(ctx); err != nil && !errors.Is(err, storage.ErrObjectNotExist) {
		return "", gateway.ErrFailedToUploadFile
	}

	w := object.NewWriter(ctx)
	if _, err := w.Write(content); err != nil {
		return "", gateway.ErrFailedToUploadFile
	}
	if err := w.Close(); err != nil {
		return "", gateway.ErrFailedToUploadFile
	}
	return name, nil
}

func (f *fileRepo) AssetsURL(ctx context.Context, name string) string {
	return f.assetsBaseURL + name
}

func imageExtension(b []byte) (e string, err error) {
	imageType, _ := filetype.Image(b)
	switch imageType {
	case matchers.TypePng:
		e = ".png"
	case matchers.TypeJpeg:
		e = ".jpg"
	case matchers.TypeWebp:
		e = ".webp"
	default:
		err = errors.New("unsupported format")
	}
	return
}
