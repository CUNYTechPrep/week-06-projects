const express = require('express');
const router = express.Router();


<<<<<<< HEAD
router.use('/alt', require('./alt'));
router.use('/', require('./home'));


=======
router.use('/polls', require('./polls'));
router.use('/', require('./home'));




>>>>>>> f13f4451ce7014c2bcbee2c40be85b72e43619c4
module.exports = router;
