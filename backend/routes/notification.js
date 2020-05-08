const express = require('express');

const isStudent     = require('../middleware/isStudent')
const isAuth        = require('../middleware/isAuth')

const router = express.Router();

const notificationController = require('../controllers/notification')


router.post('/create', isAuth, isStudent, notificationController.createNotification)
router.get('/get/:id', isAuth, isStudent, notificationController.getNotification)
router.delete('/delete/:id', isAuth, isStudent, notificationController.deleteNotification)

module.exports = router;