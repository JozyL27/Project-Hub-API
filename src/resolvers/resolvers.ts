import app from "../app";
import ListsService from "../lists/lists-service";

const Query = {
  greeting: () => "hello world!",
  lists: async (root: any, { id }: any) => {
    const lists = await ListsService.getLists(app.get("db"), id);
    return lists;
  },
};

const Mutation = {
  createList: async (root: any, { input }: any) => {
    const list = await ListsService.createList(app.get("db"), input);
    return list;
  },
};

export { Query, Mutation };
