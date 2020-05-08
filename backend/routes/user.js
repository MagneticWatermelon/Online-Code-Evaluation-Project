const express = require('express');

const isInstructor  = require('../middleware/isInstructor')
const isStudent     = require('../middleware/isStudent')
const isAuth        = require('../middleware/isAuth')
const isAdmin       = require('../middleware/isAdmin')

const router = express.Router();

const userController = require('../controllers/user')


router.post('/create', isAdmin, userController.createUser)
router.get('/get/:id', isAuth, userController.getUser)
router.post('/update/:id', isAdmin, userController.updateUser)
router.delete('/delete/:id', isAdmin, userController.deleteUser)

module.exports = router;


