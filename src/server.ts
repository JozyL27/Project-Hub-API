import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import fs from "fs";
import { ApolloServer, gql } from "apollo-server-express";
import config from "./config";

const typeDefs = gql(
  fs.readFileSync("./src/schema/schema.graphql", { encoding: "utf-8" })
);
const resolvers = require("./resolvers/resolvers");
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});
apolloServer.applyMiddleware({ app, path: "/graphql" });

app.listen(config.PORT, () => {
  console.log(`server listening at http://localhost:${config.PORT}/graphql`);
});
