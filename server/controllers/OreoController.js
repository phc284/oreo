const mongoose = require('mongoose');
const uuid = require('uuid');
const axios = require('axios');

const cloudinary = require('cloudinary');

const Oreo = mongoose.model('Oreo');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  upload_preset: process.env.CLOUDINARY_PRESET
});

const formatBody = body => {
  let { name, description, ...bodyTags } = body;
  name = name.trim();
  description = description.trim();

  // console.log(photo);

  let tags = [];

  // if tag is removed from client, remove from list

  for (let key in bodyTags) {
    if (bodyTags[key] === true) {
      tags = [...tags, [key]];
    }
  }

  const newBody = {
    name,
    description,
    tags
  };
  return newBody;
};

exports.createOreo = async (req, res) => {
  console.log('POST /add');
  // console.log(req);
  // console.log('req.body', req.body);
  const photo = req.files[0];

  const newBody = formatBody(req.body);

  if (photo) {
    // console.log('fileName', photo);
    const url = `https://api.cloudinary.com/v1_1/${
      process.env.CLOUDINARY_NAME
    }/upload`;

    cloudinary.v2.uploader
      .upload_stream({ resource_type: 'raw' }, async function(error, result) {
        newBody.photo = result.secure_url;
        const oreo = await new Oreo(newBody).save();
        console.log(oreo);
        req.flash(
          'success',
          `Sucessfully Created ${oreo.name}. Care to leave a review?`
        );

        console.log(req.flash);

        res.redirect(`/`);
      })
      .end(photo.buffer);
  }

  // create an array with the list of tags selected to add to model

  // res.send(oreo);
};

exports.getOreos = async (req, res) => {
  console.log('GET /oreos');

  // get all the oreos from the database
  const oreos = await Oreo.find().sort({ created: 'desc' });
  res.send(oreos);
};

exports.getFilteredOreos = async (req, res) => {
  console.log('GET /oreos/:filter');
  const { filter } = req.params;

  // get filtered oreos from the database
  const oreos = await Oreo.find({ tags: filter }).sort({ created: 'desc' });

  res.send(oreos);
};

exports.getSearchedOreos = async (req, res) => {
  console.log('GET /oreos/:query');
  const { query } = req.params;

  // get filtered oreos from the database
  const oreos = await Oreo.find({ tags: query }).sort({ created: 'desc' });

  res.send(oreos);
};

exports.getOreo = async (req, res) => {
  console.log(`GET /oreo/${req.params.id}`);

  // get all the oreos from the database
  const oreo = await Oreo.findOne({ _id: req.params.id });
  res.send(oreo);
};

exports.editOreo = async (req, res) => {
  console.log('GET /add/:id');
  const oreo = await Oreo.findOne({ _id: req.params.id });
  res.send(oreo);
};

exports.updateOreo = async (req, res) => {
  console.log('PUT /add/:id');

  console.log(req.files);
  const photo = req.files[0];

  const newBody = formatBody(req.body);

  // const oreo = await Oreo.findOneAndUpdate({ _id: req.params.id }, newBody, {
  //   new: true, // return new store instead of the old one
  //   runValidators: true
  // }).exec();

  // if (photo) {
  //   // console.log('fileName', photo);
  //   const url = `https://api.cloudinary.com/v1_1/${
  //     process.env.CLOUDINARY_NAME
  //   }/upload`;

  //   cloudinary.v2.uploader
  //     .upload_stream({ resource_type: 'raw' }, async function(error, result) {
  //       newBody.photo = result.secure_url;
  //       const oreo = await new Oreo(newBody).save();
  //       console.log(oreo);
  //       req.flash(
  //         'success',
  //         `Sucessfully Created ${oreo.name}. Care to leave a review?`
  //       );

  //       console.log(req.flash);

  //       res.redirect(`/`);
  //     })
  //     .end(photo.buffer);

  // res.send(oreo);
};

exports.deleteOreo = async (req, res) => {
  console.log('DELETE /delete/:id');

  await Oreo.deleteOne({ _id: req.params.id });
  console.log('DELETED');

  res.send('success');
};
exports.getNames = async (req, res) => {
  console.log('GET /names');

  const names = await Oreo.find({}, { name: 1, _id: 1 });

  res.send(names);
};
