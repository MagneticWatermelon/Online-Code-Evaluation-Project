const express = require('express');

const isStudent     = require('../middleware/isStudent')
const isInstructor  = require('../middleware/isInstructor')
const isAuth        = require('../middleware/isAuth')

const router = express.Router();

const notificationController = require('../controllers/notification')


router.post(
    '/create/:studentID/:assignmentID',
    isAuth,
    isInstructor,
    notificationController.checkAssignment,
    notificationController.createNotification)

router.get(
    '/get/:id', 
    isAuth,
    isStudent,
    notificationController.validateUser,
    notificationController.getNotification)

router.delete(
    '/delete/:id',
    isAuth,
    isStudent,
    notificationController.validateUser,
    notificationController.deleteNotification)

module.exports = router;