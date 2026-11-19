package interfaces

import "errors"

type Container struct {
	Plugin       Plugin
	Organization Organization
	User         User
}

var ErrOperationDenied = errors.New("Operation denied")

var ErrInvalidPageSize = errors.New("first and last must not be negative")
