package mongo

import (
	"context"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/reearth/reearth-marketplace/server/internal/usecase/repo"
	"github.com/reearth/reearth-marketplace/server/pkg/user"
	"github.com/reearth/reearthx/mongox"
	"github.com/reearth/reearthx/mongox/mongotest"
)

func Test_userRepo_FindOrCreate(t *testing.T) {
	user1, _ := user.New().
		NewID().
		Name("used_name").
		Auth(user.AuthFromOIDCSub("000001")).
		Build()

	user2, _ := user.New().
		NewID().
		Name("").
		Auth(user.AuthFromOIDCSub("999999")).
		Build()

	initialData := []*user.User{
		user1,
		user2,
	}
	oidcServer := mockOIDCServer(map[string]*userInfo{
		"eyJ_00002": {Name: "unique_name", Email: "unique@email.test"},
		"eyJ_00003": {Name: "used_name", Email: "unique@email.test"},
		"eyJ_00004": {Name: "Unsafe Name", Email: "safe@email.test"},
		"eyJ_00005": {Name: "Unsafe Name", Email: "unsafe+reearth@email.test"},
	})

	type args struct {
		authInfo repo.AuthInfo
	}
	tests := []struct {
		name    string
		args    args
		want    string
		wantNot string
		wantErr bool
	}{
		{
			name: "FoundUser",
			args: args{
				authInfo: repo.AuthInfo{
					Sub:   "000001",
					Iss:   oidcServer.URL,
					Token: "eyJ_00001",
				},
			},
			want: "used_name",
		},
		{
			name: "NewUser/FromName",
			args: args{
				authInfo: repo.AuthInfo{
					Sub:   "000002",
					Iss:   oidcServer.URL,
					Token: "eyJ_00002",
				},
			},
			want: "unique_name",
		},
		{
			name: "NewUser/FromRandom",
			args: args{
				authInfo: repo.AuthInfo{
					Sub:   "000003",
					Iss:   oidcServer.URL,
					Token: "eyJ_00003",
				},
			},
			wantNot: "used_name",
		},
		{
			name: "NewUser/FromEmail",
			args: args{
				authInfo: repo.AuthInfo{
					Sub:   "000004",
					Iss:   oidcServer.URL,
					Token: "eyJ_00004",
				},
			},
			want: "safe",
		},
		{
			// Regression test for REL-07: an unsafe name and an unsafe email
			// local-part is a deterministic failure that will never resolve on
			// retry, so this must fall back to a random name instead of
			// returning an error and leaving the account permanently nameless.
			name: "NewUser/BothUnsafe",
			args: args{
				authInfo: repo.AuthInfo{
					Sub:   "000005",
					Iss:   oidcServer.URL,
					Token: "eyJ_00005",
				},
			},
			wantNot: "Unsafe Name",
		},
	}

	connect := mongotest.Connect(t)
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			db := connect(t)

			u := NewUser(mongox.NewClientWithDatabase(db))

			ctx := context.Background()
			for _, d := range initialData {
				if err := u.Save(ctx, d); err != nil {
					t.Fatal("load init data: ", err)
				}
			}

			got, err := u.FindOrCreate(ctx, tt.args.authInfo)
			if tt.wantErr != (err != nil) {
				t.Errorf("unexpected error: %v", err)
			} else if tt.wantNot != "" && got.Name() == tt.wantNot {
				t.Errorf("unexpected name: got=%q, wantNot=%q", got.Name(), tt.wantNot)
			} else if tt.want != "" && got.Name() != tt.want {
				t.Errorf("unexpected name: got=%q, want=%q", got.Name(), tt.want)
			}
		})
	}
}

// Test_userRepo_FindOrCreate_UnsafeNameDoesNotLockOutAccount is a regression test for
// REL-07: the account document is upserted before the IdP-derived name is resolved, so
// a deterministic name-derivation failure (unsafe name and unsafe email local-part) used
// to leave the account permanently nameless -- every subsequent FindOrCreate call for the
// same oidcSub re-entered the same failing branch and errored identically forever. This
// confirms a second call for the same account now succeeds instead of repeating the
// failure.
func Test_userRepo_FindOrCreate_UnsafeNameDoesNotLockOutAccount(t *testing.T) {
	oidcServer := mockOIDCServer(map[string]*userInfo{
		"eyJ_lockout": {Name: "Unsafe Name", Email: "unsafe+reearth@email.test"},
	})

	connect := mongotest.Connect(t)
	db := connect(t)
	u := NewUser(mongox.NewClientWithDatabase(db))
	ctx := context.Background()

	authInfo := repo.AuthInfo{
		Sub:   "lockout-user",
		Iss:   oidcServer.URL,
		Token: "eyJ_lockout",
	}

	first, err := u.FindOrCreate(ctx, authInfo)
	if err != nil {
		t.Fatalf("first FindOrCreate should not error: %v", err)
	}
	if first.Name() == "" {
		t.Fatal("first FindOrCreate should assign a fallback name, not leave the account nameless")
	}

	second, err := u.FindOrCreate(ctx, authInfo)
	if err != nil {
		t.Fatalf("second FindOrCreate for the same account should not error (this is the lockout this test guards against): %v", err)
	}
	if second.ID() != first.ID() {
		t.Fatalf("second call should return the same account, got a different one: first=%q second=%q", first.ID(), second.ID())
	}
	if second.Name() != first.Name() {
		t.Fatalf("second call should not re-derive a new name for an already-named account: first=%q second=%q", first.Name(), second.Name())
	}
}

func mockOIDCServer(userInfoMap map[string]*userInfo) *httptest.Server {
	mux := http.NewServeMux()
	selfURL := ""
	mux.HandleFunc("/.well-known/openid-configuration", func(w http.ResponseWriter, req *http.Request) {
		if req.Method != http.MethodGet {
			w.WriteHeader(http.StatusMethodNotAllowed)
			return
		}
		var config struct {
			UserInfoEndpoint string `json:"userinfo_endpoint"`
		}
		config.UserInfoEndpoint = selfURL + "/userinfo"
		_ = json.NewEncoder(w).Encode(config)
	})
	mux.HandleFunc("/userinfo", func(w http.ResponseWriter, req *http.Request) {
		if req.Method != http.MethodGet {
			w.WriteHeader(http.StatusMethodNotAllowed)
			return
		}
		token := strings.TrimPrefix(req.Header.Get("Authorization"), "Bearer ")
		userInfo, ok := userInfoMap[token]
		if !ok {
			http.Error(w, "token not found", http.StatusInternalServerError)
			return
		}
		_ = json.NewEncoder(w).Encode(userInfo)
	})
	s := httptest.NewServer(mux)
	selfURL = s.URL
	return s
}
