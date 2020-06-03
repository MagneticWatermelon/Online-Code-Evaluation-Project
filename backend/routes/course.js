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
    '/get/all',
    isAuth,
    isAdmin,
    courseController.getAllCourses)

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

router.delete(
    '/delete',
    isAuth,
    isAdmin,
    courseController.deleteAll)

router.post(
    '/register/:courseID',
    isAuth,
    isAdmin,
    courseController.addPeople)

router.delete(
    '/deregister/:courseID',
    isAuth,
    isAdmin,
    courseController.dropPeople)

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


router.get(
    '/grade/:id/:studentID', 
    isAuth,
    courseController.checkCourse,
    courseController.getGrade)

router.get(
    '/grades/:id/:studentID',
    isAuth,
    courseController.checkCourse,
    courseController.getAssignmentsWithGrades)

module.exports = router;