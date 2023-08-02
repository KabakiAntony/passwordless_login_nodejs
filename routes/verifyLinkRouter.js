const express = require('express');
const router = express.Router();
const verifyController = require('../controllers/verifyLinkController');
const verifyLinkMiddleware = require('../middleware/verifyLinkMiddleware');

router.route('/').get(verifyLinkMiddleware, verifyController);

module.exports = router;
