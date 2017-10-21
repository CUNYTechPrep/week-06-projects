const express = require('express');
const models = require('../models');

const router = express.Router();

// This route retrieves a list of all poll questions
router.get('/', (req, res) => {
  models.Choices.findAll()
    .then((allChoices) => {
      res.json(allChoices);
    })
});

module.exports = router;
