const express = require('express')
const router = express.Router()

const users = require('./users')
const properties = require('./properties')

// middleware that is specific to this router
const timeLog = (req, res, next) => {
  console.log('Time: ', Date.now())
  next()
}
router.use(timeLog)

// define the home page route
router.get('/', (req, res) => {
  res.send('Home page')
})

router.use('/users', users)
router.use('/properties', properties)

module.exports = router