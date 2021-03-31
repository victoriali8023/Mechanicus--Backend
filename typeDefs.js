exports.typeDefs = `
type Query {
    customers: [Customer!]!
    customer(id:Int!): Customer!
    vehicle(customerID:Int!): [Vehicle!]!
    quote(customerID:Int!): [Quote!]! 
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

type Service {
    id: Int
    price: Float
    type: String
    quotes: [QuoteService]
}

input ServiceInput {
    customerID: Int
    price: Float
    type: String
    quotes: [QuoteServiceInput]
}

type Quote {
    customerID: Int
    scheduleDate: String
    status: String
    mechanicianID: Int
    mechanician: Mechanician
    vehicleID: Int
    vehicle: Vehicle
    services: [QuoteService]
}

input QuoteInput {
    scheduleDate: String
    status: String
    services: [QuoteServiceInput]
    mechanicianID: Int
    vehicleID: Int
    customerID: Int
}

type QuoteService {
    id: Int
    serviceID: Int
    quoteID: Int
    service: Service
}

input QuoteServiceInput {
    customerID: Int
    serviceID: Int
    quoteID: Int
}

type Mechanician {
    id:Int
    firstName: String
    lastName: String
    phone: String
    quotes: [Quote]
}

input MechanicianInput {
    customerID: Int
    firstName: String
    lastName: String
    phone: String
    quotes: [QuoteInput]
}


type Mutation {
    createCustomer(
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
    ): Customer,
    updateCustomer(
        id: Int!,
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
    ): Customer
}`;