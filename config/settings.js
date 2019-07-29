var UserRoles = {
    "Admin": 0, // All access
    "Manager": 1, // Cannot modify users
    "User": 2 // cannot modify users, units, companies, rental agreements
}

var SchemaPlainTextName =
{
    User: 'User',
    Company: 'Company',
    Tenant: 'Tenant',
    Unit: 'Unit',
    Counter: 'Counter',
    RentalAgreement: 'RentalAgreement',
    Invoice: 'Invoice',
    MaintenanceItem: 'MaintenanceItem',
}

var InvoiceTypes =
{
    Rent: 'Rent',
    Diesel: 'Diesel',
    Electricity: 'Electricity',
    Maintenance: 'Maintenance',    
}

var bcryptPasswordSecret = 10

module.exports = {
    UserRoles: UserRoles,
    SchemaPlainTextName: SchemaPlainTextName,
    InvoiceTypes: InvoiceTypes,
    bcryptPasswordSecret: bcryptPasswordSecret
}
