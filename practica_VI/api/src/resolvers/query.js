const queryResolver = {
  Query: {
    test: () => {
      return "Working OK!";
    },
    getPersons: async (parent, args, ctx) => {
      const db = ctx.db;
      return db.collection("persons").find({}).toArray();
    }
  }
}

module.exports = queryResolver;