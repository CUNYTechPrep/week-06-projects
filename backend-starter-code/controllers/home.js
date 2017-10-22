const express = require('express');
const models = require('../models');
const passport = require('../middlewares/authentication')

const HomeController = {
  registerRouter() {
    const router = express.Router();

    router.get('/login', passport.redirectIfLoggedIn('/polls'), this.login);
    router.post('/login', this.loginUser);
    router.get('/signup', passport.redirectIfLoggedIn('/polls'), this.signup);
    router.post('/signup', this.createUser);
    router.get('/logout', passport.redirectIfNotLoggedIn('/polls'), this.logout);
    router.get('/success', this.thanksVoting);

    return router;
  },

  login(req, res) {
    res.render('login');
  },

  loginUser(req, res) {
    passport.authenticate('local', {
      successRedirect: '/polls',
      failureRedirect: '/login',
    })(req, res);
  },

  signup(req, res) {
    res.render('signup');
  },

  createUser(req, res) {
    models.Users.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password_hash: req.body.password,
    }).then( (user) => {
      req.login(user, () => {
        res.redirect('/polls');
      })
    })
  },

  logout(req, res) {
    req.logout();
    res.redirect('/login');
  },

  thanksVoting(req, res) {
    res.render('thankYou');
  },
}


module.exports = HomeController.registerRouter();
