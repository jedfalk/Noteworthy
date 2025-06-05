// server/utils/auth.js
const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const SECRET = process.env.JWT_SECRET;

// Generate a signed JWT given a user object
module.exports.signToken = ({ username, email, _id }) => {
  const payload = { username, email, _id };
  return jwt.sign(payload, SECRET, { expiresIn: '2h' });
};

// Middleware for verifying JWT on protected resolvers (not used yet but kept for future)
module.exports.authMiddleware = ({ req }) => {
  let token = req.headers.authorization || '';
  if (token.startsWith('Bearer ')) {
    token = token.split(' ').pop().trim();
  }
  if (!token) return req;
  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
  } catch (err) {
    console.warn('Invalid token');
  }
  return req;
};
