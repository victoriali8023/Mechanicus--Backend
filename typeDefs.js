exports.typeDefs = `
type Query {
    customers: [Customer!]!
    customer(id:Int, email:String, password:String): Customer
    appointments(customerID:Int!): [Appointment!]!
}

type Subscription {
    newCustomer: Customer
    newAppointment(customerID:Int!): Appointment
}

type Quote {
    id: Int 
    transaction: Transaction
    customerID: Int
    mechanicID: Int
    vehicleID: Int
    dateTime: String
    costEstimate: Float
    description: String
}

type Transaction {
        id: Int 
        quoteID: Int
        service: String
        cost: Float
        dateTime: String
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
    quotes: [Quote]
    appointments: [Appointment]
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

type Appointment {
    id: Int
    customerID: Int
    dateTime: String
    vehicle: Vehicle
}

type Mutation {
    createCustomer(
        firstName: String
        lastName: String
        phone: String!
        email: String!
        password: String!
        streetAddress1: String
        streetAddress2: String
        city: String
        state: String
        zipcode: Int
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
    ): Customer,
    createAppointment(
        customerID: Int!
        vehicleID: Int!
        dateTime: String
    ): Appointment
}`;
