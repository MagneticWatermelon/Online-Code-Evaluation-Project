const express = require('express');

const isAdmin       = require('../middleware/isAdmin')
const isAuth        = require('../middleware/isAuth')

const router = express.Router();

const courseController = require('../controllers/course')


router.post('/create', isAuth, isAdmin, courseController.createCourse)
router.get('/get/:id', isAuth, courseController.getCourse)
router.post('/update/:id', isAuth, isAdmin, courseController.updateCourse)
router.delete('/delete/:id', isAuth, isAdmin, courseController.deleteCourse)

router.post('/addStudent', isAuth, isAdmin, courseController.addStudent)
router.delete('/dropStudent', isAuth, isAdmin, courseController.dropStudent)

router.post('/addInstructor', isAuth, isAdmin, courseController.addInstructor)
router.delete('/dropInstructor', isAuth, isAdmin, courseController.dropInstructor)


router.get('/getAssignments/:id', isAuth, courseController.getAssignments)
router.get('/getStudents/:id', isAuth, courseController.getStudents)
router.get('/getInstructors/:id', isAuth, courseController.getInstructors)

module.exports = router;