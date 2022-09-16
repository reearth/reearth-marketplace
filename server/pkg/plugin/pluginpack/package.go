package pluginpack

import (
	"archive/zip"
	"bytes"
	"context"
	"crypto/md5"
	"encoding/base64"
	"encoding/hex"
	"errors"
	"fmt"
	"io"
	"io/fs"
	"net"
	"net/http"
	"net/url"
	"path"
	"strings"
	"syscall"
	"time"

	"github.com/h2non/filetype"
	"github.com/h2non/filetype/matchers"
	"github.com/reearth/reearth-marketplace/server/pkg/plugin"
	"github.com/reearth/reearth-marketplace/server/pkg/plugin/manifest"
	"github.com/reearth/reearthx/rerror"
)

const manifestFileName = "reearth.yml"
const cmsManifestFileName = "reearth-cms.yml"

type Package struct {
	packageBytes []byte
	manifest     *manifest.Manifest
	pluginType   string
	manifestDir  string
	zr           *zip.Reader
	checksum     string
}

func PackageFromZip(r io.Reader, sizeLimit int64) (*Package, error) {
	b, err := io.ReadAll(io.LimitReader(r, sizeLimit+1))
	if err != nil {
		return nil, rerror.From("zip read error", err)
	}
	if int64(len(b)) > sizeLimit {
		return nil, errors.New("zip too large")
	}
	checksum := md5.Sum(b)

	zr, err := zip.NewReader(bytes.NewReader(b), int64(len(b)))
	if err != nil {
		return nil, rerror.From("zip open error", err)
	}
	dirQueue := []string{"."}
	var nextDirQueue []string
	for len(dirQueue) > 0 {
		var foundManifest *manifest.Manifest
		var foundPluginType string
		var manifestDir string
		for _, dir := range dirQueue {
			t, m, err := findManifest(zr, dir)
			if err != nil {
				return nil, fmt.Errorf("find manifest(%s): %w", dir, err)
			}
			if m != nil {
				if foundManifest != nil {
					return nil, fmt.Errorf("found multiple plugins at the same level")
				}
				foundManifest = m
				foundPluginType = t
				manifestDir = dir
			} else {
				dirEntries, err := fs.ReadDir(zr, dir)
				if err != nil {
					return nil, fmt.Errorf("read dir: %w", err)
				}
				for _, e := range dirEntries {
					if !e.IsDir() {
						continue
					}
					nextDirQueue = append(nextDirQueue, path.Join(dir, e.Name()))
				}
			}
		}
		if foundManifest != nil {
			return &Package{
				packageBytes: b,
				manifest:     foundManifest,
				pluginType:   foundPluginType,
				manifestDir:  manifestDir,
				zr:           zr,
				checksum:     hex.EncodeToString(checksum[:]),
			}, nil
		}
		dirQueue, nextDirQueue = nextDirQueue, dirQueue[:0]
	}
	return nil, errors.New("plugin not found")
}

const (
	iconSizeLimit = 100 * 1024
)

func ToPlugin(ctx context.Context, pkg *Package, publisherID plugin.PublisherID) (*plugin.VersionedPlugin, error) {
	iconURL, err := pkg.iconURL(ctx)
	if err != nil {
		return nil, fmt.Errorf("iconURL: %w", err)
	}
	readme, err := pkg.readme()
	if err != nil {
		return nil, fmt.Errorf("readme: %w", err)
	}
	now := time.Now()

	pv, err := plugin.NewPartialVersion().
		Name(pkg.manifest.Name).
		Version(pkg.manifest.Version).
		Author(pkg.manifest.Author).
		Repository(pkg.manifest.Repository).
		Description(pkg.manifest.Description).
		Readme(readme).
		Icon(iconURL).
		CreatedAt(now).
		UpdatedAt(now).
		PublishedAt(now).
		Checksum(pkg.checksum).
		Build()
	if err != nil {
		return nil, fmt.Errorf("partial version: %w", err)
	}

	p, err := plugin.New(publisherID).
		NewID(pkg.manifest.ID).
		Type(pkg.pluginType).
		CreatedAt(now).
		UpdatedAt(now).
		Active(false).
		LatestVersion(pv).
		Build()
	if err != nil {
		return nil, fmt.Errorf("plugin: %w", err)
	}
	vp, err := plugin.Versioned(p).
		Downloads(0).
		Active(true).
		Build()
	if err != nil {
		return nil, fmt.Errorf("versioned: %w", err)
	}
	return vp, nil
}

