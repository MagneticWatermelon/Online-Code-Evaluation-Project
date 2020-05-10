const express = require('express');

const isAuth        = require('../middleware/isAuth')
const isAdmin       = require('../middleware/isAdmin')

const router = express.Router();

const userController = require('../controllers/user')


router.post(
    '/create',
    isAuth, 
    isAdmin, 
    userController.createUser)

router.get(
    '/get/:id', 
    isAuth, 
    userController.getUser)

router.delete(
    '/delete/:id', 
    isAuth, 
    isAdmin, 
    userController.deleteUser)

router.post(
    '/updatePassword/:id',
    isAuth,
    userController.checkUser,
    userController.updatePassword)

router.post(
    '/addProfilePhoto/:id',
    isAuth,
    userController.checkUser,
    userController.addProfilePhoto)

router.get(
    '/courses/:id', 
    isAuth,
    userController.checkUser,
    userController.getCourses)

router.get(
    '/notifications/:id',
    isAuth,
    userController.checkUser,
    userController.getNotifications)

module.exports = router;


