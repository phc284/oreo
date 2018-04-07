const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const oreoSchema = new mongoose.Schema({
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
  slug: String,
  // author: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: 'User',
  //   required: 'You must supply an author'
  // },
  tags: [String]
});

module.exports = mongoose.model('Oreo', oreoSchema);
