const express = require('express');
const router = express.Router();
const userController = require('../controller/userController.js');

router.get('/',userController.home)

module.exports = router;