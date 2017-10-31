const express = require('express');
const router = express.Router();


router.use('/polls', require('./polls'));
router.use('/choices', require('./choices'));




module.exports = router;
