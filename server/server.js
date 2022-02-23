const express = require("express");
const { ApolloServer } = require("apollo-server-express");

const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");
const { authMiddleware } = require("./utils/auth");

const PORT = process.env.PORT || 3001;
const app = express();

const startServer = async () => {
	// create new Apollo server and pass in schema data
	const server = new ApolloServer({
		typeDefs,
		resolvers,
		context: authMiddleware,
	});

	// start server
	await server.start();

	// integrate apollo serve with express middleware
	server.applyMiddleware({ app });

	// log where we can test gql api
	console.log(`Use graphQL at http://localhost:${PORT}${server.graphqlPath}`);
};

// initialize Apollo server
startServer();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

db.once("open", () => {
	app.listen(PORT, () => {
		console.log(`API server running on port ${PORT}!`);
	});
});
