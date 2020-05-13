const announcementModel = require('../models/announcement')
const userController    = require('../controllers/user')

module.exports.createAnnouncement = (req,res,next)=>{
    const instructorID  = req.user_id
    const courseID      = req.params.courseID
    const title         = req.body.title
    const explanation   = req.body.explanation

    announcementModel.createAnnouncement(instructorID,courseID,title,explanation,(err, announcementID)=>{
        if(err){return res.status(500).json({message:err})}
        return res.status(201).json({message:'Announcement created',id:announcementID})
    })

}

module.exports.getAnnouncement = (req,res,next)=>{
    const announcementID = req.params.id

    announcementModel.getAnnouncement(announcementID,(err, announcement)=>{
        if(err){return res.status(404).json({message:err})}
        return res.status(200).json(announcement)
    })
}

module.exports.deleteAnnouncement = (req,res,next)=>{
    const announcementID = req.params.id

    announcementModel.deleteAnnouncement(announcementID,(err)=>{
        if(err){return res.status(500).json({message:err})}
        return res.status(200).json({message:'Announcement deleted'})
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

module.exports.validateUser = (req,res,next)=>{
    const announcementID = req.params.id
    const userID        = req.user_id
    const role           = req.user_role

    announcementModel.getAnnouncement(announcementID,(err, announcement)=>{
        if(err){return res.status(404).json({message:'Internal server error'})}

        const courseID = announcement.course_id

        userController.doesHaveCourse(req,courseID,userID,role)
        .then(success=>{
            next()
        })
        .catch(err=>{
            return res.status(403).json({message:'Permission denied'})
        })
    })
}

module.exports.updateAnnouncement = (req,res,next)=>{
    const announcementID = req.params.id
    const title          = req.body.title
    const explanation    = req.body.explanation

    announcementModel.updateAnnouncement(announcementID,title,explanation,(err)=>{
        if(err){return res.status(500).json({message:err})}
        return res.status(200).json({message:'Announcement updated succesfully'})
    })
}

module.exports.getComments = (req,res,next)=>{
    const announcementID = req.params.id

    announcementModel.getComments(announcementID,(err, comments)=>{
        if(err){return res.status(404).json({message:err})}
        return res.status(200).json(comments)
    })
}