const mongoose = require('mongoose');
const Oreo = mongoose.model('Oreo');

const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

exports.createOreo = async (req, res) => {
  console.log('create oreo', req.body);
  //santize inputs before putting in db
  for (const key in req.body) {
    let clean = DOMPurify.sanitize(req.body.key);
    console.log('clean', clean);
    req.body[key] = clean;
  }
  const oreo = await new Oreo(req.body).save();

  res.send(oreo);
};
