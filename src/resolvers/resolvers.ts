import ListsService from "../lists/lists-service";

const Query = {
  greeting: () => "hello world!",
  lists: async (root: any, { id }: any, context: any) => {
    const { app } = context.req;
    try {
      const lists = await ListsService.getLists(app.get("db"), id);
      if (lists.length < 1) {
        throw new Error("You have no lists.");
      }
      return lists;
    } catch (error) {
      throw new Error(error);
    }
  },
};

const Mutation = {
  createList: async (root: any, { input }: any, context: any) => {
    const { app } = context.req;
    try {
      const list = await ListsService.createList(app.get("db"), input);
      return list;
    } catch (error) {
      throw new Error(error);
    }
  },
};

export { Query, Mutation };
