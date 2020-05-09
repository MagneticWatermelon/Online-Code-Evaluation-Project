const resourceModel = require('../models/resource')
const userController= require('../controllers/user')
const gcsHandler    = require('../helpers/GCS-Handler')

module.exports.addResourceToDB= (req,res,next)=>{
    const courseID      = req.params.courseID
    const instructorID  = req.user_id
    const filename      = req.filename
    const gcs_id        = req.gcs_id

    resourceModel.addResource(courseID,instructorID,filename,gcs_id,(err)=>{
        if(err){
            gcsHandler.deleteFile(gcs_id);
            return res.status(500).json({message:'Cannot add resource'})
        }

        return res.status(201).json({message:'Resource added o course'})
    })
}

module.exports.checkCourse = (req,res,next)=>{

    const courseID = req.params.courseID
    const userID   = req.user_id
    const role     = req.user_role

    userController.doesHaveCourse(courseID,userID,role)
    .then(success=>{
        next();
    })
    .catch(err=>{
        return res.status(403).json({message:'Permission denied'})
    })
}


module.exports.getResource = (req,res,next)=>{

    const gcs_id    = 'FVL0NMLyH' // resourceModel.getResource().gcs_id
    const filename  = 'test.txt'  // resourceModel.getResource().filename

    gcsHandler.generateSignedURL(gcs_id, filename)
    .then(url=>{
        res.redirect(url)
    })
    
}

module.exports.validateUser = (req,res,next)=>{
    /* get course id from resource id and check if the user has the course
     */
}

module.exports.deleteResource = (req,res,next)=>{
    
    const gcs_id    = 'FVL0NMLyH' // resourceModel.getResource().gcs_id
    
    gcsHandler.deleteFile(gcs_id)
    .then(success=>{
        return res.status(200).json({message:'File deleted succesfully'})
    })
    .catch(err=>{
        return res.status(500).json({message:'Deletion failed'})
    })
}