const express = require('express');
const router = express.Router();

const { catchErrors } = require('../handlers/error_handlers');
const oreoController = require('../controllers/oreoController');

router.post('/oreo', catchErrors(oreoController.createOreo));

module.exports = router;
