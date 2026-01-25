const express = require('express')
const router = express.Router()

const users = require('./users')
const properties = require('./properties')
const homeController = require('../controllers')

// middleware that is specific to this router
const timeLog = (req, res, next) => {
  console.log('Time: ', Date.now())
  next()
}
router.use(timeLog)

// define the home page route
router.get('/', homeController.homeRoute)

// mount the users and properties routers
router.use('/users', users)
router.use('/properties', properties)
router.use('/', require('./swagger'))

module.exports = router