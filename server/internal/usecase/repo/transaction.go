package repo

import (
	"context"
)

type Transaction interface {
	Begin() (Tx, error)
}

type Tx interface {
	Commit()
	End(ctx context.Context) error
	IsCommitted() bool
}
