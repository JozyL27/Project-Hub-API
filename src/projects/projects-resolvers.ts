import ProjectsService from "../projects/projects-service";
import ListsService from "../lists/lists-service";

interface context {
  req: { app: { get: Function } };
  res: object;
}

const projectQueries = {
  projects: async (root: any, { id, page }: any, context: any) => {
    const { app } = context.req;
    try {
      const projects = await ProjectsService.getProjectsByListId(
        app.get("db"),
        id,
        page
      );
      if (projects.length < 1 && page > 1) {
        throw new Error("No more lists available.");
      }
      if (projects.length < 1) {
        throw new Error(`You have no projects in this list.`);
      }
      return projects;
    } catch (error) {
      throw new Error(error);
    }
  },
  project: async (root: object, { id }: any, context: any) => {
    const { app } = context.req;
    try {
      const project = ProjectsService.getProjectById(app.get("db"), id);
      return project;
    } catch (error) {
      throw new Error(error);
    }
  },
};

const projectsMutations = {
  createProject: async (root: any, { input }: any, context: any) => {
    const { app } = context.req;
    try {
      const { title, list_id } = input;
      for (const field of ["title", "list_id"]) {
        if (!input[field]) {
          throw new Error(`missing ${field} in request body.`);
        }
        if (title.length < 4) {
          throw new Error("title must contain at least 4 characters.");
        }
        if (title.length > 20) {
          throw new Error("title cannot be longer than 20 characters.");
        }
        const list = await ListsService.getListById(app.get("db"), list_id);
        if (list.length < 1) {
          throw new Error("No list was found");
        }
        const project = await ProjectsService.createProject(
          app.get("db"),
          input
        );
        return project;
      }
    } catch (error) {
      throw new Error(error);
    }
  },
  updateProject: async (root: any, { input, id }: any, context: context) => {
    const { app } = context.req;
    try {
      const projectExists = await ProjectsService.getProjectById(
        app.get("db"),
        id
      );
      if (!projectExists) {
        throw new Error("The project you are tyring to update does not exist.");
      }
      const updatedProject = await ProjectsService.updateProject(
        app.get("db"),
        id,
        input
      );
      return updatedProject;
    } catch (error) {
      throw new Error(error);
    }
  },
  deleteProject: async (root: any, { id }: any, context: context) => {
    const { app } = context.req;
    try {
      const projectExists = await ProjectsService.getProjectById(
        app.get("db"),
        id
      );
      if (!projectExists) {
        throw new Error("The project you are tyring to update does not exist.");
      }
      await ProjectsService.deleteProject(app.get("db"), id);
      return "Project was successfully deleted.";
    } catch (error) {
      throw new Error(error);
    }
  },
};

export { projectsMutations, projectQueries };
