const express = require('express');
const router = express.Router();

router.use('/', require('./home'));
router.use('/alt', require('./alt'));
router.use('/polls', require('./polls'));


module.exports = router;
