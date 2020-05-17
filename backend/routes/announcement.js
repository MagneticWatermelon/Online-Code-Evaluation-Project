const express = require('express');

const isInstructor      = require('../middleware/isInstructor')
const isAuth            = require('../middleware/isAuth')

const router = express.Router();

const announcementController = require('../controllers/announcement')


router.post(
    '/create/:courseID',
    isAuth,
    isInstructor,
    announcementController.checkCourse,
    announcementController.createAnnouncement)

router.get(
    '/get/:id',
    isAuth,
    announcementController.validateUser,
    announcementController.getAnnouncement)


router.delete(
    '/delete/:id',
    isAuth,
    isInstructor,
    announcementController.validateUser,
    announcementController.deleteAnnouncement)

router.post(
    '/update/:id',
    isAuth,
    isInstructor,
    announcementController.validateUser,
    announcementController.updateAnnouncement)

router.get(
    '/comments/:id',
    isAuth,
    announcementController.validateUser,
    announcementController.getComments)

module.exports = router;