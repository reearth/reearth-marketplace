package interactor

import (
	"context"

	"github.com/reearth/reearth-marketplace/server/internal/usecase/interfaces"
	"github.com/reearth/reearth-marketplace/server/internal/usecase/repo"
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
	if param.Tel != nil {
		// pending
	}
	if err := i.userRepo.Save(ctx, u); err != nil {
		return nil, err
	}
	return u, nil
}
