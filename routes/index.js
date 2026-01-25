const express = require('express')
const router = express.Router()

const users = require('./users')
const properties = require('./properties')
const homeController = require('../controllers')

// define the home page route
router.get('/', homeController.homeRoute)

// mount the users and properties routers
router.use('/users', users)
router.use('/properties', properties)
router.use('/', require('./swagger'))

module.exports = router