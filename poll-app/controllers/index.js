const express = require('express');
const router = express.Router();


router.use('/polls', require('./polls'));
router.use('/', require('./home'));
router.use('/choices', require('./choices'));




module.exports = router;
