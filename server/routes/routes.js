const express = require('express');
const router = express.Router();

const { catchErrors } = require('../handlers/error_handlers');
const oreoController = require('../controllers/OreoController');

router.post('/add', catchErrors(oreoController.createOreo));
//add user auth check later
router.get('/add/:id', catchErrors(oreoController.editOreo));
router.get('/oreos', catchErrors(oreoController.getOreos));

router.put('/add/:id', catchErrors(oreoController.updateOreo));
router.delete('/delete/:id', catchErrors(oreoController.deleteOreo));

module.exports = router;
