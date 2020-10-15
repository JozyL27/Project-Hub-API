const ProjectsService = {
  createProject(db: Function, newProject: object) {
    return db("projects")
      .insert(newProject)
      .returning("*")
      .then((rows: Array<object>) => {
        return rows[0];
      });
  },
  getProjectsByListId(db: Function, listId: string, page = 1) {
    const projectsPerPage = 9;
    const offset = projectsPerPage * (page - 1);

    return db("projects")
      .select("*")
      .where("list_id", listId)
      .orderBy("date_created", "desc")
      .limit(projectsPerPage)
      .offset(offset);
  },
  getProjectById(db: Function, projectId: string) {
    return db("projects").select("*").where("id", projectId).first();
  },
  updateProject(db: Function, id: string, newProjectFields: object) {
    return db("projects")
      .where({ id })
      .update(newProjectFields)
      .returning("*")
      .then((rows: any) => {
        return rows[0];
      });
  },
  deleteProject(db: Function, id: string) {
    return db("projects").where({ id }).delete();
  },
};

export default ProjectsService;
