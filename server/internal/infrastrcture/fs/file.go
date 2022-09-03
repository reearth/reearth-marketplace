package fs

import (
	"net/url"

	"github.com/spf13/afero"
)

type fileRepo struct {
	fs      afero.Fs
	urlBase *url.URL
}
