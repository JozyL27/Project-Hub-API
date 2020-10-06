const ListsService = {
  getLists(db: any, id: string) {
    return db("lists").select("*").where("author", id);
  },
  createList(db: any, newList: object) {
    return db("lists")
      .insert(newList)
      .returning("*")
      .then((rows: any) => {
        return rows[0];
      });
  },
};

export default ListsService;
