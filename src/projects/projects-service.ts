const ProjectsService = {
  createProject(db: Function, newProject: object) {
    return db("projects")
      .insert(newProject)
      .returning("*")
      .then((rows: Array<object>) => {
        return rows[0];
      });
  },
  getProjectsByListId(db: Function, listId: string) {
    return db("projects")
      .select("*")
      .where("list_id", listId)
      .orderBy("date_created", "desc");
  },
};

export default ProjectsService;
