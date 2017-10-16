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

    return router;
  },

  // retrieves a list of all polls
  index(req, res) {
    models.Poll.findAll()
    .then((allPolls) => {
      res.json(allPolls);
    });
  },

  // creates a new poll object
  create(req, res) {
    db.polls.create({
    question: req.body.question
  })
  .then((poll) => {
    res.json(poll);
  })
  // .catch(() => {
  //     res.sendStatus(400);
  //   });
  },

  // retrieves poll with specific id
  show(req, res) {
    models.Poll.findById(parseInt(req.params.id))
    .then(poll => {
      res.json(poll);
    });
  },

  // updates poll with specific id with new question
  update(req, res) {
    models.Poll.findById(parseInt(req.params.id))
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
    models.Poll.destroy({
      where: { id: parseInt(req.params.id) }
    })
    .then(poll => {
      res.json({
        msg: "Successful DELETE to '/polls' route",
        id: req.params.id
      });
    });
  }
};


module.exports = PollsController.registerRouter();



