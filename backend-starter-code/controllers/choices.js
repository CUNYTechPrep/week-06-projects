const express = require('express');
const models = require('../models');

const ChoicesController = {
  registerRouter() {
    const router = express.Router();

    router.get('/', this.index);
    router.post('/', this.create);

    return router;
  },
  index(req, res) {
    models.Choices.findAll()
      .then((choices) => {
        res.render('choices', { choices });
      });
  },
  create(req, res) {
    models.Choices.create({
      text: req.body.text
      questionID:{
        //?
      }
    })
    .then((post) => {
      res.redirect('/choices');
    })
    .catch((err) => {
      console.log('ERROR while creating a new choice');
      res.redirect('/error');
    })
  }
};

module.exports = ChoicesController.registerRouter();