const express = require('express');
var multer = require('multer');

const router = express.Router();

const { catchErrors } = require('../handlers/error_handlers');
const oreoController = require('../controllers/OreoController');
const userController = require('../controllers/UserController');
const authController = require('../controllers/AuthController');

const storage = multer.memoryStorage();
const upload = multer({ storage });

//add user auth check later
router.get('/add/:id', catchErrors(oreoController.editOreo));
router.get('/oreo/:id', catchErrors(oreoController.getOreo));
router.get('/oreos', catchErrors(oreoController.getOreos));
router.get('/oreos/:filter', catchErrors(oreoController.getFilteredOreos));
router.get('/search/:query', catchErrors(oreoController.getSearchedOreos));
router.get('/names', catchErrors(oreoController.getNames));

router.post('/add', upload.any(), catchErrors(oreoController.createOreo));
router.post(
  '/signup',
  userController.validateSignup,
  catchErrors(userController.register)
);
router.put('/add/:id', upload.any(), catchErrors(oreoController.updateOreo));

router.delete('/delete/:id', catchErrors(oreoController.deleteOreo));

module.exports = router;
