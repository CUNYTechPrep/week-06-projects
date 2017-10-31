const express = require('express');
const models = require('../models');

const router = express.Router();

router.put('/:id',(req,res)=>{
  models.Polls.findById(parseInt(req.parms.id),{
    include:[]
  })
  .then(poll=>{
    poll.set('question',req.body.question);
    poll.save();
    res.json(poll);
  })
});

route.delete('/:id',(req,res)=>{
  models.Polls.findById(parseInt(req.params.id),{
    include:
      model:models.Choices
  })
  .then(poll=>{
    poll.destroy();
    res.json(poll);
  })
  .catch{()=>
    console.log("Error deleting");
  }
})
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


module.exports = router;
