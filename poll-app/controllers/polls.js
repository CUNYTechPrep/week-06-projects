const express = require('express');
const models = require('../models');

const router = express.Router();

// This route retrieves a list of all poll questions
router.get('/', (req, res) => {
  models.Polls.findAll()
    .then((allPolls) => {
      res.json(allPolls);
    })
});

// This route is for creating a new poll object
//  We provide the `question` in the body parameters
//  Note: this does NOT take an array of choices
router.post('/', (req, res) => {
  models.Polls.create({
    question: req.body.question
  })
  .then((poll) => {
    res.json(poll);
  })
  .catch(() => {
    res.sendStatus(400);
  })
});

// This route is used to retrieve a specific poll object
//  The query also retrieves all associated choices for the poll
router.get('/:id', (req, res) => {
  models.Polls.findById(parseInt(req.params.id), {
    include: [{
      model: models.Choices
    }]
  })
  .then(poll => {
    res.json(poll);
  });
});

// This route is used to update a poll question based on a poll id.
// The updated question text is in the body parameters
router.put('/:id', (req, res) => {
  // find the poll using the id
  models.Polls.findById(parseInt(req.params.id))
  .then(poll => {
    // then use the poll and update the question field
    poll.update({question: req.body.question});
    // and return the updated poll as a json
    res.json(poll);
  })
  .catch(() => {
    res.sendStatus(400);
  });
});

// This route is used to delete a specific poll based on the poll id.
// It also deletes any choices associated with that poll
router.delete('/:id', (req, res) => {
  // get the poll using the poll id and display its corresponding choices
  models.Polls.findById(parseInt(req.params.id), {
    include: [{
      model: models.Choices
    }]
  })
  .then(poll => {
    // then destroy the poll,
    poll.destroy();
    // destroy all the corresponding choices that have that poll id,
    models.Choices.destroy({where: {PollId: req.params.id}});
    // and display the deleted poll and its choices as a json object
    res.json(poll);
  });
});

// This route is used for adding a choice for a specific poll
//  The poll id is in the route parameters
//  The choice description is in the parameters
router.post('/:id/choices', (req, res) => {
  models.Polls.findById(parseInt(req.params.id))
    .then(poll => {
      models.Choices.create({
        description: req.body.description,
        PollId: poll.id
      })
      .then((choice) => {
        res.json(choice);
      })
    })
    .catch(() => {
      res.sendStatus(400);
    });
});

module.exports = router;
