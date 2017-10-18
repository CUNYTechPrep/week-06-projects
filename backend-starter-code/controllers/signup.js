const router = require('express').Router();
const models = require('../models');
const Users = models.Users;

router.get('/', (req, res) => {
  res.render('signup')
});

router.post('/', (req, res) => {
  Users.create({
    userName: req.body.userName,
    firstName: req.body.firstName,
    LastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    password_hash: req.body.password,

  }).then((user) => {
    req.login(user, () =>
      res.redirect('/profile')
    );
  }).catch(() => {
    res.render('signup');
  });
});