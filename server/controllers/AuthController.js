const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.login = (req, res) => {
  passport.authenticate('local', async (err, user) => {
    console.log('authenticate', err);
    if (err) {
      console.log('err', err);
      res.status(401).send({ err });
    } else {
      req.session.user = user._id;
      const sendUser = await User.findOne({
        username: user.username,
        email: user.email
      });

      if (sendUser === null) {
        res.send({ error: true });
      } else {
        res.send(sendUser);
      }
    }
  })(req, res);
};

exports.logout = (req, res) => {
  delete req.session.user;
  req.logout();
  res.send({ status: 'success' });
};
