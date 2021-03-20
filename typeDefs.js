exports.typeDefs = `
type Query {
    customers: [Customer!]!
    customer(id:Int!): Customer!
}

type Customer {
    id: Int
    firstName: String
    lastName: String
    phone: String
    email: String
    password: String
    streetAddress1: String
    streetAddress2: String
    city: String
    state: String
    zipcode: Int
    vehicles: [Vehicle]
}

input VehicleInput {
    customerID: Int  
    vin: String
    vehicleType: String
    year: Int
    make: String
    model: String
    imgUrl: String
}

type Vehicle {
    id: Int
    customerID: Int  
    vin: String
    vehicleType: String
    year: Int
    make: String
    model: String
    imgUrl: String
}

input CustomerInput {
    firstName: String
    lastName: String
    phone: String
    email: String
    password: String
    streetAddress1: String
    streetAddress2: String
    city: String
    state: String
    zipcode: Int
    vehicles: [VehicleInput]
}


type Mutation {
    createCustomer(
        email: String!
        phone: String!
        password: String!
    ): Customer,
    updateCustomer(
        id: Int!,
        input: CustomerInput
    ): Customer
}`;
