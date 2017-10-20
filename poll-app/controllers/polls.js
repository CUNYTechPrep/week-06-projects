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
  console.log("posting question.....")
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
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
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
        body: req.body.description, //change description to body because that's the column name
        PollId: poll.id
      })
        .catch((err) => {
          console.log(err);
          res.sendStatus(400);
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

router.put('/:id', (req, res) => {
  models.Polls.update({
    question: req.body.question
  }, {
      where: {
        id: req.params.id
      }
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    })
    .then(something => {
      res.json(something);
    });
});

router.delete('/:id', (req, res) => {
  /*models.Polls.findById(parseInt(req.params.id), {
    include: [{
      model: models.Choices
    }]
  })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    })
    .then(poll => {
      poll.destroy({force: true});
      res.json(poll);
    });*/
  const id = req.params.id;
  models.Polls.destroy({
    where: {
      id: id //this will be your id that you want to delete
    }
  })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    })
    .then(something => {
        console.log(id);
        models.Choices.destroy({
        where: {
          PollId: id
        }
      })
       .catch((err)=>{
         console.log(err);
       })
       .then(something => {
         console.log("deleted: " + something);
       })
       res.json(something);
    });

});




module.exports = router;
