const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email:    { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
  password: { type: String, required: true },
  notes:    [{ type: Schema.Types.ObjectId, ref: 'Note' }],
});

module.exports = model('User', userSchema);