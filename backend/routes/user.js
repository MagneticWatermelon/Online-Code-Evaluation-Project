const express = require('express');

const isAuth        = require('../middleware/isAuth')
const isAdmin       = require('../middleware/isAdmin')

const router = express.Router();

const userController = require('../controllers/user')


router.post('/create', isAuth, isAdmin, userController.createUser)
router.get('/get/:id', isAuth, userController.getUser)
router.delete('/delete/:id', isAuth, isAdmin, userController.deleteUser)

router.post('/updatePassword/:id', isAuth, userController.updatePassword)
router.post('/addProfilePhoto/:id', isAuth, userController.addProfilePhoto)

router.get('/courses', isAuth, userController.getCourses)
router.get('/notifications', isAuth, userController.getNotifications)

module.exports = router;


