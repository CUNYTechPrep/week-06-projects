const express = require('express');
const models = require('../models');

const router = express.Router();


router.get('/', (req, res) => {
  res.json({
    msg: "Successful GET to '/' route"
  });
});

router.delete('/', function (req, res) {
  res.send('Got a DELETE request at /user')
})
module.exports = router;
