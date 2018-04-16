const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.login = (req, res) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      res.status(401).send({ err });
    }
    req.session.user = user._id;
    res.send(req.session.user);
  })(req, res);
};

exports.logout = (req, res) => {
  delete req.session.user;
  req.logout();
  res.send({ status: 'success' });
};
