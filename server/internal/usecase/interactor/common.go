package interactor

import (
	"github.com/reearth/reearth-marketplace/server/internal/usecase/gateway"
	"github.com/reearth/reearth-marketplace/server/internal/usecase/interfaces"
	"github.com/reearth/reearth-marketplace/server/internal/usecase/repo"
)

func NewContainer(r *repo.Container, g *gateway.Container) interfaces.Container {
	return interfaces.Container{
		Plugin:       NewPlugin(r, g),
		Organization: NewOrganization(r),
		User:         NewUser(r),
	}
}
