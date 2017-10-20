const express = require('express');
const router = express.Router();


router.use('/polls', require('./polls'));
router.use('/', require('./home'));

router.get('/test', (req, res) => {
  res.send("HELLO WORLD!");
}); 


module.exports = router;
