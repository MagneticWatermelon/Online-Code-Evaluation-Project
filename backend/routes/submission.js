const express = require('express');

const isInstructor  = require('../middleware/isInstructor')
const isStudent     = require('../middleware/isStudent')
const isAuth        = require('../middleware/isAuth')

const router = express.Router();

const submissionController = require('../controllers/submission')


router.post(
    '/create/:questionID',
    isAuth,
    isStudent,
    submissionController.checkQuestion,
    submissionController.checkSubmissionLimit,
    //submissionController.checkLanguage,
    submissionController.createSubmission)

router.get(
    '/get/:id',
    isAuth,
    submissionController.validateUser,
    submissionController.getSubmission)

router.delete(
    '/delete/:id', 
    isAuth, 
    isInstructor,
    submissionController.validateUser, 
    submissionController.deleteSubmission)

router.get(
    '/files/:id', 
    isAuth,
    submissionController.validateUser, 
    submissionController.getFiles)

router.post(
    '/updateScore/:id',
    isAuth,
    isInstructor,
    submissionController.validateUser,
    submissionController.updateScore)

router.post(
    '/updateEvaluation/:id',
    isAuth,
    isInstructor,
    submissionController.validateUser,
    submissionController.updateEvaluation)

module.exports = router;