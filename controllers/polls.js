const express = require('express');
const db = require('../models');

const PollsController = {
  registerRouter() {
    const router = express.Router();

    router.get('/', this.index);
    router.get('/:id', this.show);
    router.post('/', this.create);
    router.put('/:id', this.update);
    router.delete('/:id', this.delete);
    router.get('/:id/choices/:choice_id/votes', this.votes);

    return router;
  },

  // retrieves a list of all polls
  index(req, res) {
    db.polls.findAll()
      .then((allPolls) => {
        res.json(allPolls);
      });
  },

  // creates a new poll object
  create(req, res) {
    db.polls.create({
        question: req.body.question,
        author: req.body.author
      })
      .then((poll) => {
        choices = req.body.choices;
        for (let choice of choices) {
          db.choices.create({
              poll_id: poll.id,
              description: choice
            })
            .then((ch) => {});
        }
        return poll;
      })
      .then((poll) => {
        res.json(poll)
      })
  },

  // retrieves poll with specific id
  show(req, res) {
    db.polls.findById(parseInt(req.params.id), {
        include: [{
          model: db.choices
        }]
      })
      .then(poll => {
        res.json(poll);
      });
  },

  // updates poll with specific id with new question
  update(req, res) {
    db.polls.findById(parseInt(req.params.id))
      .then(poll => {
        poll.updateAttributes({
          question: req.body.question
        })
      })
      .then(poll => {
        res.json(poll);
      });
  },

  // deletes poll with specific id
  delete(req, res) {
    db.polls.destroy({
        where: {
          id: parseInt(req.params.id)
        }
      })
      .then(poll => {
        res.json({
          msg: "Successful DELETE to '/polls' route",
          id: req.params.id
        });
      });
  },

  // show number of voters for choice with specific id
  votes(req, res) {
        choiceId = parseInt(req.params.choice_id);
        pollId = parseInt(req.params.id);
        db.answers.findAndCountAll({
            where: {
                choice_id: choiceId,
                poll_id: pollId
            }
        })
        .then((count) => {
            res.json(count);
        });
    },
};


module.exports = PollsController.registerRouter();
