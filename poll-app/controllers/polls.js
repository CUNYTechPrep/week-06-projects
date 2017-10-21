const express = require('express');
const models = require('../models');

const router = express.Router();


// This route retrieves a list of all poll questions
router.get('/', (req, res) => {
  models.Polls.findAll()
    .then((allPolls) => {
      res.json(allPolls);
    });
});

// This route is for creating a new poll object
//  We provide the `question` in the body parameters
//  Note: this does NOT take an array of choices
router.post('/', (req, res) => {
  models.Choices.create({
    question: req.body.question,
  })
    .then((poll) => {
      res.json(poll);
    })
    .catch(() => {
      res.sendStatus(400);
    });
});

// This route is used to retrieve a specific poll object
//  The query also retrieves all associated choices for the poll
router.get('/:id', (req, res) => {
  models.Polls.findById(parseInt(req.params.id, 10), {
    include: [{
      model: models.Choices,
    }],
  })
    .then((poll) => {
      res.json(poll);
    });
});

// This route is used for adding a choice for a specific poll
//  The poll id is in the route parameters
//  The choice description is in the parameters
router.post('/:id/choices', (req, res) => {
  models.Polls.findById(parseInt(req.params.id, 10))
    .then((poll) => {
      models.Choices.create({
        description: req.body.description,
        PollId: poll.id,
      })
        .then((choice) => {
          res.json(choice);
        });
    })
    .catch(() => {
      res.sendStatus(400);
    });
});

router.delete('/:id', (req, res) => {
  models.Polls.findById(parseInt(req.params.id, 10))
    .then((poll) => {
      poll.destroy();
    })
    .catch(() => {
      res.sendStatus(400);
    })
    .then(() => {
      res.send('The poll has been deleted');
    });

  models.Choices.findAll({
    where: {
      PollId: null,
    },
  })
    .then((choices) => {
      choices.forEach((choice) => {
        choice.destroy();
      });
    })
    .catch(() => {
      res.sendStatus(400);
    });

  models.Votes.findAll({
    where: {
      ChoiceId: null,
    },
  })
    .then((votes) => {
      votes.forEach((vote) => {
        vote.destroy();
      });
    })
    .catch(() => {
      res.sendStatus(400);
    });
});

router.post('/:PollId/vote/:user', (req, res) => {
  models.Choices.findOne({
    where: {
      description: req.body.description,
      PollId: req.params.PollId,
    },
  })
    .then((choice) => {
      models.Votes.findCreateFind({
        where: {
          user: req.params.user,
          ChoiceId: choice.id,
        },
      })
        .spread((vote, created) => {
          if (created) {
            res.send('Your vote has been recorded');
          } else {
            res.send('User already voted');
          }
        })
        .catch(() => {
          res.sendStatus(400);
        });
    })
    .catch(() => {
      res.sendStatus(400);
    });
});

router.put('/:id/edit', (req, res) => {
  models.Polls.findById(parseInt(req.params.id, 10))
    .then((poll) => {
      poll.updateAttributes({
        question: req.body.question,
      });
      res.json(poll);
    })
    .catch(() => {
      res.sendStatus(400);
    });
});

module.exports = router;
