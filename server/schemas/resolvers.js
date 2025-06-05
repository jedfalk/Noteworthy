const User = require('../models/User');
const Note = require('../models/Note');
const { signToken } = require('../utils/auth');
const bcrypt = require('bcrypt');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
  Query: {
    notes: async (_, __, context) => {
      
      return Note.find().sort({ updatedAt: -1 });
    },
    note: async (_, { id }) => {
      return Note.findById(id);
    },
  },

  Mutation: {
    // SIGN UP: hash password, create user, return token + user
    signup: async (_, { username, email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ username, email, password: hashedPassword });
      const token = signToken(user);
      return { token, user };
    },

    // LOGIN: find user by email, verify password, return token + user
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('No user found with this email');
      }
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new AuthenticationError('Incorrect password');
      }
      const token = signToken(user);
      return { token, user };
    },
    addNote: async (_, { title, body }, context) => {
      // Optional: require login: if (!context.user) throw new Error('Not authenticated');
      const note = await Note.create({
        title,
        body,
        author: context.user ? context.user._id : null
      });
      return note;
    },

    updateNote: async (_, { id, title, body }) => {
      return Note.findByIdAndUpdate(
        id,
        { title, body, updatedAt: new Date() },
        { new: true }
      );
    },

    deleteNote: async (_, { id }) => {
      return Note.findByIdAndDelete(id);
    },
  },
};

module.exports = resolvers;