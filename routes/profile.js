const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const authMiddleware = require('../middleware/authMiddleware');


router.route('/')
    .get(authMiddleware, profileController.profilePage)


module.exports = router;