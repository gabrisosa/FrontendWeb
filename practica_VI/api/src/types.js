const { gql } = require("apollo-server");

const typeDefs = gql`
  type Person{
    _id: ID!
    name: String
    surname: String
    email: String
    phone: String
  }

  type Query{
    test: String
    getPersons: [Person!]!
  }

  type Mutation{
    addPerson(name: String, surname: String, email: String, phone: String): Person!
  }
`;

module.exports = typeDefs;