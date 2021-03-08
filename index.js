const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 5000;
const { graphqlHTTP } = require("express-graphql");
const { makeExecutableSchema } = require("graphql-tools");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

const typeDefs = `
type Query {
  characters: [Character!]!
}

type Character {
  name: String!,
  species: String!,
  affiliation: affiliation!
  weapon: String!
}

enum affiliation {
  REBEL_ALLIANCE,
  EMPIRE
}

type Mutation {
  post(name: String!, species: String!, affiliation: affiliation!, weapon: String!): Character!
}`;

const resolvers = {
	Query: {
		characters: (root, args, context, info) => {
			return context.prisma.character.findMany();
		},
	},
	Mutation: {
		post: (root, args, context) => {
			return context.prisma.character.create({
				data: {
					name: args.name,
					species: args.species,
					affiliation: args.affiliation,
					weapon: args.weapon,
				},
			});
		},
	},
};

var schema = makeExecutableSchema({ typeDefs, resolvers });

app
	.use(express.static(path.join(__dirname, "public")))
	.use(
		"/graphql",
		graphqlHTTP({
			schema: schema,
			graphiql: true,
			context: {
				prisma,
			},
		})
	)
	.listen(PORT, () => console.log(`Listening on ${PORT}`));
