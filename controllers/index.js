const express = require('express');
const router = express.Router();


router.use('/polls', require('./polls'));
router.use('/users', require('./users'));
router.use('/', require('./home'));


module.exports = router;
