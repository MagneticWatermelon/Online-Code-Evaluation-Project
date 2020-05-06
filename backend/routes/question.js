const express = require('express');

const isInstructor  = require('../middleware/isInstructor')
const isAuth        = require('../middleware/isAuth')

const router = express.Router();

const questionController = require('../controllers/question')


router.post('/create', isInstructor, questionController.createQuesion)
router.get('/get/:id', isAuth, questionController.getQuestion)
router.post('/update/:id', isInstructor, questionController.updateQuestion)
router.delete('/delete/:id', isInstructor, questionController.deleteQuestion)

router.post('/setIO/:id', isInstructor, questionController.updateIO)

router.post('/execute/:id', isInstructor, questionController.execute)

module.exports = router;