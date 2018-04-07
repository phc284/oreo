const mongoose = require('mongoose');
const Oreo = mongoose.model('Oreo');

const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

exports.createOreo = async (req, res) => {
  console.log('create oreo', req.body);

  //create new object with only name, description, and key

  const oreo = await new Oreo(req.body).save();

  res.send(oreo);
};

exports.getOreos = async (req, res) => {
  console.log('get all oreos');

  //get all the oreos from the database
  const oreos = await Oreo.find();
  res.send(oreos);
};
