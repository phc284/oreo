const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const cookieSchema = new mongoose.Schema({
  created: {
    type: Date,
    default: Date.now()
  },
  name: {
    type: String,
    trim: true,
    required: 'Please enter a cookie name'
  },
  description: {
    type: String,
    trim: true
  },
  photo: String,
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'You must supply an author'
  }
});

module.exports = mongoose.model('Cookie', reviewSchema);
