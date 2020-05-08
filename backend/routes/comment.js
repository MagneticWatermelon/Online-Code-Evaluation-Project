const express = require('express');

const isAuth        = require('../middleware/isAuth')

const router = express.Router();

const commentController = require('../controllers/comment')


router.post('/create', isAuth, commentController.createComment)
router.get('/get/:id', isAuth, commentController.getComment)
router.post('/update/:id', isAuth, commentController.updateComment)
router.delete('/delete/:id', isAuth, commentController.deleteComment)


module.exports = router;