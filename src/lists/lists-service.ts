const ListsService = {
  getLists(db: any, id: string) {
    return db("lists")
      .select("*")
      .where("author", id)
      .orderBy("date_created", "desc");
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
};

export default ListsService;
