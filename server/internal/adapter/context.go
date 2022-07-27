package adapter

import (
	"context"

	"github.com/reearth/reearth-marketplace/server/pkg/user"
	"github.com/reearth/reearthx/appx"
)

type ContextKey string

const (
	contextUser     ContextKey = "user"
	ContextAuthInfo ContextKey = "authinfo"
)

type AuthInfo struct {
	Token         string
	Sub           string
	Iss           string
	Name          string
	Email         string
	EmailVerified *bool
}

func AttachUser(ctx context.Context, u *user.User) context.Context {
	return context.WithValue(ctx, contextUser, u)
}

func User(ctx context.Context) *user.User {
	if v := ctx.Value(contextUser); v != nil {
		if u, ok := v.(*user.User); ok {
			return u
		}
	}
	return nil
}

func GetAuthInfo(ctx context.Context) *AuthInfo {
	if ai, ok := ctx.Value(ContextAuthInfo).(*appx.AuthInfo); ok {
		return &AuthInfo{
			Token:         ai.Token,
			Sub:           ai.Sub,
			Iss:           ai.Iss,
			Name:          ai.Name,
			Email:         ai.Email,
			EmailVerified: ai.EmailVerified,
		}
	}
	return nil
}
