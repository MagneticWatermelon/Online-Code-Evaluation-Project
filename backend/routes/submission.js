const express = require('express');

const isInstructor  = require('../middleware/isInstructor')
const isStudent     = require('../middleware/isStudent')
const isAuth        = require('../middleware/isAuth')

const router = express.Router();

const submissionController = require('../controllers/submission')


router.post('/create', isStudent, submissionController.createSubmission)
router.get('/get/:id', isAuth, submissionController.getSubmission)
router.delete('/delete/:id', isInstructor, submissionController.deleteSubmission)

router.get('/files/:id', isAuth, submissionController.getFiles)

router.post('/updateScore/:id',isInstructor, submissionController.updateScore)
router.post('/updateEvaluation/:id', isInstructor, submissionController.updateEvaluation)


module.exports = router;