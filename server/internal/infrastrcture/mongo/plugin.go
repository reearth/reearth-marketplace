package mongo

import (
	"context"
	"encoding/base64"
	"encoding/json"
	"errors"
	"fmt"
	"regexp"
	"strings"
	"time"

	"github.com/reearth/reearth-marketplace/server/internal/infrastrcture/mongo/mongodoc"
	"github.com/reearth/reearth-marketplace/server/internal/usecase/interfaces"
	"github.com/reearth/reearth-marketplace/server/internal/usecase/repo"
	"github.com/reearth/reearth-marketplace/server/pkg/id"
	"github.com/reearth/reearth-marketplace/server/pkg/plugin"
	"github.com/reearth/reearth-marketplace/server/pkg/user"
	"github.com/reearth/reearthx/mongox"
	"github.com/reearth/reearthx/rerror"
	"github.com/reearth/reearthx/usecase"
	"github.com/samber/lo"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type pluginRepo struct {
	client *mongox.Client
}

func (r *pluginRepo) Liked(ctx context.Context, user *user.User, id plugin.ID) (bool, error) {
	var c mongox.SliceConsumer[mongodoc.PluginLikeDocument]
	err := r.pluginLikeClient().FindOne(
		ctx,
		bson.M{"userId": user.ID().String(), "pluginId": id.String()},
		&c,
	)
	if err == nil {
		return true, nil
	}
	if errors.Is(err, rerror.ErrNotFound) {
		return false, nil
	}
	return false, err
}

func (r *pluginRepo) FindByVersion(ctx context.Context, id plugin.ID, version string) (*plugin.VersionedPlugin, error) {
	var pc mongodoc.PluginConsumer
	if err := r.pluginClient().FindOne(ctx, bson.M{"id": id}, &pc); err != nil {
		return nil, err
	}
	var pvc mongox.SliceConsumer[mongodoc.PluginVersionDocument]
	if err := r.pluginVersionClient().FindOne(ctx, bson.M{"pluginId": id, "version": version}, &pvc); err != nil {
		return nil, err
	}
	pvd := pvc.Result[0]
	return plugin.Versioned(pc.Rows[0]).
		Version(pvd.Version).
		Author(pvd.Author).
		Active(pvd.Active).
		Downloads(pvd.Downloads).
		Description(pvd.Description).
		Repository(pvd.Repository).
		Readme(pvd.Readme).
		Icon(pvd.Icon).
		CreatedAt(pvd.CreatedAt).
		UpdatedAt(pvd.UpdatedAt).
		PublishedAt(pvd.PublishedAt).
		Checksum(pvd.Checksum).
		Build()
}

func (r *pluginRepo) SaveVersion(ctx context.Context, v *plugin.Version) error {
	if err := r.pluginVersionClient().SaveOne(ctx, v.ID().String(), mongodoc.NewVersion(v)); err != nil {
		return err
	}
	return nil
}

func NewPlugin(client *mongox.Client) repo.Plugin {
	r := &pluginRepo{
		client: client,
	}
	r.init()
	return r
}

func (r *pluginRepo) init() {
	r.pluginClient().CreateUniqueIndex(context.Background(), []string{"name", "publisherId", "publishedAt", "downloads"}, []string{"name"})
	_, _ = r.pluginLikeClient().Collection().Indexes().CreateOne(context.Background(), mongo.IndexModel{
		Keys:    bson.D{{Key: "userId", Value: 1}, {Key: "pluginId", Value: 1}},
		Options: options.Index().SetUnique(true),
	})
}

func (r *pluginRepo) pluginClient() *mongox.ClientCollection {
	return r.client.WithCollection("plugin")
}

func (r *pluginRepo) pluginVersionClient() *mongox.ClientCollection {
	return r.client.WithCollection("plugin_version")
}

func (r *pluginRepo) pluginLikeClient() *mongox.ClientCollection {
	return r.client.WithCollection("plugin_like")
}

func (r *pluginRepo) Create(ctx context.Context, p *plugin.VersionedPlugin) (err error) {
	pluginDoc, pluginVersionDoc := mongodoc.NewVersionedPlugin(p)
	var pc mongox.SliceConsumer[mongodoc.PluginDocument]
	if err := r.pluginClient().FindOne(ctx, bson.M{"id": pluginDoc.ID}, &pc); err != nil && !errors.Is(err, rerror.ErrNotFound) {
		return fmt.Errorf("find plugin: %w", err)
	}
	if len(pc.Result) > 0 {
		if p.Plugin().PublisherID().String() != pc.Result[0].PublisherID {
			return fmt.Errorf("plugin id already used")
		}
	}
	if err := r.pluginClient().SaveOne(ctx, pluginDoc.ID, pluginDoc); err != nil {
		return fmt.Errorf("save plugin: %w", err)
	}
	var pvc mongox.SliceConsumer[mongodoc.PluginVersionDocument]
	if err := r.pluginVersionClient().FindOne(ctx, bson.M{"id": pluginVersionDoc.ID}, &pvc); err != nil && !errors.Is(err, rerror.ErrNotFound) {
		return fmt.Errorf("find plugin version: %w", err)
	}
	if len(pvc.Result) > 0 {
		return fmt.Errorf("plugin version already exists")
	}
	if err := r.pluginVersionClient().SaveOne(ctx, pluginVersionDoc.ID, pluginVersionDoc); err != nil {
		return fmt.Errorf("save plugin version: %w", err)
	}
	return nil
}

func (r *pluginRepo) FindByID(ctx context.Context, id plugin.ID) (*plugin.Plugin, error) {
	var consumer mongodoc.PluginConsumer
	if err := r.pluginClient().FindOne(ctx, bson.M{"id": id.String()}, &consumer); err != nil {
		return nil, err
	}
	return consumer.Rows[0], nil
}

func (r *pluginRepo) Save(ctx context.Context, p *plugin.Plugin) error {
	pluginDoc := mongodoc.NewPlugin(p)
	return r.pluginClient().SaveOne(ctx, pluginDoc.ID, pluginDoc)
}

func (r *pluginRepo) Search(ctx context.Context, user *user.User, param *interfaces.SearchPluginParam) ([]*plugin.VersionedPlugin, *usecase.PageInfo, error) {
	var conditions []bson.M
	conditions = append(conditions, bson.M{
		"active": true,
	})
	if param.Keyword != nil {
		keywordMatcher := bson.M{"$regex": regexp.QuoteMeta(*param.Keyword)}
		conditions = append(conditions, bson.M{
			"$or": bson.A{
				bson.M{"id": keywordMatcher},
				bson.M{"name": keywordMatcher},
				bson.M{"description": keywordMatcher},
				bson.M{"author": keywordMatcher},
				bson.M{"tags": keywordMatcher},
			},
		})
	}
	if len(param.Tags) > 0 {
		conditions = append(conditions, bson.M{
			"tags": bson.M{"$all": param.Tags},
		})
	}
	if param.Publisher != nil {
		conditions = append(conditions, bson.M{
			"publisherId": *param.Publisher,
		})
	}
	if len(param.Types) > 0 {
		conditions = append(conditions, bson.M{
			"type": bson.M{"$in": param.Types},
		})
	}
	if param.Liked != nil {
		var c mongox.SliceConsumer[mongodoc.PluginLikeDocument]
		if err := r.pluginLikeClient().Find(ctx, bson.M{"userId": user.ID()}, &c); err != nil {
			return nil, nil, err
		}
		likedPluginIDs := lo.Map(c.Result, func(x mongodoc.PluginLikeDocument, _ int) string { return x.PluginID })
		conditions = append(conditions, bson.M{
			"id": bson.M{"$in": likedPluginIDs},
		})
	}

	totalCount, err := r.pluginClient().Count(ctx, toFilter(conditions))
	if err != nil {
		return nil, nil, err
	}

	sort, err := NewSort(param.Sort)
	if err != nil {
		return nil, nil, err
	}
	findOption := options.Find().SetSort(sort.SortOption())
	limit := 0
	if param.First != nil {
		limit = *param.First
		findOption.SetLimit(int64(limit) + 1)
		if param.After != nil {
			if sc, err := decodeSearchCursor(sort.Key, *param.After); err == nil {
				conditions = append(conditions, sort.AfterCondition(sc))
			}
		}
	} else if param.Last != nil {
		limit = *param.Last
		findOption.SetLimit(int64(limit) + 1)
		if param.Before != nil {
			if sc, err := decodeSearchCursor(sort.Key, *param.Before); err == nil {
				conditions = append(conditions, sort.BeforeCondition(sc))
			}
		}
	}
	cur, err := r.pluginClient().Collection().Find(ctx, toFilter(conditions), findOption)
	if err != nil {
		return nil, nil, err
	}
	defer func() {
		_ = cur.Close(ctx)
	}()

	var ps []*plugin.VersionedPlugin
	for cur.Next(ctx) {
		var doc mongodoc.PluginDocument
		if err := cur.Decode(&doc); err != nil {
			return nil, nil, err
		}
		p, err := doc.Model()
		if err != nil {
			return nil, nil, err
		}
		vp, err := plugin.Versioned(p).Build()
		if err != nil {
			return nil, nil, err
		}
		ps = append(ps, vp)
	}
	if err := cur.Err(); err != nil {
		return nil, nil, err
	}

	hasNextPage := false
	hasPreviousPage := false
	if len(ps) > limit {
		if param.First != nil {
			hasNextPage = true
		}
		if param.Last != nil {
			hasPreviousPage = true
		}
		ps = ps[:limit]
	}
	if param.Last != nil {
		ps = lo.Reverse(ps)
	}
	if len(ps) == 0 {
		return nil, usecase.EmptyPageInfo(), nil
	}
	startCursor, err := encodeSearchCursor(sort.Key, ps[0])
	if err != nil {
		return nil, nil, err
	}
	endCursor, err := encodeSearchCursor(sort.Key, ps[len(ps)-1])
	if err != nil {
		return nil, nil, err
	}
	return ps, usecase.NewPageInfo(int(totalCount), startCursor, endCursor, hasNextPage, hasPreviousPage), nil
}

func (r *pluginRepo) Like(ctx context.Context, user *user.User, id plugin.ID) error {
	newPluginLikeDoc := mongodoc.NewPluginLike(user.ID(), id)
	err := r.pluginLikeClient().Collection().FindOneAndUpdate(ctx,
		bson.M{"pluginId": id.String(), "userId": user.ID()},
		bson.M{"$setOnInsert": newPluginLikeDoc},
		options.FindOneAndUpdate().SetUpsert(true).SetReturnDocument(options.Before),
	).Err()
	if errors.Is(err, mongo.ErrNoDocuments) {
		return nil
	}
	return fmt.Errorf("duplicated like")
}

func (r *pluginRepo) Unlike(ctx context.Context, user *user.User, id plugin.ID) error {
	return r.pluginLikeClient().RemoveOne(ctx, bson.M{"pluginId": id.String(), "userId": user.ID()})
}

func (r *pluginRepo) Versions(ctx context.Context, id plugin.ID) ([]*plugin.Version, error) {
	var c mongox.SliceConsumer[mongodoc.PluginVersionDocument]
	if err := r.pluginVersionClient().Find(ctx, bson.M{"pluginId": id.String()}, &c); err != nil {
		return nil, err
	}
	var vs []*plugin.Version
	for _, d := range c.Result {
		v, err := d.Model()
		if err != nil {
			return nil, err
		}
		vs = append(vs, v)
	}
	return vs, nil
}

func (r *pluginRepo) UpdateLatest(ctx context.Context, p *plugin.Plugin) (*plugin.Plugin, error) {
	sr := r.pluginVersionClient().Collection().FindOne(
		ctx,
		bson.M{"pluginId": p.ID().String(), "active": true},
		options.FindOne().SetSort(bson.D{{Key: "createdAt", Value: -1}}),
	)
	if err := sr.Err(); err != nil {
		if !errors.Is(sr.Err(), mongo.ErrNoDocuments) {
			return nil, err
		}
		pv, _ := plugin.NewPartialVersion().Version("0.0.0").Build()
		p.SetLatestVersion(pv)
	} else {
		var d mongodoc.PluginVersionDocument
		if err := sr.Decode(&d); err != nil {
			return nil, err
		}
		v, err := d.Model()
		if err != nil {
			return nil, err
		}
		p.SetLatestVersion(&v.PartialVersion)
	}

	if err := r.Save(ctx, p); err != nil {
		return nil, err
	}
	return p, nil
}

func (r *pluginRepo) List(ctx context.Context, uid id.UserID, param *interfaces.ListPluginParam) ([]*plugin.VersionedPlugin, *usecase.PageInfo, error) {
	var conditions []bson.M
	conditions = append(conditions, bson.M{
		"publisherId": uid.String(),
	})
	if param.ActiveOnly {
		conditions = append(conditions, bson.M{
			"active": true,
		})
	}
	totalCount, err := r.pluginClient().Count(ctx, toFilter(conditions))
	if err != nil {
		return nil, nil, err
	}

	sort, err := NewSort("CREATEDAT_DESC")
	if err != nil {
		return nil, nil, err
	}
	findOption := options.Find().SetSort(sort.SortOption())
	limit := 0
	if param.First != nil {
		limit = *param.First
		findOption.SetLimit(int64(limit) + 1)
		if param.After != nil {
			if sc, err := decodeSearchCursor(sort.Key, *param.After); err == nil {
				conditions = append(conditions, sort.AfterCondition(sc))
			}
		}
	} else if param.Last != nil {
		limit = *param.Last
		findOption.SetLimit(int64(limit) + 1)
		if param.Before != nil {
			if sc, err := decodeSearchCursor(sort.Key, *param.Before); err == nil {
				conditions = append(conditions, sort.BeforeCondition(sc))
			}
		}
	}
	cur, err := r.pluginClient().Collection().Find(ctx, toFilter(conditions), findOption)
	if err != nil {
		return nil, nil, err
	}
	defer func() {
		_ = cur.Close(ctx)
	}()

	var ps []*plugin.VersionedPlugin
	for cur.Next(ctx) {
		var doc mongodoc.PluginDocument
		if err := cur.Decode(&doc); err != nil {
			return nil, nil, err
		}
		p, err := doc.Model()
		if err != nil {
			return nil, nil, err
		}
		vp, err := plugin.Versioned(p).Build()
		if err != nil {
			return nil, nil, err
		}
		ps = append(ps, vp)
	}
	if err := cur.Err(); err != nil {
		return nil, nil, err
	}

	hasNextPage := false
	hasPreviousPage := false
	if len(ps) > limit {
		if param.First != nil {
			hasNextPage = true
		}
		if param.Last != nil {
			hasPreviousPage = true
		}
		ps = ps[:limit]
	}
	if param.Last != nil {
		ps = lo.Reverse(ps)
	}
	if len(ps) == 0 {
		return nil, usecase.EmptyPageInfo(), nil
	}
	startCursor, err := encodeSearchCursor(sort.Key, ps[0])
	if err != nil {
		return nil, nil, err
	}
	endCursor, err := encodeSearchCursor(sort.Key, ps[len(ps)-1])
	if err != nil {
		return nil, nil, err
	}
	return ps, usecase.NewPageInfo(int(totalCount), startCursor, endCursor, hasNextPage, hasPreviousPage), nil
}

type searchCursor struct {
	Key interface{} `json:"key"`
	ID  string      `json:"id"`
}

func (c *searchCursor) IsValidKeyType() bool {
	switch c.Key.(type) {
	case string, int, int64:
		return true
	default:
		return false
	}
}

func (c *searchCursor) Encode() (string, error) {
	if !c.IsValidKeyType() {
		return "", fmt.Errorf("can not encode cursor: %+v", c.Key)
	}
	b, err := json.Marshal(c)
	if err != nil {
		return "", err
	}
	return base64.StdEncoding.EncodeToString(b), nil
}

func toFilter(conditions []bson.M) bson.M {
	if len(conditions) > 0 {
		return bson.M{
			"$and": conditions,
		}
	} else {
		return bson.M{}
	}
}

func encodeSearchCursor(key string, p *plugin.VersionedPlugin) (*usecase.Cursor, error) {
	var sc searchCursor
	sc.ID = p.Plugin().ID().String()
	switch key {
	case "name":
		sc.Key = p.Plugin().Name()
	case "publisherId":
		sc.Key = p.Plugin().PublisherID().String()
	case "publishedAt":
		sc.Key = p.Plugin().LatestVersion().PublishedAt().UnixMicro()
	case "createdAt":
		sc.Key = p.Plugin().LatestVersion().CreatedAt().UnixMicro()
	case "downloads":
		sc.Key = p.Plugin().Downloads()
	default:
		return nil, fmt.Errorf("unsupported key: %s", key)
	}
	cur, err := sc.Encode()
	if err != nil {
		return nil, err
	}
	return usecase.CursorFromRef(&cur), nil
}

func decodeSearchCursor(key, s string) (*searchCursor, error) {
	b, err := base64.StdEncoding.DecodeString(s)
	if err != nil {
		return nil, err
	}
	var sc searchCursor
	if err := json.Unmarshal(b, &sc); err != nil {
		return nil, err
	}
	if !sc.IsValidKeyType() {
		return nil, fmt.Errorf("invalid cursor type")
	}
	if key == "publishedAt" || key == "createdAt" {
		sc.Key = time.UnixMicro(sc.Key.(int64))
	}
	return &sc, nil
}

type Sort struct {
	Key string
	Val int
}

func NewSort(sort string) (*Sort, error) {
	key := ""
	val := 0
	field, order, _ := strings.Cut(sort, "_")
	switch field {
	case "NAME":
		key = "name"
	case "PUBLISHER":
		key = "publisherId"
	case "PUBLISHEDAT":
		key = "publishedAt"
	case "CREATEDAT":
		key = "createdAt"
	case "DOWNLOADS":
		key = "downloads"
	default:
		return nil, fmt.Errorf("unknown field: %s", field)
	}
	switch order {
	case "ASC":
		val = 1
	case "DESC":
		val = -1
	default:
		return nil, fmt.Errorf("unknown order: %s", order)
	}
	return &Sort{Key: key, Val: val}, nil
}

func (s *Sort) SortOption() bson.D {
	return bson.D{{Key: s.Key, Value: s.Val}, {Key: "id", Value: 1}}
}

func (s *Sort) AfterCondition(sc *searchCursor) bson.M {
	return bson.M{
		"$or": bson.A{
			bson.M{"$and": bson.A{bson.M{s.Key: bson.M{"$eq": sc.Key}}, bson.M{"id": bson.M{"$gt": sc.ID}}}},
			bson.M{s.Key: bson.M{s.AfterOp(): sc.Key}},
		},
	}
}

func (s *Sort) BeforeCondition(sc *searchCursor) bson.M {
	return bson.M{
		"$or": bson.A{
			bson.M{"$and": bson.A{bson.M{s.Key: bson.M{"$eq": sc.Key}}, bson.M{"id": bson.M{"$lt": sc.ID}}}},
			bson.M{s.Key: bson.M{s.BeforeOp(): sc.Key}},
		},
	}
}

func (s *Sort) AfterOp() string {
	switch s.Val {
	case 1:
		return "$gt"
	case -1:
		return "$lt"
	}
	panic("unreachable")
}

func (s *Sort) BeforeOp() string {
	switch s.Val {
	case 1:
		return "$lt"
	case -1:
		return "$gt"
	}
	panic("unreachable")
}
