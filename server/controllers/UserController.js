const mongoose = require('mongoose');
const passport = require('passport');
var User = require('../models/User');

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
    res.send(errors);
    return;
  }
  next();
};

exports.register = (req, res, next) => {
  let { username, email, password } = req.body;
  //register user
  User.register(new User({ username, email }), password, (err, user) => {
    if (err) {
      res.send({ Error: err.message });
    }
    console.log('next');
    next();
  });
};
