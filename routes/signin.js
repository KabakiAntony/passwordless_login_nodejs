const express = require('express');
const router = express.Router();
const signInController = require('../controllers/signInController');


router.route('/')
    .get(signInController.signInPage)
    .post(signInController.signInUser)

module.exports = router;
