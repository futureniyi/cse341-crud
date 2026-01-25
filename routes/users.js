const express = require('express')
const router = express.Router()

const userController = require('../controllers/users');

// middleware that is specific to this router
const timeLog = (req, res, next) => {
  console.log('Time: ', Date.now())
  next()
}
router.use(timeLog)

// define the all users route
router.get('/', userController.getAllUsers)
// define the single user route
router.get('/:id', userController.getSingleUser)
// define the create user route
router.post('/', userController.createUser)
// define the update user route
router.put('/:id', userController.updateUser)
// define the delete user route
router.delete('/:id', userController.deleteUser)

module.exports = router