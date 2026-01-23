const express = require('express')
const router = express.Router()

const userController = require('../controllers/users');

// middleware that is specific to this router
const timeLog = (req, res, next) => {
  console.log('Time: ', Date.now())
  next()
}
router.use(timeLog)

// define the home page route
router.get('/', userController.usersHome)
// define the about route
router.get('/about', userController.usersAbout)

module.exports = router