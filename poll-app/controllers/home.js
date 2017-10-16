const express = require('express');
const models = require('../models');

const router = express.Router();


router.get('/', (req, res) => {
  res.json({
    msg: "Successful GET to '/' route"
  });
});

<<<<<<< HEAD
router.post('/', (req, res) => {
  res.json({
    msg: "Successful POST to '/' route"
  });
});

router.put('/:id', (req, res) => {
  res.json({
    msg: "Successful PUT to '/' route",
    id: req.params.id
  });
});

router.delete('/:id', (req, res) => {
  res.json({
    msg: "Successful DELETE to '/' route",
    id: req.params.id
  });
});

=======
>>>>>>> f13f4451ce7014c2bcbee2c40be85b72e43619c4

module.exports = router;
