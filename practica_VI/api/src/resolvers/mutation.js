const { ApolloError } = require("apollo-server");
const { definitions } = require("../types");

const mutationResolvers = {
  Mutation: {
    addPerson: async (parent, args, ctx) => {
      const db = ctx.db;
      const { name, surname, email, phone } = args;
      const {insertedId} = await db.collection("persons").insertOne({ name, surname, email, phone });
      return { name, surname, email, phone, _id: insertedId};
    }
  }
}

module.exports = mutationResolvers;