const mongoose = require("mongoose");
const Oreo = mongoose.model("Oreo");

const createDOMPurify = require("dompurify");
const { JSDOM } = require("jsdom");

const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

const formatBody = body => {
  const { name, description, photo, ...bodyTags } = body;
  let tags = [];
  //if tag is removed from client, remove from list
  for (let key in bodyTags) {
    if (bodyTags[key] === true) {
      tags = [...tags, [key]];
    }
  }

  const newBody = {
    name,
    description,
    photo,
    tags
  };
  return newBody;
};

exports.createOreo = async (req, res) => {
  console.log("POST /add", req.body);

  const newBody = formatBody(req.body);
  //create an array with the list of tags selected to add to model
  const oreo = await new Oreo(newBody).save();

  res.send(oreo);
};

exports.getOreos = async (req, res) => {
  console.log("GET /oreos");

  //get all the oreos from the database
  const oreos = await Oreo.find().sort({ created: "desc" });
  res.send(oreos);
};

exports.getFilteredOreos = async (req, res) => {
  console.log("GET /oreos/:filter");
  const filter = req.params.filter;

  //get filtered oreos from the database
  const oreos = await Oreo.find({ tags: filter }).sort({ created: "desc" });

  res.send(oreos);
};

exports.getSearchedOreos = async (req, res) => {
  console.log("GET /oreos/:filter");
  const filter = req.params.filter;

  //get filtered oreos from the database
  const oreos = await Oreo.find({ tags: filter }).sort({ created: "desc" });

  res.send(oreos);
};

exports.getOreo = async (req, res) => {
  console.log(`GET /oreo/${req.params.id}`);

  //get all the oreos from the database
  const oreo = await Oreo.findOne({ _id: req.params.id });
  res.send(oreo);
};

exports.editOreo = async (req, res) => {
  console.log("GET /add/:id");
  const oreo = await Oreo.findOne({ _id: req.params.id });
  res.send(oreo);
};

exports.updateOreo = async (req, res) => {
  console.log("PUT /add/:id");

  const newBody = formatBody(req.body);

  const oreo = await Oreo.findOneAndUpdate({ _id: req.params.id }, newBody, {
    new: true, //return new store instead of the old one
    runValidators: true
  }).exec();

  res.send(oreo);
};

exports.deleteOreo = async (req, res) => {
  console.log("DELETE /delete/:id");

  const newBody = formatBody(req.body);

  await Oreo.deleteOne({ _id: req.params.id });
  console.log("DELETED");

  res.send("success");
};
exports.getNames = async (req, res) => {
  console.log("GET /names");

  const names = await Oreo.find({}, { name: 1, _id: 1 });
  console.log(names);

  res.send(names);
};