func (p *Package) Content() []byte {
	return p.packageBytes
}

func (p *Package) readme() (string, error) {
	b, err := fs.ReadFile(p.zr, path.Join(p.manifestDir, "README.md"))
	if err == nil {
		return string(b), nil
	}
	if errors.Is(err, fs.ErrNotExist) {
		return "", nil
	}
	return "", err
}

func (p *Package) iconURL(ctx context.Context) (string, error) {
	if p.manifest.Icon == "" {
		return "", nil
	}
	var icon []byte
	switch {
	case strings.HasPrefix(p.manifest.Icon, "http://"), strings.HasPrefix(p.manifest.Icon, "https://"):
		u, err := url.ParseRequestURI(p.manifest.Icon)
		if err != nil {
			return "", fmt.Errorf("parse icon url(%s): %w", p.manifest.Icon, err)
		}
		req, _ := http.NewRequestWithContext(ctx, http.MethodGet, u.String(), nil)
		httpClient := blockedClient()
		resp, err := httpClient.Do(req)
		if err != nil {
			return "", fmt.Errorf("fetch icon: %w", err)
		}
		defer resp.Body.Close()
		if resp.StatusCode != http.StatusOK {
			return "", fmt.Errorf("unexpected fetched status: %d", resp.StatusCode)
		}
		b, err := io.ReadAll(io.LimitReader(resp.Body, iconSizeLimit+1))
		if err != nil {
			return "", fmt.Errorf("read icon: %w", err)
		}
		icon = b
	default:
		b, err := fs.ReadFile(p.zr, path.Join(p.manifestDir, p.manifest.Icon))
		if err != nil {
			return "", err
		}
		icon = b
	}
	if len(icon) > iconSizeLimit {
		return "", errors.New("icon too large")
	}
	imageType, _ := filetype.Image(icon)
	switch imageType {
	case matchers.TypePng, matchers.TypeJpeg:
	default:
		return "", errors.New("icon unsupported format")
	}
	encodedIcon := base64.StdEncoding.EncodeToString(icon)
	return "data:" + imageType.MIME.Value + ";base64," + encodedIcon, nil
}

func findManifest(zr *zip.Reader, dir string) (string, *manifest.Manifest, error) {
	supportedManifests := []struct {
		Type string
		Name string
	}{
		{Type: "REEARTH", Name: manifestFileName},
		{Type: "REEARTH_CMS", Name: cmsManifestFileName},
	}
	var foundPluginType string
	var foundManifest *manifest.Manifest
	for _, supportedManifest := range supportedManifests {
		b, err := fs.ReadFile(zr, path.Join(dir, supportedManifest.Name))
		if errors.Is(err, fs.ErrNotExist) {
			continue
		}
		if err != nil {
			return "", nil, fmt.Errorf("read file: %w", err)
		}
		if foundManifest != nil {
			return "", nil, errors.New("ambiguous plugin type")
		}
		if m, err := manifest.Parse(bytes.NewReader(b)); err != nil {
			return "", nil, fmt.Errorf("parse manifest(%s): %w", supportedManifest.Name, err)
		} else {
			foundManifest = m
			foundPluginType = supportedManifest.Type
		}
	}
	return foundPluginType, foundManifest, nil
}

func blockedClient() *http.Client {
	tr := &http.Transport{
		DialContext: (&net.Dialer{
			Timeout:   30 * time.Second,
			KeepAlive: 30 * time.Second,
			Control: func(network, address string, c syscall.RawConn) error {
				if !net.ParseIP(address).IsGlobalUnicast() {
					return errors.New("blocked address")
				}
				return nil
			},
		}).DialContext,
		ForceAttemptHTTP2:     true,
		MaxIdleConns:          100,
		IdleConnTimeout:       90 * time.Second,
		TLSHandshakeTimeout:   10 * time.Second,
		ExpectContinueTimeout: 1 * time.Second,
	}
	return &http.Client{Transport: tr}
}
