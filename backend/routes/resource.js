const express = require('express');

const isInstructor  = require('../middleware/isInstructor')
const isAuth        = require('../middleware/isAuth')

const router = express.Router();

const GCSUploader = require('../helpers/GCS-Uploader')
const resourceController = require('../controllers/resource')

router.post(
    '/upload/:courseID',
    isAuth,
    isInstructor,
    resourceController.checkCourse,
    GCSUploader.single('file'),
    resourceController.addResourceToDB)

router.get(
    '/get/:id',
    isAuth,
    resourceController.validateUser,
    resourceController.getResource)

router.delete(
    '/delete/:id',
    isAuth,
    isInstructor,
    resourceController.validateUser,
    resourceController.deleteResource)

module.exports = router;