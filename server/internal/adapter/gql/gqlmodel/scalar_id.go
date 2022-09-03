package gqlmodel

import (
	"errors"
	"io"
	"strconv"

	"github.com/99designs/gqlgen/graphql"
	"github.com/reearth/reearth-marketplace/server/pkg/id"
	"github.com/reearth/reearthx/idx"
)

type ID string

func MarshalPluginID(t id.PluginID) graphql.Marshaler {
	return graphql.WriterFunc(func(w io.Writer) {
		_, _ = io.WriteString(w, strconv.Quote(t.String()))
	})
}

func UnmarshalPluginID(v interface{}) (id.PluginID, error) {
	if tmpStr, ok := v.(string); ok {
		return id.PluginIDFrom(tmpStr)
	}
	return id.PluginID{}, errors.New("invalid ID")
}

func IDFrom[T idx.Type](i idx.ID[T]) ID {
	return ID(i.String())
}

func IDFromRef[T idx.Type](i *idx.ID[T]) *ID {
	return (*ID)(i.StringRef())
}

func IDFromStringRef[T idx.Type](i *idx.StringID[T]) *ID {
	return (*ID)(i)
}

func IDFromPluginID(i id.PluginID) ID {
	return ID(i.String())
}

func IDFromPluginIDRef(i *id.PluginID) *ID {
	return (*ID)(i.StringRef())
}

func ToID[A idx.Type](a ID) (idx.ID[A], error) {
	return idx.From[A](string(a))
}

func ToID2[A, B idx.Type](a, b ID) (ai idx.ID[A], bi idx.ID[B], err error) {
	ai, err = ToID[A](a)
	if err != nil {
		return
	}
	bi, err = ToID[B](b)
	return
}

func ToID3[A, B, C idx.Type](a, b, c ID) (ai idx.ID[A], bi idx.ID[B], ci idx.ID[C], err error) {
	ai, bi, err = ToID2[A, B](a, b)
	if err != nil {
		return
	}
	ci, err = ToID[C](c)
	return
}

func ToIDRef[A idx.Type](a *ID) *idx.ID[A] {
	return idx.FromRef[A]((*string)(a))
}

func ToStringIDRef[T idx.Type](a *ID) *idx.StringID[T] {
	return idx.StringIDFromRef[T]((*string)(a))
}

func ToPluginID(a ID) (id.PluginID, error) {
	return id.PluginIDFrom((string)(a))
}

func ToPluginID2(a, b ID) (ai id.PluginID, bi id.PluginID, err error) {
	ai, err = id.PluginIDFrom((string)(a))
	if err != nil {
		return
	}
	bi, err = ToPluginID(b)
	return ai, bi, err
}

func ToPluginIDRef(a *ID) *id.PluginID {
	return id.PluginIDFromRef((*string)(a))
}
