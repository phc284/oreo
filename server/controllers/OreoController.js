const mongoose = require('mongoose');
const Oreo = mongoose.model('Oreo');

const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

exports.createOreo = async (req, res) => {
  console.log('/add', req.body);

  const { name, description, photo, ...bodyTags } = req.body;
  const tags = Object.keys(bodyTags);

  //TODO
  //create new object with only name, description, and key
  let newBody = {
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
  console.log('/oreos');

  //get all the oreos from the database
  const oreos = await Oreo.find();
  res.send(oreos);
};
