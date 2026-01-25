const express = require('express')
const router = express.Router()

const propertyController = require('../controllers/properties');

// middleware that is specific to this router
const timeLog = (req, res, next) => {
  console.log('Time: ', Date.now())
  next()
}
router.use(timeLog)

// define the all properties route
router.get('/', propertyController.getAllProperties)
// define the single property route
router.get('/:id', propertyController.getSingleProperty)
// define the create property route
router.post('/', propertyController.createProperty)
// define the update property route
router.put('/:id', propertyController.updateProperty)
// define the delete property route
router.delete('/:id', propertyController.deleteProperty)

module.exports = router