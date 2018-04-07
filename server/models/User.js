const mongoose = require('mongoose');
const validator = require('validator');

mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid Email Address'],
    required: 'Please supply an email address'
  },
  name: {
    type: String,
    required: 'Please supply a name',
    trim: true
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  favorites: [{ type: mongoose.Schema.ObjectId, ref: 'Cookie' }]
});

module.exports = mongoose.model('User', userSchema);
