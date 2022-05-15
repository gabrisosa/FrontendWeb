const { ApolloServer, gql } = require("apollo-server");
const { MongoClient } = require("mongodb")

const typeDefs = require("./types");
const queryResolvers = require("./resolvers/query")
const mutationResolvers = require("./resolvers/mutation")

const resolvers = {
  Query: queryResolvers.Query,
  Mutation: mutationResolvers.Mutation,
};

const mongourl = process.env.MONGO_URL;
if (!mongourl) {
  console.error("MONGO_URL env variable not defines");
} else {
  const client = new MongoClient(mongourl);
  try {
    client.connect().then(() => {
      console.log("Mongo DB connected");

      const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: () => { return {db: client.db("test") }} // devuelvo un objeto que es la base de datos
      });
      
      server.listen().then(({ url }) => {
        console.log(`Servidor Apollo escuchando en ${url}`)
      })
    })
  } catch (e) {
    console.log(e);
  } 
}