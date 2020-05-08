const express = require('express');

const isInstructor     = require('../middleware/isInstructor')
const isAuth        = require('../middleware/isAuth')

const router = express.Router();

const announcementController = require('../controllers/announcement')


router.post('/create', isAuth, isInstructor, announcementController.createAnnouncement)
router.get('/get/:id', isAuth, announcementController.getAnnouncement)
router.delete('/delete/:id', isAuth, isInstructor, announcementController.deleteAnnouncement)
router.post('/update/:id', isAuth, isInstructor, announcementController.updateAnnouncement)

module.exports = router;