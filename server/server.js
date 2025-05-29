require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const typeDefs = require('./schemas/typeDefs');
const resolvers = require('./resolvers');

// Read environment variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;

const app = express();
app.use(cors());

// Middleware to get user from JWT token in Authorization header
const getUser = (req) => {
  const token = req.headers.authorization || '';
  if (token) {
    try {
      return jwt.verify(token.replace('Bearer ', ''), JWT_SECRET);
    } catch (e) {
      console.warn('Invalid token');
      return null;
    }
  }
  return null;
};

// Create Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const user = getUser(req);
    return { user };
  },
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer();
