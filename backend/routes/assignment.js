const express = require('express');

const isInstructor  = require('../middleware/isInstructor')
const isAuth        = require('../middleware/isAuth')

const router = express.Router();

const assignmentController = require('../controllers/assigment')

router.post('/create', isInstructor, assignmentController.createAssignment)
router.get('/get/:id', isAuth, assignmentController.getAssignment)
router.post('/update/:id', isInstructor, assignmentController.updateAssignment)
router.delete('/delete/:id', isInstructor, assignmentController.deleteAssignment)

router.get('/questions/:id', isAuth, assignmentController.getQuestions)

module.exports = router;