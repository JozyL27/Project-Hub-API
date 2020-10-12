import ListsService from "../lists/lists-service";
import ProjectsService from "../projects/projects-service";

const listQueries = {
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
  list: async (root: any, { id }: any, context: any) => {
    const { app } = context.req;
    try {
      const list = await ListsService.getListById(app.get("db"), id);
      if (list.length < 1) {
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
