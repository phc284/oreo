const express = require('express');
const router = express.Router();

const oreoController = require('../controllers/oreoController');

const catchErrors = fn => {
  return function(req, res, next) {
    return fn(req, res, next).catch(next);
  };
};

router.post('/oreo', catchErrors(oreoController.createOreo));

module.exports = router;
