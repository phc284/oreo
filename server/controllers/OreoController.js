const mongoose = require('mongoose');
const Oreo = mongoose.model('Oreo');

const validator = require('validator');

exports.createOreo = async (req, res, next) => {
  console.log('create oreo', req.body);
  const oreo = await new Oreo(req.body).save();
  next();
};
