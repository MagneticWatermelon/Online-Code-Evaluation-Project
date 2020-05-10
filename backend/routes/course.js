const express = require('express');

const isAdmin       = require('../middleware/isAdmin')
const isAuth        = require('../middleware/isAuth')

const router = express.Router();

const courseController = require('../controllers/course')


router.post(
    '/create',
    isAuth,
    isAdmin,
    courseController.createCourse)

router.get(
    '/get/:id',
    isAuth,
    courseController.checkCourse,
    courseController.getCourse)

router.post(
    '/update/:id',
    isAuth,
    isAdmin,
    courseController.updateCourse);

router.delete(
    '/delete/:id',
    isAuth,
    isAdmin,
    courseController.deleteCourse)

router.post(
    '/addStudent/:courseID/:studentID',
    isAuth,
    isAdmin,
    courseController.addStudent)

router.delete(
    '/dropStudent/:courseID/:studentID',
    isAuth,
    isAdmin,
    courseController.dropStudent)

router.post(
    '/addInstructor/:courseID/:instructorID',
    isAuth,
    isAdmin,
    courseController.addInstructor)

router.delete(
    '/dropInstructor/:courseID/:instructorID',
    isAuth,
    isAdmin,
    courseController.dropInstructor)

router.get(
    '/assignments/:id',
    isAuth,
    courseController.checkCourse,
    courseController.getAssignments)

router.get(
    '/students/:id',
    isAuth,
    courseController.checkCourse,
    courseController.getStudents)

router.get(
    '/instructors/:id',
    isAuth,
    courseController.checkCourse,
    courseController.getInstructors)

router.get(
    '/announcements/:id',
    isAuth,
    courseController.checkCourse, 
    courseController.getAnnouncements)

router.get(
    '/resources/:id',
    isAuth,
    courseController.checkCourse,
    courseController.getResources)

module.exports = router;