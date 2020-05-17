const express = require('express');

const isAuth        = require('../middleware/isAuth')

const router = express.Router();

const commentController = require('../controllers/comment')


router.post(
    '/create/:announcementID',
    isAuth,
    commentController.checkAnnouncement, 
    commentController.createComment)

router.get(
    '/get/:id',
    isAuth,
    commentController.validateReadPermission,
    commentController.getComment)

router.post(
    '/update/:id',
    isAuth,
    commentController.validateUser,
    commentController.updateComment)

router.delete(
    '/delete/:id',
    isAuth,
    commentController.validateUser,
    commentController.deleteComment)


module.exports = router;