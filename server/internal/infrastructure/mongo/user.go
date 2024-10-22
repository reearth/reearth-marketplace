package mongo

import (
	"context"
	"crypto/rand"
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"strings"

	"github.com/reearth/reearth-marketplace/server/internal/infrastructure/mongo/mongodoc"
	"github.com/reearth/reearth-marketplace/server/internal/usecase/repo"
	"github.com/reearth/reearth-marketplace/server/pkg/id"
	"github.com/reearth/reearth-marketplace/server/pkg/user"
	"github.com/reearth/reearthx/mongox"
	"github.com/samber/lo"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"golang.org/x/text/language"
)

type userRepo struct {
	client *mongox.ClientCollection
}

func NewUser(client *mongox.Client) repo.User {
	r := &userRepo{client: client.WithCollection("user")}
	r.init()
	return r
}

func (u *userRepo) init() {
	ctx := context.Background()
	initIndexes(
		ctx,
		u.client,
		nil,
		[]string{"id", "oidcSub"},
	)
	lo.Must(u.client.Client().Indexes().CreateOne(ctx, mongo.IndexModel{
		Keys: bson.D{{Key: "name", Value: 1}},
		Options: options.Index().
			SetUnique(true).
			SetPartialFilterExpression(bson.M{"name": bson.M{"$gt": ""}}),
	}))
}

func (u *userRepo) FindOrCreate(ctx context.Context, authInfo repo.AuthInfo) (*user.User, error) {
	oidcSub := authInfo.Sub
	newUser, err := user.New().
		NewID().
		Auth(user.AuthFromOIDCSub(oidcSub)).
		Lang(language.Und).
		Build()
	if err != nil {
		return nil, fmt.Errorf("new user: %w", err)
	}
	var userDoc mongodoc.UserDocument
	newUserDoc, _ := mongodoc.NewUser(newUser)
	if err := u.client.Client().
		FindOneAndUpdate(ctx,
			bson.M{"oidcSub": oidcSub},
			bson.M{"$setOnInsert": newUserDoc},
			options.FindOneAndUpdate().SetUpsert(true).SetReturnDocument(options.After),
		).
		Decode(&userDoc); err != nil {
		return nil, fmt.Errorf("find user: %w", err)
	}
	isNewUser := userDoc.Name == ""
	if isNewUser {
		userName, err := makeInitialUserName(ctx, authInfo)
		if err != nil {
			return nil, fmt.Errorf("make initial user name: %w", err)
		}
		userDoc.Name = userName
		if err := u.client.SaveOne(ctx, userDoc.ID, userDoc); err != nil {
			if !mongo.IsDuplicateKeyError(err) {
				return nil, fmt.Errorf("set initial user name: %w", err)
			}
			// fallback: use random user name
			randomUserName, err := user.RandomName(rand.Reader, 8)
			if err != nil {
				return nil, fmt.Errorf("get random initial user name: %w", err)
			}
			userDoc.Name = randomUserName
			if err := u.client.SaveOne(ctx, userDoc.ID, userDoc); err != nil {
				return nil, fmt.Errorf("set random initial user name: %w", err)
			}
		}
	}
	return userDoc.Model()
}

func (u *userRepo) FindByIDs(ctx context.Context, ids id.UserIDList) ([]*user.User, error) {
	if len(ids) == 0 {
		return nil, nil
	}
	filter := bson.M{
		"id": bson.M{
			"$in": ids.Strings(),
		},
	}
	c := mongodoc.UserConsumer{
		Rows: make([]*user.User, 0, len(ids)),
	}
	if err := u.client.Find(ctx, filter, &c); err != nil {
		return nil, err
	}
	return c.Rows, nil
}

func (u *userRepo) SaveAll(ctx context.Context, users []*user.User) error {
	ids, docs := mongodoc.NewUsers(users)
	if err := u.client.SaveAll(ctx, ids, docs); err != nil {
		return err
	}
	return nil
}

func (u *userRepo) Save(ctx context.Context, user *user.User) error {
	doc, uid := mongodoc.NewUser(user)
	if err := u.client.SaveOne(ctx, uid, doc); err != nil {
		return err
	}
	return nil
}

func makeInitialUserName(ctx context.Context, authInfo repo.AuthInfo) (string, error) {
	userInfoEndpoint, err := resolveUserInfoEndpoint(ctx, authInfo.Iss)
	if err != nil {
		return "", fmt.Errorf("resolve userinfo_endpoint: %w", err)
	}
	ui, err := fetchUserInfo(ctx, userInfoEndpoint, authInfo.Token)
	if err != nil {
		return "", fmt.Errorf("fetch user name: %w", err)
	}
	if user.IsSafeName(ui.Name) {
		return ui.Name, nil
	}
	// fallback: use local-part of email as user name
	userName, _, _ := strings.Cut(ui.Email, "@")
	if user.IsSafeName(userName) {
		return userName, nil
	}
	return "", fmt.Errorf("cannot make valid initial user name")
}

func resolveUserInfoEndpoint(ctx context.Context, iss string) (string, error) {
	configURL, err := url.JoinPath(iss, "/.well-known/openid-configuration")
	if err != nil {
		return "", fmt.Errorf("unsupported issuer: %w", err)
	}
	req, _ := http.NewRequestWithContext(ctx, http.MethodGet, configURL, nil)
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return "", fmt.Errorf("get openid-configuration: %w", err)
	}
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusOK {
		return "", fmt.Errorf("get openid-configuration: unexpected status: %d", resp.StatusCode)
	}
	var oidConfiguration struct {
		UserInfoEndpoint string `json:"userinfo_endpoint"`
	}
	if err := json.NewDecoder(resp.Body).Decode(&oidConfiguration); err != nil {
		return "", fmt.Errorf("get openid-configuration: invalid json: %w", err)
	}
	return oidConfiguration.UserInfoEndpoint, nil
}

type userInfo struct {
	Name  string `json:"name"`
	Email string `json:"email"`
}

func fetchUserInfo(ctx context.Context, userInfoEndpoint string, token string) (*userInfo, error) {
	req, _ := http.NewRequestWithContext(ctx, http.MethodGet, userInfoEndpoint, nil)
	req.Header.Set("Authorization", "Bearer "+token)
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return nil, fmt.Errorf("get userinfo: %w", err)
	}
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("get userinfo: unexpected status: %d", resp.StatusCode)
	}
	var ui userInfo
	if err := json.NewDecoder(resp.Body).Decode(&ui); err != nil {
		return nil, fmt.Errorf("get userinfo: invalid json: %w", err)
	}
	return &ui, nil
}
