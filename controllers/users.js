const express = require('express');
const models = require('../models');

const UsersController = {
  registerRouter() {
    const router = express.Router();

    router.get('/', this.index);
    router.post('/', this.create);
    router.put('/:id', this.update);
    router.delete('/:id', this.delete);

    return router;
  },

   // retrieves a list of all users
  index(req, res) {
    models.User.findAll()
      .then((allUsers) => {
        res.json(allUsers);
      });
  },

  // creates a new user object
  create(req, res) {
    models.User.create({
      email: req.body.email
    })
      .then((user) => {
        res.json(user);
      })
    .catch(() => {
      res.sendStatus(400);
    });
  },

  // updates user with new email
  update(req, res) {
    models.User.findById(parseInt(req.params.id))
    .then(user => {
      user.updateAttributes({
        email: req.body.email
      })
    })
    .then(user => {
      res.json(user);
    });
  },

  // deletes user by id
  delete(req, res) {
    models.User.destroy({
      where: { id: parseInt(req.params.id) }
    })
    .then(user => {
      res.json({
        msg: "Successful DELETE to '/users' route",
        id: req.params.id
      });
    });
  }
};


module.exports = UsersController.registerRouter();
