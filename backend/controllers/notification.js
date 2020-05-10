const notificationModel = require('../models/notification')
const userController    = require('../controllers/user')

module.exports.createNotification = (req,res,next)=>{
    let {studentID, assignmentID}   = req.params 
    let {title, explanation}        = req.body

    notificationModel.createNotification(studentID,assignmentID,title,explanation,(err,id)=>{
        if(err){return res.status(500).json({message:err})}
        return res.status(201).json({message:'Notification created', id:id})
    })
}

module.exports.getNotification = (req,res,next)=>{
    const notificationID = req.params.id
    notificationModel.getNotification(notificationID,(err,notification)=>{
        if(err){return res.status(500).json({message:err})}
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

    notificationModel.getNotification(notificationID,(err, notification)=>{
        if(err){return res.status(500).json({message:err})}
        if(notification.student_id == userID){
            next()
        }
        else{
            return res.status(403).json({message:'Permission denied'})
        }
    })
}

module.exports.checkAssignment = (req,res,next)=>{
    const userID        = req.user_id
    const assignmentID  = req.params.assignmentID

    userController.doesHaveAssignment(assignmentID,userID)
    .then(success=>{
        next()
    })
    .catch(err=>{
        return res.status(403).json({message:'Permission denied'})
    })
}

module.exports.automaticNotification = (studentID, assignmentID, title, explanation)=>{
    notificationModel.createNotification(studentID,assignmentID,title,explanation,(err,id)=>{})
}


module.exports.sendGradeUpdated = (studentID,submissionID)=>{
    
}

module.exports.sendAssignmentCreated = (assignmentID)=>{


}

module.exports.sendAssignmentGraded = (studentID, assignmentID)=>{


}

module.exports.sendAddedToCourse    = (studentID, courseID)=>{


}