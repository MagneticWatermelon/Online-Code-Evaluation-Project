const assignmentModel       = require('../models/assignment')
const userController        = require('../controllers/user')
const notificationConroller = require('../controllers/notification')


module.exports.createAssignment = (req,res,next)=>{

    let {instructor_id,title,release_date,due_date,explanation,weight} = req.body
    const courseID  = req.params.courseID

    assignmentModel.createAssignment(courseID,instructor_id,title,release_date,due_date,explanation,weight, (err, id)=>{
        if(err){return res.status(500).json({message:err})}
        notificationConroller.sendAssignmentCreated(id)
        return res.status(201).json({message:'Assignement Created Succesfully',assignment_id:id})
    })
}

module.exports.checkCourse = (req,res,next)=>{
    const userID   = req.user_id
    const courseID = req.params.courseID
    const role     = req.user_role

    userController.doesHaveCourse(req,courseID,userID,role)
    .then(success=>{
        next()
    })
    .catch(err=>{
        return res.status(403).json({message:'Permission denied'})
    })
}

module.exports.validateUser = (req,re,next)=>{
    const assignmentID  = req.params.id
    const userID        = req.user_id
    const role          = req.user_role
    
    userController.doesHaveAssignment(req,assignmentID, userID, role)
    .then(success=>{next()})
    .catch(err=>{
        return res.status(403).json({message:'Permission Denied'})
    })
}

module.exports.getAssignment = (req,res,next)=>{
    if(req.assignment){return res.status(200).json(req.assignment)}
    return res.status(404).json({message:'Assignment not found'})
}

module.exports.updateAssignment = (req,res,next)=>{
    let {title,release_date,due_date,explanation,weight} = req.body
    const assignmentID = req.params.id

    assignmentModel.updateAssignment(assignmentID, title, release_date, due_date, explanation, weight,(err)=>{
        if(err){return res.status(500).json({message:err})}
        return res.status(201).json({message:'Assignment updated successfully'})
    })
}

module.exports.deleteAssignment = (req,res,next)=>{
    const assignmentID = req.params.id
    
    assignmentModel.deleteAssignment(assignmentID, (err)=>{
        if(err){return res.status(500).json({message:'Cannot delete assignment'})}
        return res.status(201).json({message:'Assignment deleted successfully'})
    })
}

module.exports.getQuestions = (req,res,next)=>{
    const assignmentID = req.params.id
    
    assignmentModel.getQuestions(assignmentID,(err,questions)=>{
        if(err){return res.status(500).json({message:err})}
        return res.status(200).json(questions)
    })
}

module.exports.getSubmissionChecks = (req,res,next)=>{
    const assignmentID = req.params.id
    const studentID    = req.params.studentID
    assignmentModel.getSubmissionChecks(assignmentID,studentID,(err,checks)=>{
        if(err){return res.status(404).json({message:err})}
        return res.status(200).json(checks)
    })
}

module.exports.getGrade = (req,res,next)=>{
    const assignmentID  = req.params.id
    const studentID     = req.params.studentID
    assignmentModel.getGrade(studentID,assignmentID,(err,grade)=>{
        if(err){return res.status(404).json({message:err})}
        return res.status(200).json({grade:grade})
    })
}