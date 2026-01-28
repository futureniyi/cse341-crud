const express = require('express')
const router = express.Router()

const users = require('./users')
const properties = require('./properties')
const homeController = require('../controllers')
const passport = require('passport')

// define the home page route
router.get('/', homeController.homeRoute)

router.get('/login', passport.authenticate('github'), (req, res) => { });

router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err); }
    req.session.destroy();
    res.redirect('/');
  });
});

// mount the users and properties routers
router.use('/users', users)
router.use('/properties', properties)
router.use('/', require('./swagger'))

module.exports = router