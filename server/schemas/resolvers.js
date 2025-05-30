const Note = require('../models/note');
// const User = require('./models/user'); // will use for auth later

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