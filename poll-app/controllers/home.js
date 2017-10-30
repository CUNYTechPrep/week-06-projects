const express = require('express');
const models = require('../models');

const router = express.Router();


router.get('/', (req, res) => {
  res.json({
    msg: "Successful GET to '/' route"
  });
});

router.get('/models', (req, res) => {
  res.json({
    msg: "Successful GET to '/models' route"
  });
});


router.post('/', (req, res) => {
  res.json({
    msg: "Successful POST to '/' route"
  });
});



module.exports = router;
