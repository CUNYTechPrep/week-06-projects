const express = require('express');
const db = require('../models');

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
    db.User.findAll()
      .then((allUsers) => {
        res.json(allUsers);
      });
  },

  // creates a new user object
  create(req, res) {
    db.users.create({
        email: req.body.email,
        name: req.body.name
      })
      .then((user) => {
        res.json(user);
      })
      .catch(() => {
        res.sendStatus(400);
      });
  },

  // updates user with new email and name
  update(req, res) {
    db.users.findById(parseInt(req.params.id))
      .then(user => {
        user.updateAttributes({
          email: req.body.email,
          name: req.body.name
        })
      })
      .then(user => {
        res.json(user);
      });
  },

  // deletes user by id
  delete(req, res) {
    db.users.destroy({
        where: {
          id: parseInt(req.params.id)
        }
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
