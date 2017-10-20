const express = require('express');
const db = require('../models');

const AnswersController = {
  registerRouter() {
    const router = express.Router();

    router.get('/', this.index);
    router.post('/', this.create);
    router.put('/:id', this.update);
    router.delete('/:id', this.delete);

    return router;
  },


  // retrieves all user answers to polls
  index(req, res) {
    db.answers.findAll()
      .then((allAnswers) => {
        res.json(allAnswers);
      });
  },

  // records a new answer to poll
  create(req, res) {
    db.answers.create({
        user_id: req.body.user_id,
        poll_id: req.body.poll_id,
        choice_id: req.body.choice_id,
      })
      .then((answer) => {
        res.json(answer);
      });
      // .catch(() => {
      //   res.sendStatus(400);
      // });
  },

  // for future development
  update(req, res) {
    res.json({
      msg: "Successful PUT to '/answers' route",
      id: req.params.id
    });
  },

  // for future development
  delete(req, res) {
    res.json({
      msg: "Successful DELETE to '/answers' route",
      id: req.params.id
    });
  },
};


module.exports = AnswersController.registerRouter();