const { Schema, model } = require('mongoose');

const noteSchema = new Schema(
  {
    title:   { type: String, required: true, trim: true },
    body:    { type: String, required: true },
    author:  { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = model('Note', noteSchema);