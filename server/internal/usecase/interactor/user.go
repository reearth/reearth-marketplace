package interactor

import (
	"context"

	"github.com/reearth/reearth-marketplace/server/internal/usecase/interfaces"
	"github.com/reearth/reearth-marketplace/server/internal/usecase/repo"
	"github.com/reearth/reearth-marketplace/server/pkg/id"
	"github.com/reearth/reearth-marketplace/server/pkg/user"
	"golang.org/x/text/language"
)

type User struct {
	userRepo repo.User
}

func NewUser(r *repo.Container) interfaces.User {
	return &User{
		userRepo: r.User,
	}
}

func (i *User) Update(ctx context.Context, u *user.User, param interfaces.UpdateUserParam) (*user.User, error) {
	if u == nil {
		return nil, interfaces.ErrOperationDenied
	}

	if param.Name != nil {
		u.SetName(*param.Name)
	}
	if param.DisplayName != nil {
		u.SetDisplayName(*param.DisplayName)
	}
	if param.Description != nil {
		u.SetDescription(*param.Description)
	}
	if param.Lang != nil {
		lang, err := language.Parse(*param.Lang)
		if err != nil {
			return nil, err
		}
		u.SetLang(lang)
	}
	if err := i.userRepo.Save(ctx, u); err != nil {
		return nil, err
	}
	return u, nil
}

func (i *User) FindByID(ctx context.Context, uid id.UserID) (*user.User, error) {
	us, err := i.userRepo.FindByIDs(ctx, id.UserIDList{uid})
	if err != nil {
		return nil, err
	}
	return us[0], nil
}

func (i *User) FindByIDs(ctx context.Context, uids []id.UserID) ([]*user.User, error) {
	return i.userRepo.FindByIDs(ctx, uids)
}
