package user

import (
	"io"
	"testing"
)

func TestRandomName(t *testing.T) {
	type args struct {
		randReader io.Reader
		n          int
	}
	tests := []struct {
		args    args
		wantLen int
		wantErr bool
	}{
		{
			args: args{
				randReader: nullReader{},
				n:          8,
			},
			wantLen: 8,
		},
		{
			args: args{
				randReader: nullReader{},
				n:          16,
			},
			wantLen: 16,
		},
	}
	for _, tt := range tests {
		t.Run("", func(t *testing.T) {
			got, err := RandomName(tt.args.randReader, tt.args.n)
			if (err != nil) != tt.wantErr {
				t.Errorf("RandomName() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if len(got) != tt.wantLen {
				t.Errorf("RandomName() got = %v, want %v", len(got), tt.wantLen)
			}
			if !IsSafeName(got) {
				t.Errorf("RandomName() return values must be safe: %s", got)
			}
		})
	}
}

type nullReader struct{}

func (r nullReader) Read(p []byte) (n int, err error) {
	for i := range p {
		p[i] = 0
	}
	return len(p), nil
}

func TestIsSafeName(t *testing.T) {
	type args struct {
		name string
	}
	tests := []struct {
		args args
		want bool
	}{
		{args: args{name: "Foobar123"}, want: true},
		{args: args{name: "buz.foobar0"}, want: true},
		{args: args{name: "foo_bar_9"}, want: true},
		{args: args{name: "~A-Z"}, want: true},
		{args: args{name: "foo@bar"}, want: false},
		{args: args{name: " foobar "}, want: false},
		{args: args{name: "ftp://"}, want: false},
		{args: args{name: "a+b"}, want: false},
		{args: args{name: "c*d"}, want: false},
		{args: args{name: "e&f"}, want: false},
		{args: args{name: "g%h"}, want: false},
		{args: args{name: "i|j"}, want: false},
		{args: args{name: "foobar[]"}, want: false},
		{args: args{name: "${foobar}"}, want: false},
		{args: args{name: "?foo=bar&buz=foobar"}, want: false},
		{args: args{name: "#foobar"}, want: false},
		{args: args{name: "(foobar)"}, want: false},
		{args: args{name: "!foo"}, want: false},
		{args: args{name: "foo;"}, want: false},
		{args: args{name: "^foo$"}, want: false},
		{args: args{name: `"double quoted"`}, want: false},
		{args: args{name: `'quoted'`}, want: false},
	}
	for _, tt := range tests {
		t.Run("", func(t *testing.T) {
			if got := IsSafeName(tt.args.name); got != tt.want {
				t.Errorf("IsSafeName() = %v, want %v", got, tt.want)
			}
		})
	}
}
