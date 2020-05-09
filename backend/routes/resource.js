const express = require('express');

const isInstructor  = require('../middleware/isInstructor')
const isAuth        = require('../middleware/isAuth')

const router = express.Router();

const GCSUploader = require('../helpers/GCS-Uploader')
const resourceController = require('../controllers/resource')

router.post('/upload/:courseID', isAuth, isInstructor, GCSUploader.single('file'))

router.post('/download/:id', isAuth, resourceController.downloadResource)
router.delete('/delete/:id', isAuth, isInstructor, resourceController.deleteResource)

module.exports = router;