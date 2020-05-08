const express = require('express');

const isInsructor     = require('../middleware/isInstructor')
const isAuth        = require('../middleware/isAuth')

const router = express.Router();

const announcementController = require('../controllers/announcement')


router.post('/create', isAuth, isInsructor, announcementController.createAnnouncement)
router.get('/get/:id', isAuth, announcementController.getAnnouncement)
router.delete('/delete/:id', isAuth, isInsructor, announcementController.deleteAnnouncement)

module.exports = router;