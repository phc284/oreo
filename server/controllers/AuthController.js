const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.login = (req, res) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      res.status(401).send({ err });
    }
    console.log('BLAH', user);
    req.session.user = user._id;
    console.log(req.session);
    res.send(user);
  })(req, res);
};

exports.logout = (req, res) => {
  req.logout();
  res.send({ status: 'success' });
};
