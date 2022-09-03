package user

type Organization struct {
	id          OrganizationID
	name        string
	displayName string
	description string
	active      bool
}

func (o Organization) ID() OrganizationID {
	return o.id
}

func (o Organization) Name() string {
	return o.name
}

func (o Organization) DisplayName() string {
	return o.displayName
}

func (o Organization) Description() string {
	return o.description
}

func (o Organization) Active() bool {
	return o.active
}
