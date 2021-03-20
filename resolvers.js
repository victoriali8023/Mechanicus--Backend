exports.resolvers = {
	Query: {
		customers: (root, args, context, info) => {
			return context.prisma.customer.findMany();
		},

		customer: (root, args, context, info) => {
			return context.prisma.customer.findUnique({
				where: {
					id: args.id,
				},
				include: {
					vehicles: true,
				},
			});
		},
	},
	Mutation: {
		createCustomer: (root, args, context) => {
			return context.prisma.customer.create({
				data: {
					phone: args.phone,
					email: args.email,
					password: args.password,
				},
			});
		},
		updateCustomer: (root, args, context) => {
			return context.prisma.customer.update({
				where: {
					id: args.id,
				},
				data: {
					firstName:
						args.input.firstName != null ? args.input.firstName : undefined,
					lastName: args.input.lastName,
					phone: args.input.phone,
					email: args.input.email,
					password: args.input.password,
					streetAddress1: args.input.streetAddress1,
					streetAddress2: args.input.streetAddress2,
					city: args.input.city,
					state: args.input.state,
					zipcode: args.input.zipcode,

					vehicles: {
						create: [
							{
								vin: args.input.vehicles[0].vin,
								vehicleType: args.input.vehicles[0].vehicleType,
								year: args.input.vehicles[0].year,
								make: args.input.vehicles[0].make,
								model: args.input.vehicles[0].model,
								imgUrl: args.input.vehicles[0].imgUrl,
							},
						],
					},
				},
			});
		},
	},
};
