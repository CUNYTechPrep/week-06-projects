const express = require('express');
const models = require('../models');

const PollsController = {
  registerRouter() {
    const router = express.Router();

    router.get('/', this.get);
    router.get('/:id', this.getById);
    router.post('/', this.create);
    router.post('/:id/choices', this.createChoices)
    // router.put('/:id', this.update);
    // router.delete('/:id', this.delete);

    return router;
  },
  get(req, res) {
    // Get all polls with choices from the choices table.
    models.Polls.findAll({include: [{model: models.Choices}]})
      .then(polls => {
        res.json(polls);
      });
  },
  getById(req, res) {
    models.Polls.findById(parseInt(req.params.id), {include: [{model: models.Choices}]} )
      .then(poll => {
        res.json(poll);
      });
  },
  create(req, res) { 
    // This create a new poll but doesn't have the choices
    models.Polls.create({
      question: req.body.question
    })
    .then(poll => {
      res.json(poll);
    })
    .catch(err => {
      res.sendStatus(400);
    });
  },
  createChoices(req, res) {
    models.Polls.findById(parseInt(req.params.id))
      .then(poll => {
        models.Choices.create({
          description: req.body.description,
          PollId: poll.id
        }).then(choice => res.json(choice));
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  }
};


module.exports = PollsController.registerRouter();
