const { gql } = require('apollo-server-express');

const typeDefs = gql`
  # ——————————————
  # Define User so Note.author: User is valid
  type User {
    _id: ID!
    username: String!
    email: String!
    notes: [Note]
  }

  type Note {
    _id: ID!
    title: String!
    body: String!
    author: User       # now GraphQL knows what User is
    createdAt: String
    updatedAt: String
  }

  # Payload returned after signup or login
    type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    notes: [Note]
    note(id: ID!): Note
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    addNote(title: String!, body: String!): Note
    updateNote(id: ID!, title: String, body: String): Note
    deleteNote(id: ID!): Note
  }
`;

module.exports = typeDefs;