const express = require('express');
const router = express.Router();


router.use('/login', require('./login'));
//router.use('/profile', require('./profile'));


module.exports = router;