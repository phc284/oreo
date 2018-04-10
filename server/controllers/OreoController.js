const mongoose = require('mongoose');
const Oreo = mongoose.model('Oreo');

const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

exports.createOreo = async (req, res) => {
  console.log('POST /add', req.body);

  const { name, description, photo, ...bodyTags } = req.body;
  const tags = Object.keys(bodyTags);

  const newBody = {
    name,
    description,
    photo,
    tags
  };
  //create an array with the list of tags selected to add to model
  const oreo = await new Oreo(newBody).save();

  res.send(oreo);
};

exports.getOreos = async (req, res) => {
  console.log('GET /oreos');

  //get all the oreos from the database
  const oreos = await Oreo.find().sort({ created: 'desc' });
  res.send(oreos);
};

exports.editOreo = async (req, res) => {
  console.log('GET /oreos/:id');
  console.log(req.params);

  //get all the oreos from the database
  const oreo = await Oreo.findOne({ _id: req.params.id });
  console.log('OREO', oreo);
  res.send(oreo);
};
