const mongoose = require('mongoose');
const Oreo = mongoose.model('Oreo');

const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

const formatBody = body => {
  const { name, description, photo, ...bodyTags } = body;
  const tags = Object.keys(bodyTags);

  const newBody = {
    name,
    description,
    photo,
    tags
  };
  return newBody;
};

exports.createOreo = async (req, res) => {
  console.log('POST /add', req.body);

  const newBody = formatBody(req.body);
  //create an array with the list of tags selected to add to model
  const oreo = await new Oreo(newBody).save();

  console.log(oreo);

  res.send(oreo);
};

exports.getOreos = async (req, res) => {
  console.log('GET /oreos');

  //get all the oreos from the database
  const oreos = await Oreo.find().sort({ created: 'desc' });
  res.send(oreos);
};

exports.editOreo = async (req, res) => {
  console.log('GET /add/:id');
  const oreo = await Oreo.findOne({ _id: req.params.id });
  res.send(oreo);
};

exports.updateOreo = async (req, res) => {
  console.log('PUT /add/:id');
  console.log(req.body);

  const newBody = formatBody(req.body);

  const oreo = await Oreo.findOneAndUpdate({ _id: req.params.id }, newBody, {
    new: true, //return new store instead of the old one
    runValidators: true
  }).exec();

  console.log(oreo);
  res.send(oreo);
};
