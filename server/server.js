const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");

const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();

const startServer = async () => {
	// create ApolloServer
	const server = new ApolloServer({
		typeDefs,
		resolvers,
		context: authMiddleware,
	});

	// start apolloserver
	await server.start();
	// combine apolloserver with express as middleware
	server.applyMiddleware({ app });
	// log where to go to test gql api
	console.log(`Use GraphqQL at http://localhost:${PORT}${server.graphqlPath}`);
};

// start apollo server
startServer();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// server static assets
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

db.once("open", () => {
	app.listen(PORT, () => {
		console.log(`API server running on port ${PORT}!`);
	});
});
