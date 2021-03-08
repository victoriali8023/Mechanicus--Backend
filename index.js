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
  messages: [Message!]!
}

type Message {
  id: Int!,
  content: String!
}


type Mutation {
  post(content:String!): Message!
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
