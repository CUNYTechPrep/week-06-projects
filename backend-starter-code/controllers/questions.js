const express = require('express');
const models = require('../models');

const QuestionsController = {
  registerRouter() {
    const router = express.Router();

    router.get('/', this.index);
    router.post('/', this.create);

    return router;
  },
  index(req, res) {
    models.Questions.findAll()
      .then((questions) => {
        res.render('questions', { questions });
      });
  },
  create(req, res) {
    models.Questions.create({
      question: req.body.text
    })
    .then((post) => {
      res.redirect('/questions');
    })
    .catch((err) => {
      console.log('ERROR while creating a new question');
      res.redirect('/error');
    })
  }
};

module.exports = QuestionsController.registerRouter();