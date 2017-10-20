const express = require('express');
const models = require('../models');

const router = express.Router();


/* GET Routes */

// This route retrieves a list of all poll questions
router.get('/', (req, res) => {
  models.Polls.findAll()
    .then((allPolls) => {
      res.json(allPolls);
    })
});

// This route retrieves a poll question and its choices by id
router.get('/:id', (req, res) => {
  const questionId = parseInt(req.params.id);
  models.Polls.findById(questionId, 
      {
        include: [
          {
            model: models.Choices
          }
        ]
      })
    .then((poll) => {
      res.json(poll);
    })
    .catch(() => {
    res.sendStatus(400);
  })
});



/* POST Requests */

//  Creates a new poll object. Sets the question text to be the req body param
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


//This route creates a choice for a given question id

router.post('/:id/choices', (req, res) => {
  const questionId = parseInt(req.params.id);
  const choice = req.body.description;

  models.Polls.findById(questionId)
  .then(poll => {
    models.Choices.create({
    description: choice,
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



//updates question with question body text according to question id

router.put('/:id', (req, res) => {
	const questionId = req.params.id;
  const questionBody = req.body.question;
  let updateValues = { question: questionBody };

  models.Polls.update(updateValues,
  {
    where: {
      id: questionId
    }
  })
    .then((poll) => {
      res.json("updated question #" + questionId);
    	res.json(questionBody);
    	res.json(poll);
    })
    .catch(() => {
      res.sendStatus(400);
  })
});




/* DELETE Route */
//This route deletes a question and its choices by id

router.delete('/:id', (req, res) => {
  const questionId = req.params.id;
  models.Polls.destroy({
       where: { id: questionId }
     })
  models.Choices.destroy({
    where: { PollId: questionId }
  })
  .then(() => {
    res.send("Poll#" + questionId + " is deleted.");
  })
  .catch(() => {
    res.sendStatus(400);
  })
});


module.exports = router;