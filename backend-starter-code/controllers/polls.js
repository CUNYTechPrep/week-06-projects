const express = require('express');
const models = require('../models');

const router = express.Router();

router.get('/', (req, res) => {
   models.Polls.findAll()
      .then((allPolls) => {
         res.json(allPolls);
      })
});

router.post('/:id/choices', (req, res) => {
   models.Polls.findById(parseInt(req.params.id))
      .then(poll => {
         models.Choices.create({
            body: req.body.body,
            PollId: poll_id
         })
      })
});

module.exports = router;
