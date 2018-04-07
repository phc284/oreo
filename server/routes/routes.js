const express = require('express');
const router = express.Router();

const { catchErrors } = require('../handlers/error_handlers');
const oreoController = require('../controllers/oreoController');

router.post('/add', catchErrors(oreoController.createOreo));
router.get('/oreos', catchErrors(oreoController.getOreos));

module.exports = router;
