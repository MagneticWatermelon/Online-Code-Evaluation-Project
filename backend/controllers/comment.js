const commentModel           = require('../models/comment')
const announcementModel      = require('../models/announcement')
const userController         = require('../controllers/user')

module.exports.createComment = (req,res,next)=>{
    const userID        = req.user_id
    const announcementID = req.params.announcementID
    const comment        = req.body.comment

    commentModel.createComment(userID,announcementID,comment,(err)=>{
        if(err){return res.status(500).json({message:err})}
        return res.status(200).json({message:'Comment created'})
    })
}

module.exports.getComment = (req,res,next)=>{
    const commentID     = req.params.id

    commentModel.getComment(commentID,(err, comment)=>{
        if(err){return res.status(500).json({message:err})}
        return res.status(200).json(comment)
    })
}

module.exports.deleteComment = (req,res,next)=>{
    const commentID     = req.params.id

    commentModel.deleteComment(commentID,(err)=>{
        if(err){return res.status(500).json({message:err})}
        return res.status(200).json({message:'Comment deleted'})
    })
}

module.exports.updateComment = (req,res,next)=>{
    const commentID     = req.params.id
    const comment       = req.body.comment

    commentModel.updateComment(commentID,comment,()=>{
        if(err){return res.status(500).json({message:err})}
        return res.status(200).json({message:'Comment updated'})
    })
}

module.exports.validateUser = (req,res,next)=>{
    const commentID     = req.params.id
    const userID        = req.user_id
    const role          = req.user_role

    commentModel.getComment(commentID,(err, comment)=>{
        if(err){return res.status(500).json({message:'Internal server error'})}

        if(comment.user_id == userID || role == 2){
            next()
        }
        else{
            return res.status(403).json({message:'Permission denied'})
        }
        comment.user_id
    })
}

module.exports.validateReadPermission = (req, res, next)=>{
    const commentID     = req.params.id
    const userID        = req.user_id
    const role          = req.user_role

    commentModel.getComment(commentID,(err, comment)=>{
        if(err){return res.status(500).json({message:'Internal server error'})}

        const announcementID = comment.announcement_id

        announcementModel.getAnnouncement(announcementID,(err, announcement)=>{
            if(err){return res.status(500).json({message:'Internal server error'})}
    
            const courseID = announcement.course_id
    
            userController.doesHaveCourse(courseID,userID,role)
            .then(success=>{
                next()
            })
            .catch(err=>{
                return res.status(403).json({message:'Permission denied'})
            })
        })
        
    })
}

module.exports.checkAnnouncement = (req,res,next)=>{
    const announcementID = req.params.announcementID
    const userID         = req.user_id
    const role           = req.user_role

    announcementModel.getAnnouncement(announcementID,(err, announcement)=>{
        if(err){return res.status(500).json({message:err})}

        const courseID = announcement.course_id

        userController.doesHaveCourse(courseID,userID,role)
        .then(success=>{
            next()
        })
        .catch(err=>{
            return res.status(403).json({message:'Permission denied'})
        })
    })
}