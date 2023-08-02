const express = require('express');
const router = express.Router();
const signUpController = require('../controllers/signUpController');

router.route('/')
    .get(signUpController.signUpPage)
    .post(signUpController.signUpNewUser);

module.exports = router;

