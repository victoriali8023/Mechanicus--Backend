const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const dummyCustomers = [
	{
		firstName: "John",
		lastName: "Smith",
		phone: "123-456-7890",
		email: "example1@email.com",
		password: "password1",
		streetAddress1: "123 Sesame Street",
		streetAddress2: "Apt. 1",
		city: "Ann Arbor",
		state: "MI",
		zipcode: 48105,
	},
	{
		firstName: "Jane",
		lastName: "Doe",
		phone: "123-456-7890",
		email: "example2@email.com",
		password: "password2",
		streetAddress1: "123 Sesame Street",
		streetAddress2: "Apt. 2",
		city: "Ypsilanti",
		state: "MI",
		zipcode: 48197,
	},
	{
		firstName: "Ben",
		lastName: "James",
		phone: "123-456-7890",
		email: "example3@email.com",
		password: "password3",
		streetAddress1: "123 Sesame Street",
		streetAddress2: "Apt. 3",
		city: "Detroit",
		state: "MI",
		zipcode: 48201,
	},
];

const dummyVehicles = [
	{
		vin: "1234567890",
		type: "Sedan",
		year: 2000,
		make: "Ford",
		model: "Focus SE",
		imgUrl:
			"https://file.kelleybluebookimages.com/kbb/base/evox/CP/10858/2017-Ford-Focus-front_10858_032_2400x1800_YZ.png",
	},
	{
		vin: "0987654321",
		type: "SUV",
		year: 2010,
		make: "Chevrolet",
		model: "Trailblazer",
		imgUrl:
			"https://www.gannett-cdn.com/presto/2020/07/10/PDTF/76f14475-53f5-4abe-ae0f-a4f4911c8be3-IMG_2481.JPG",
	},
	{
		vin: "1122334455",
		type: "Truck",
		year: 2005,
		make: "Toyota",
		model: "Tundra",
		imgUrl:
			"https://www.toyota.com/imgix/responsive/images/mlp/colorizer/2021/tundra/8W2/1.png",
	},
];

async function main() {
	let customerVehicles = [];

	// Create a new character
	for (let customer of dummyCustomers) {
		const newCustomer = await prisma.customer.create({ data: customer });
		console.log(
			`Created new customer: ${newCustomer.name} (ID: ${
				newCustomer.customerID
			})`
		);
		customerVehicles.push({ customerID: newCustomer.customerID });
	}

	for (let i = 0; i < dummyVehicles.length; i++) {
		const newVehicle = await prisma.vehicle.create({ data: dummyVehicles[i] });
		console.log(
			`Created new vehicle: ${newVehicle.make + newVehicle.model} (ID: ${
				newVehicle.vehicleID
			})`
		);
		customerVehicles[i].vehicleID = newVehicle.vehicleID;
	}

	for (let dummyCustomerVehicle of customerVehicles) {
		const newCustomer = await prisma.customerVehicle.create({
			data: dummyCustomerVehicle,
		});
	}
}

main().catch((e) => console.error(e));
