const express = require('express');

const isInstructor  = require('../middleware/isInstructor')
const isAuth        = require('../middleware/isAuth')

const router = express.Router();

const questionController = require('../controllers/question')


router.post('/create', isAuth, isInstructor, questionController.createQuestion)
router.get('/get/:id', isAuth, questionController.getQuestion)
router.post('/update/:id', isAuth, isInstructor, questionController.updateQuestion)
router.delete('/delete/:id', isAuth, isInstructor, questionController.deleteQuestion)

router.post('/setIO/:id', isAuth, isInstructor, questionController.updateIO)

router.post('/execute/:id', isAuth, isInstructor, questionController.execute)

module.exports = router;