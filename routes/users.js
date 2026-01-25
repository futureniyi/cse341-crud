const express = require('express')
const router = express.Router()

const userController = require('../controllers/users');
const validation = require('../middleware/validate');

// define the all users route
router.get('/', userController.getAllUsers)
// define the single user route
router.get('/:id', userController.getSingleUser)
// define the create user route
router.post('/', validation.saveUsers, userController.createUser)
// define the update user route
router.put('/:id', validation.saveUsers, userController.updateUser)
// define the delete user route
router.delete('/:id', userController.deleteUser)

module.exports = router