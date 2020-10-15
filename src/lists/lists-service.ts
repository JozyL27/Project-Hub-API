const ListsService = {
  getLists(db: any, id: string, page = 1) {
    const listsPerPage = 9;
    const offset = listsPerPage * (page - 1);

    return db("lists")
      .select("*")
      .where("author", id)
      .orderBy("date_created", "desc")
      .limit(listsPerPage)
      .offset(offset);
  },
  createList(db: any, newList: object) {
    return db("lists")
      .insert(newList)
      .returning("*")
      .then((rows: any) => {
        return rows[0];
      });
  },
  getListById(db: any, id: string) {
    return db("lists").select("*").where("id", id).first();
  },
  updateList(db: any, id: string, newListFields: object) {
    return db("lists")
      .where({ id })
      .update(newListFields)
      .returning("*")
      .then((rows: any) => {
        return rows[0];
      });
  },
  deleteList(db: Function, id: string) {
    return db("lists").where({ id }).delete();
  },
};

export default ListsService;
