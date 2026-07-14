FROM golang:1.24.2 AS build
ARG TAG=release
ARG REV
ARG VERSION

COPY go.mod go.sum /app/
WORKDIR /app
RUN go mod download

COPY cmd/ /app/cmd/
COPY pkg/ /app/pkg/
COPY internal/ /app/internal/

RUN CGO_ENABLED=0 go build -tags "${TAG}" "-ldflags=-X main.version=${VERSION} -s -w -buildid=" -trimpath ./cmd/reearth-marketplace

FROM debian:buster

COPY --from=build /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/ca-certificates.crt
COPY --from=build /app/reearth-marketplace /app/reearth-marketplace

WORKDIR /app

CMD [ "./reearth-marketplace" ]
