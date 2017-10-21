const express = require('express');
const router = express.Router();


// if going to alt, using alt controller
// if want other routes, add them to this list.
router.use('/alt', require('./alt'));
router.use('/', require('./home'));


module.exports = router;
