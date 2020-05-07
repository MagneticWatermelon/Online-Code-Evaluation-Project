const express = require('express');

const isAdmin       = require('../middleware/isAdmin')
const isAuth        = require('../middleware/isAuth')

const router = express.Router();

const courseController = require('../controllers/course')


router.post('/create', isAdmin, courseController.createCourse)
router.get('/get/:id', isAuth, courseController.getCourse)
router.post('/update/:id', isAdmin, courseController.updateCourse)
router.delete('/delete/:id', isAdmin, courseController.deleteCourse)

router.post('/addStudent', isAdmin, courseController.addStudent)
router.delete('/dropStudent', isAdmin, courseController.dropStudent)

router.post('/addInstructor', isAdmin, courseController.addInstructor)
router.delete('/dropInstructor', isAdmin, courseController.dropInstructor)


router.get('/getAssignments/:id', isAuth, courseController.getAssignments)
router.get('/getStudents/:id', isAuth, courseController.getStudents)
router.get('/getInstructors/:id', isAuth, courseController.getInstructors)

module.exports = router;