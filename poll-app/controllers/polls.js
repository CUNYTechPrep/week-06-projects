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

//Allow the user to update a Poll question text
//Add a PUT route that allows this
router.put('/:id', (req, res, next) => {
  models.Polls.update({
    question: req.body.question,
  },
  { 
    where: {
      id: req.params.id,
    },returning: true,
  })
  .then(([rowsUpdate, updatedRow]) => {
    res.json(updatedRow);
    console.log("updatedRow");
  })
  .catch(next)
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
      console.log('error here')
      res.sendStatus(400);
    });
});

//Allow the user to delete a Poll
//Add the DELETE route that allows this
//Should also delete the associated Choice
router.delete('/:id', (req, res) => {
      models.Choices.destroy({
        where: {
          PollId: req.params.id,
        },
      }).then(() => {
        models.Polls.destroy({
          where: {
            id: req.params.id,
          }
        })
      }).then(() => {
        res.redirect('/polls');
      })
});


module.exports = router;
