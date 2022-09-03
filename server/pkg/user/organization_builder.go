package user

type OrganizationBuilder struct {
	o   *Organization
	err error
}

func NewOrganization() *OrganizationBuilder {
	return &OrganizationBuilder{
		o: &Organization{},
	}
}

func (b *OrganizationBuilder) NewID() *OrganizationBuilder {
	b.o.id = NewOrganizationID()
	return b
}

func (b *OrganizationBuilder) ID(id OrganizationID) *OrganizationBuilder {
	b.o.id = id
	return b
}

func (b *OrganizationBuilder) Name(name string) *OrganizationBuilder {
	b.o.name = name
	return b
}

func (b *OrganizationBuilder) DisplayName(displayName string) *OrganizationBuilder {
	b.o.displayName = displayName
	return b
}

func (b *OrganizationBuilder) Description(description string) *OrganizationBuilder {
	b.o.description = description
	return b

}

func (b *OrganizationBuilder) Active(active bool) *OrganizationBuilder {
	b.o.active = active
	return b
}

func (b *OrganizationBuilder) Build() *Organization {
	return b.o
}
