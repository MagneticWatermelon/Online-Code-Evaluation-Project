const notificationModel = require('../models/notification')
const submissionModel   = require('../models/submission')
const questionModel     = require('../models/question')
const assignmentModel   = require('../models/assignment')
const courseModel       = require('../models/course')

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

module.exports.sendNotification = async (assignmentID, title, explanation, detail, ...receipents)=>{
    assignmentModel.model
    .findById(assignmentID)
    .select({course_id:1})
    .then(assignment=>{
        if(!assignment){return}
        courseModel.model
        .findById(assignment.course_id)
        .select({course_code:1})
        .then(course=>{
            if(!course){return}
            const courseCode = course.course_code
            receipents.forEach(user_id=>{
                notificationModel.createNotification(
                    user_id,
                    assignmentID,
                    courseCode,
                    title,
                    explanation,
                    detail,
                    (err,id)=>{})
            })
        })
        .catch(err=>{console.log(err)})
    })
    .catch(err=>{console.log(err)})
}

module.exports.sendGradeUpdated = async (submissionID)=>{
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
                        `${assignment.title}`,
                        `${grade}`,
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

module.exports.sendAssignmentCreated = async (assignmentID)=>{
    assignmentModel.getAssignment(assignmentID,(err,assignment)=>{
        if(err){return;}
        courseModel.getStudents(assignment.course_id,(err, students)=>{
            if(err){return;}
            let receipents = students.map(s=>s.student_id)
            this.sendNotification(
                assignmentID,
                'Assignment Created',
                `${assignment.title}`,
                ``,
                ...receipents)
        })
    })
}