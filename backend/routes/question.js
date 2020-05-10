const express = require('express');

const isInstructor  = require('../middleware/isInstructor')
const isAuth        = require('../middleware/isAuth')

const router = express.Router();

const questionController = require('../controllers/question')


router.post(
    '/create/:assignmentID', 
    isAuth, 
    isInstructor,
    questionController.checkAssignment, 
    questionController.createQuestion)

router.get(
    '/get/:id',
    isAuth,
    questionController.validateUser,
    questionController.getQuestion)

router.post(
    '/update/:id', 
    isAuth, 
    isInstructor,
    questionController.validateUser, 
    questionController.updateQuestion)

router.delete(
    '/delete/:id', 
    isAuth, 
    isInstructor,
    questionController.validateUser, 
    questionController.deleteQuestion)

router.post(
    '/setIO/:id', 
    isAuth, 
    isInstructor,
    questionController.validateUser, 
    questionController.updateIO)

router.post(
    '/execute/:id', 
    isAuth, 
    questionController.validateUser, 
    questionController.execute)

module.exports = router;