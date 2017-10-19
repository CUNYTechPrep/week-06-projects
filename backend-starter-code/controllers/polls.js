const express = require('express');
const models = require('../models');

const PollsController = {
  registerRouter() {
    const router = express.Router();

    router.get('/', this.get);
    router.get('/:id', this.getById);
    router.post('/', this.create);
    router.delete('/:id', this.deletePoll);
    router.post('/:id/choices', this.createChoice);
    router.put('/choices/:id', this.updateChoice);

    return router;
  },
  get(req, res) {
    // Get all polls with choices from the choices table.
    models.Polls.findAll({include: [{model: models.Choices}]})
      .then(polls => {
        res.render('polls', {polls});
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
  createChoice(req, res) {
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
  },
  updateChoice(req, res) {
    models.Choices.increment('count', {where: {id: req.params.id}})
      .then(result => res.sendStatus(200))
      .catch(err => res.sendStatus(400));
  },
  deletePoll(req, res) {
    models.Polls.destroy({
      where: {id: req.params.id}
    })
    .then(result => {
      res.sendStatus(200);
    })
    .catch(err => {
      res.sendStatus(400);
    })
  }
};


module.exports = PollsController.registerRouter();
