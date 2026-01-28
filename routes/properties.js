const express = require('express')
const router = express.Router()

const propertyController = require('../controllers/properties');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

// define the all properties route
router.get('/', propertyController.getAllProperties)
// define the single property route
router.get('/:id', propertyController.getSingleProperty)
// define the create property route
router.post('/', isAuthenticated, validation.saveProperties, propertyController.createProperty)
// define the update property route
router.put('/:id', isAuthenticated, validation.saveProperties, propertyController.updateProperty)
// define the delete property route
router.delete('/:id', isAuthenticated, propertyController.deleteProperty)

module.exports = router