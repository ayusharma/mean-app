const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    index: true,
    match: /.+\@.+\..+/
  },
  username: {
    type: String,
    trim: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    validate: [function (password) {
      return password.length >= 5;
    }, 'Password should be longer']
  },
  created: {
    type: Date,
    default: Date.now
  },
  website: {
    type: String,
    set: function (url) {
      return ['http://',url].join('');
    }
  }
});

mongoose.model('User', UserSchema);
