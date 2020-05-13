const courseModel               = require('../models/course')
const userController            = require('../controllers/user')
const notificationController    = require('../controllers/notification')

module.exports.createCourse = (req, res, next)=>{

    let {code, name, instructor, term, year} = req.body

    courseModel.createCourse(code,year,term,name, (err,course_id)=>{
        if(err){return res.status(500).json({message:err})}
        courseModel.addInstructorToCourse(course_id, instructor, (err)=>{
            if(err){return res.status(500).json({message:err})}

            return res.status(201).json({
                                            message:'Course succesfully created',
                                            course_id:course_id,
                                        })
        })
    })
}

module.exports.getCourse = (req,res,next)=>{
    const courseID  = req.params.id
    
    courseModel.getCourse(courseID, (err, course)=>{
        if(err){return res.status(500).json({message:err})}
        return res.status(200).json(course)
    })
}

module.exports.updateCourse = (req, res, next)=>{

    let {code, name, term, year} = req.body
    let courseID = req.params.id

    courseModel.updateCourse(courseID,name,code,term,year,(err)=>{
        if(err){return res.status(500).json({message:err})}
        return res.status(200).json({message:'Update operation successfull'})
    })
}

module.exports.deleteCourse = (req, res, next)=>{
    let courseID = req.params.id
    courseModel.deleteCourse(courseID,(err)=>{
        if(err){return res.status(500).json({message:err})}
        return res.status(200).json({message:'Course deleted'})
    })
}

module.exports.addStudent = (req, res, next)=>{
    let {courseID,studentID} = req.params
    courseModel.addStudentToCourse(courseID,studentID,(err)=>{
        if(err){return res.status(500).json({message:err})}
        notificationController.sendAddedToCourse(studentID,courseID)
        return res.status(200).json({message:'Student added to course'})
    })
}

module.exports.dropStudent = (req,res,next)=>{
    let {courseID,studentID} = req.params
    courseModel.dropStudentFromCourse(courseID,studentID,(err)=>{
        if(err){return res.status(500).json({message:err})}
        return res.status(200).json({message:'Student droped from course'})
    })
}


module.exports.addInstructor = (req, res, next)=>{
    let {courseID,instructorID} = req.params
    courseModel.addInstructorToCourse(courseID,instructorID,(err)=>{
        if(err){return res.status(500).json({message:err})}
        return res.status(200).json({message:'Instructor added to course'})
    })
}

module.exports.dropInstructor = (req,res,next)=>{
    let {courseID,instructorID} = req.params
    courseModel.dropInstructorFromCourse(courseID,instructorID,(err)=>{
        if(err){return res.status(500).json({message:err})}
        return res.status(200).json({message:'Instructor droped from course'})
    })
}

module.exports.getAssignments = (req,res,next)=>{
    let courseID    = req.params.id
    
    courseModel.getAssignments(courseID,(err,assignments)=>{
        if(err){return res.status(500).json({message:err})}
        return res.status(200).json(assignments)
    })
}

module.exports.getStudents = (req,res,next)=>{
    let courseID    = req.params.id
    courseModel.getStudents(courseID,(err,students)=>{
        if(err){return res.status(500).json({message:err})}
        return res.status(200).json(students)
    })
}

module.exports.getInstructors = (req,res,next)=>{
    let courseID    = req.params.id
    
    courseModel.getInstructors(courseID,(err,instructors)=>{
        if(err){return res.status(500).json({message:err})}
        return res.status(200).json(instructors)
    })
}

module.exports.checkCourse = (req,res,next)=>{
    let courseID    = req.params.id
    let userID      = req.user_id
    let role        = req.user_role
    userController.doesHaveCourse(req,courseID,userID,role)
    .then(success=>{
        next()
    })  
    .catch(err=>{
        return res.status(403).json({message:'Permission denied'})
    })
}


module.exports.getAnnouncements = (req,res,next)=>{
    let courseID    = req.params.id

    courseModel.getAnnouncements(courseID,(err, announcements)=>{
        if(err){return res.status(500).json({message:err})}
        return res.status(200).json(announcements)
    })
}

module.exports.getResources = (req,res,next)=>{
    let courseID    = req.params.id
    courseModel.getResources(courseID,(err, resources)=>{
        if(err){return res.status(404).json({message:err})}
        return res.status(200).json(resources)
    })
}

module.exports.getGrade = (req,res,next)=>{
    const courseID  = req.params.id
    const studentID = req.params.studentID
}