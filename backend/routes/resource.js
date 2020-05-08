const express = require('express');

const isInstructor  = require('../middleware/isInstructor')
const isAuth        = require('../middleware/isAuth')

const multer        = require('multer')
const storage       = multer.memoryStorage()
const upload = multer({
    storage:storage,
    limits:{fileSize: 10*1024*1024}
});

const router = express.Router();

const resourceController = require('../controllers/resource')

router.post('/upload', isAuth, isInstructor,upload.single('file'),resourceController.uploadResource)
router.post('/download/:id', isAuth, resourceController.downloadResource)
router.delete('/delete/:id', isAuth, isInstructor, resourceController.deleteResource)

module.exports = router;