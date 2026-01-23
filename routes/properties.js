const express = require('express')
const router = express.Router()

const propertyController = require('../controllers/properties');

// middleware that is specific to this router
const timeLog = (req, res, next) => {
  console.log('Time: ', Date.now())
  next()
}
router.use(timeLog)

// define the home page route
router.get('/', propertyController.propertiesHome)
// define the about route
router.get('/about', propertyController.propertiesAbout)

module.exports = router