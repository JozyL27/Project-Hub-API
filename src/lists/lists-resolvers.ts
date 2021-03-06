import ListsService from "../lists/lists-service";
import ProjectsService from "../projects/projects-service";

const listQueries = {
  lists: async (root: any, { id, page }: any, context: any) => {
    const { app } = context.req;
    try {
      const lists = await ListsService.getLists(app.get("db"), id, page);
      if (!lists) {
        throw new Error("You have no lists.");
      }
      return lists;
    } catch (error) {
      throw new Error(error);
    }
  },
  list: async (root: any, { id }: any, context: any) => {
    const { app } = context.req;
    try {
      const list = await ListsService.getListById(app.get("db"), id);
      if (!list) {
        throw new Error("No list was found");
      }
      return list;
    } catch (error) {
      throw new Error(error);
    }
  },
};

const listMutations = {
  createList: async (root: any, { input }: any, context: any) => {
    const { app } = context.req;
    try {
      const { title, author } = input;
      for (const field of ["title", "author"]) {
        if (!input[field]) {
          throw new Error(`missing ${field} in request body.`);
        }
      }
      if (title.length < 4) {
        throw new Error("title must contain at least 4 characters.");
      }
      if (title.length > 20) {
        throw new Error("title cannot be longer than 20 characters.");
      }
      if (author.length < 1) {
        throw new Error("list must contain an author.");
      }
      const list = await ListsService.createList(app.get("db"), input);
      return list;
    } catch (error) {
      throw new Error(error);
    }
  },
  updateList: async (root: any, { input, id }: any, context: any) => {
    const { app } = context.req;
    try {
      const listExists = await ListsService.getListById(app.get("db"), id);
      if (!listExists) {
        throw new Error(`The list you're trying to update does not exist.`);
      }
      const list = await ListsService.updateList(app.get("db"), id, input);
      return list;
    } catch (error) {
      throw new Error(error);
    }
  },
  deleteList: async (root: any, { id }: any, context: any) => {
    const { app } = context.req;
    try {
      const listExists = await ListsService.getListById(app.get("db"), id);
      if (!listExists) {
        throw new Error(`The list you're trying to delete does not exist.`);
      }
      await ListsService.deleteList(app.get("db"), id);
      return "List was successfully deleted.";
    } catch (error) {
      throw new Error(error);
    }
  },
};

const List = {
  projects: async (root: any, list: any, context: any) => {
    const { app } = context.req;
    try {
      const projects = await ProjectsService.getProjectsByListId(
        app.get("db"),
        root.id
      );
      return projects;
    } catch (error) {
      throw new Error(error);
    }
  },
};

export { listMutations, List, listQueries };
