import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import fs from "fs";
import { ApolloServer, gql } from "apollo-server-express";
import config from "./config";
import knex from "knex";

const { DATABASE_URL } = config;
const db = knex({
  client: "pg",
  connection: DATABASE_URL,
});

const typeDefs = gql(
  fs.readFileSync("./src/schema/schema.graphql", { encoding: "utf-8" })
);
const resolvers = require("./resolvers/resolvers");
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res }),
});
apolloServer.applyMiddleware({ app, path: "/graphql" });

app.set("db", db);
app.listen(config.PORT, () => {
  console.log(`server listening at http://localhost:${config.PORT}/graphql`);
});
