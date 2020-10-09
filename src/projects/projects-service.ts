const ProjectsService = {
  createProject(db: Function, newProject: object) {
    return db("projects")
      .insert(newProject)
      .returning("*")
      .then((rows: Array<object>) => {
        return rows[0];
      });
  },
};

export default ProjectsService;
