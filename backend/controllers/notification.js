const notificationModel = require('../models/notification')
const submissionModel   = require('../models/submission')
const questionModel     = require('../models/question')
const assignmentModel   = require('../models/assignment')

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

module.exports.sendNotification = (assignmentID, title, explanation, ...receipents)=>{
    receipents.forEach(user_id=>{
        notificationModel.createNotification(user_id,assignmentID,title,explanation,(err,id)=>{
            console.log('notification created ' + id)
        })
    })
}

module.exports.sendGradeUpdated = (submissionID)=>{
    submissionModel.model
    .findById(submissionID)
    .select({question_id:1, student_id:1})
    .then(submission=>{
        const studentID = submission.student_id
        questionModel.model
        .findById(submission.question_id)
        .select({assignment_id:1})
        .then(question=>{
            assignmentModel.model
            .findById(question.assignment_id)
            .select({_id:1,title:1})
            .then(assignment=>{
                assignmentModel.getGrade(studentID,assignment._id,(err,grade)=>{
                    if(err){return;}
                    this.sendNotification(
                        assignment._id,
                        'Grade Changed',
                        `${assignment.title}\n${grade}`,
                        studentID)
                })
            })
            .catch(err=>{

            })
        })
        .catch(err=>{

        })
    })
    .catch(err=>{

    })
}

module.exports.sendAssignmentCreated = (assignmentID)=>{


}

module.exports.sendAssignmentGraded = (studentID, assignmentID)=>{


}

module.exports.sendAddedToCourse    = (studentID, courseID)=>{


}