package adapter

import (
	"context"

	"github.com/graph-gophers/dataloader/v7"
	"github.com/reearth/reearth-marketplace/server/internal/usecase/interfaces"
	"github.com/reearth/reearth-marketplace/server/pkg/id"
	"github.com/reearth/reearth-marketplace/server/pkg/user"
)

const contextLoaders ContextKey = "loaders"

type Loaders struct {
	User *dataloader.Loader[id.UserID, *user.User]
}

func AttachLoaders(ctx context.Context, u *interfaces.Container) context.Context {
	return context.WithValue(ctx, contextLoaders, newLoaders(u))
}

func GetLoaders(ctx context.Context) *Loaders {
	l, _ := ctx.Value(contextLoaders).(*Loaders)
	return l
}

func newLoaders(u *interfaces.Container) *Loaders {
	return &Loaders{
		User: dataloader.NewBatchedLoader(userBatchFn(u)),
	}
}

func userBatchFn(u *interfaces.Container) dataloader.BatchFunc[id.UserID, *user.User] {
	return func(ctx context.Context, keys []id.UserID) []*dataloader.Result[*user.User] {
		users, err := u.User.FindByIDs(ctx, keys)
		results := make([]*dataloader.Result[*user.User], len(keys))
		if err != nil {
			for i := range keys {
				results[i] = &dataloader.Result[*user.User]{Error: err}
			}
			return results
		}
		byID := make(map[id.UserID]*user.User, len(users))
		for _, us := range users {
			if us != nil {
				byID[us.ID()] = us
			}
		}
		for i, k := range keys {
			results[i] = &dataloader.Result[*user.User]{Data: byID[k]}
		}
		return results
	}
}
