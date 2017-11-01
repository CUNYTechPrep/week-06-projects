const express = require('express');
const models = require('../models');

const router = express.Router();


router.get('/', (req, res) => {
  models.Choices.findAll()
    .then((allChoices) => {
      res.json(allChoices);
    })
});

router.post('/', (req, res  ) => {
  models.Choices.create({
    description: req.body.description
  })
  .then((choice) => {
    return choice.setPoll(req.body.pollId);
  })
  .then(choice => {
    res.json(choice);
  })
  .catch(console.error)
});



module.exports = router;
