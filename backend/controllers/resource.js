const resourceModel = require('../models/resource')
const userController= require('../controllers/user')
const gcsHandler    = require('../helpers/GCS-Handler')

module.exports.addResourceToDB= (req,res,next)=>{
    const courseID      = req.params.courseID
    const instructorID  = req.user_id
    const filename      = req.filename
    const gcs_id        = req.gcs_id

    resourceModel.addResource(courseID,instructorID,filename,gcs_id,(err,id)=>{
        if(err){
            gcsHandler.deleteFile(gcs_id);
            return res.status(500).json({message:err})
        }
        return res.status(201).json({message:'Resource added to course',resource_id:id})
    })
}

module.exports.checkCourse = (req,res,next)=>{

    const courseID = req.params.courseID
    const userID   = req.user_id
    const role     = req.user_role

    userController.doesHaveCourse(req,courseID,userID,role)
    .then(success=>{
        next();
    })
    .catch(err=>{
        return res.status(403).json({message:'Permission denied'})
    })
}


module.exports.getResource = (req,res,next)=>{
    const resourceID = req.params.id
    resourceModel.getResource(resourceID,(err, resource)=>{
        if(err){return res.status(404).json({message:'Resource not found'})}
        const gcs_id    = resource.gcs_id
        const filename  = resource.file_name
        gcsHandler.generateSignedURL(gcs_id, filename)
        .then(url=>{
        res.redirect(url)
        })
    })
}

module.exports.validateUser = (req,res,next)=>{
    const resourceID    = req.params.id
    const userID        = req.user_id
    const role          = req.user_role

    resourceModel.getResource(resourceID,(err, resource)=>{
        if(err){return res.status(404).json({message:'The resource not found'})}

        const courseID = resource.course_id

        userController.doesHaveCourse(req,courseID,userID,role)
        .then(success=>{
            next()
        })
        .catch(err=>{
            return res.status(403).json({message:'Permission denied'})
        })
    })
}

module.exports.deleteResource = (req,res,next)=>{
    const resourceID = req.params.id
    resourceModel.getResource(resourceID,(err, resource)=>{
        if(err){return res.status(404).json({message:'The resource not found'})}
        const gcs_id = resource.gcs_id
        gcsHandler.deleteFile(gcs_id)
        .then(success=>{
            resourceModel.deleteResource(resourceID,()=>{})
            return res.status(200).json({message:'File deleted succesfully'})
        })
        .catch(err=>{
            resourceModel.deleteResource(resourceID,()=>{})
            return res.status(500).json({message:'Deletion failed'})
        })
    })
}