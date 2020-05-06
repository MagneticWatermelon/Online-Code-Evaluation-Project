const express = require('express');

const isAdmin       = require('../middleware/isAdmin')
const isInstructor  = require('../middleware/isInstructor')
const isStudent     = require('../middleware/isStudent')
const isAuth        = require('../middleware/isAuth')

const router = express.Router();

const courseController = require('../controllers/course')


router.post('/create', isAdmin, courseController.createCourse)

router.get('/get/:id', isAuth, courseController.getCourse)

router.delete('/delete/:id', isAdmin, courseController.deleteCourse)

router.post('/update/:id', isAdmin, courseController.updateCourse)

router.post('/addStudent', isAdmin, courseController.addStudent)

router.post('/addInstructor', isAdmin, courseController.addInstructor)

module.exports = router;