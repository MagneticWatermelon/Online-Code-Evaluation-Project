const express = require('express');

const isInstructor  = require('../middleware/isInstructor')
const isStudent     = require('../middleware/isStudent')
const isAuth        = require('../middleware/isAuth')
const isAdmin       = require('../middleware/isAdmin')

const router = express.Router();

const userController = require('../controllers/user')


router.post('/create', isAdmin, userController.createUser)
router.get('/get/:id', isAuth, userController.getUser)
router.delete('/delete/:id', isAdmin, userController.deleteUser)

router.post('/updatePassword/:id', isAuth, userController.updatePassword)
router.post('/addProfilePhoto/:id', isAuth, userController.addProfilePhoto)

router.get('/getGivenCourses/:id', isInstructor, userController.getGivenCourses)
router.get('/getTakenCourses/:id', isStudent, userController.getTakenCourses)

module.exports = router;


