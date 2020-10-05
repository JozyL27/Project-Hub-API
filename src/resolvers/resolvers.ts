// import app from "../app";
import knex from "knex";
import config from "../config";
const { DATABASE_URL } = config;
const db = knex({
  client: "pg",
  connection: DATABASE_URL,
});

const Query = {
  greeting: () => "hello world!",
};

const Mutation = {
  createList: (root: any, { input }: any) => {
    console.log(input);
    return db("lists")
      .insert(input)
      .returning("*")
      .then((rows: any) => {
        return rows[0];
      });
  },
};

export { Query, Mutation };
