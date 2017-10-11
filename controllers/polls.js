const express = require('express');
const models = require('../models');

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

  index(req, res) {
    models.Poll.findAll()
    .then((allPolls) => {
      res.json(allPolls);
    });
  },

  create(req, res) {
    models.Poll.create({
    question: req.body.question
  })
  .then((poll) => {
    res.json(poll);
  })
  .catch(() => {
    res.sendStatus(400);
  });
},

  show(req, res){
    models.Poll.findById(parseInt(req.params.id), {
    include: [{
      model: models.Choice
    }]
  })
  .then(poll => {
    res.json(poll);
  });
  },

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



