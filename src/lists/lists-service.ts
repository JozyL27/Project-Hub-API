const ListsService = {
  getLists(db: any, userId: string) {
    return db("lists").select("*").where("author", userId);
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
