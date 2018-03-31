const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const reviewSchema = new mongoose.Schema({
  created: {
    type: Date,
    default: Date.now()
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'You must supply an author!'
  },
  cookie: {
    type: mongoose.Schema.ObjectId,
    ref: 'Cookie',
    required: 'You must supply a cookie!'
  },
  text: {
    type: String,
    required: 'Your review must have text'
  },
  ratings: {
    type: [Number],
    min: 1,
    max: 10
  }
});

module.exports = mongoose.model('Review', reviewSchema);
