const express = require('express');

const isInstructor  = require('../middleware/isInstructor')
const isAuth        = require('../middleware/isAuth')

const router = express.Router();

const assignmentController = require('../controllers/assigment')

router.post(
    '/create/:courseID',
    isAuth, 
    isInstructor,
    assignmentController.checkCourse,
    assignmentController.createAssignment)

router.get(
    '/get/:id', 
    isAuth,
    assignmentController.validateUser, 
    assignmentController.getAssignment)

router.post(
    '/update/:id',
    isAuth,
    isInstructor,
    assignmentController.validateUser,
    assignmentController.updateAssignment)

router.delete(
    '/delete/:id', 
    isAuth, 
    isInstructor,
    assignmentController.validateUser, 
    assignmentController.deleteAssignment)

router.get(
    '/questions/:id',
    isAuth,
    assignmentController.validateUser, 
    assignmentController.getQuestions)

router.get(
    '/grade/:id/:studentID',
    isAuth,
    assignmentController.validateUser,
    assignmentController.getGrade)
    
module.exports = router;