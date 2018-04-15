const mongoose = require('mongoose');
const User = mongoose.model('User');
const { promisify } = require('es6-promisify');

exports.validateSignup = (req, res, next) => {
  req.sanitizeBody('username');
  req.checkBody('username', 'You must supply a username').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.sanitizeBody('email').normalizeEmail({
    remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false
  });

  req.checkBody('password', 'Password cannot be blank!').notEmpty();
  req
    .checkBody('confirm-password', 'Confirmed password cannot be blank!')
    .notEmpty();
  req
    .checkBody('confirm-password', 'Passwords do not match')
    .equals(req.body.password);

  const errors = req.validationErrors();
  console.log('errors', errors);

  if (errors) {
    res.status(400).send(errors);
  }
  next();
};

exports.register = async (req, res, next) => {
  const user = new User({ email: req.body.email, username: req.body.username });
};
