const notificationModel = require('../models/notification')

module.exports.getNotification = (req,res,next)=>{
    const notificationID = req.params.id
    notificationModel.getNotification(notificationID,(err,notification)=>{
        if(err){return res.status(404).json({message:err})}
        return res.status(200).json(notification)
    })
}

module.exports.deleteNotification = (req,res,next)=>{
    const notificationID = req.params.id
    notificationModel.deleteNotification(notificationID,(err)=>{
        if(err){return res.status(500).json({message:err})}
        return res.status(200).json({message:'Notification deleted'})
    })
}

module.exports.validateUser = (req,res,next)=>{
    const userID            = req.user_id
    const notificationID    = req.params.id
    const role              = req.user_role

    notificationModel.getNotification(notificationID,(err, notification)=>{
        if(err){return res.status(404).json({message:err})}
        if(notification.student_id == userID || role==2){
            next()
        }
        else{
            return res.status(403).json({message:'Permission denied'})
        }
    })
}

module.createNotification = (assignmentID, title, explanation, ...receipents)=>{

}

module.exports.sendGradeUpdated = (submissionID)=>{
    
}

module.exports.sendAssignmentCreated = (assignmentID)=>{


}

module.exports.sendAssignmentGraded = (studentID, assignmentID)=>{


}

module.exports.sendAddedToCourse    = (studentID, courseID)=>{


}