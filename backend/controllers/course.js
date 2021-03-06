const courseModel               = require('../models/course')
const userController            = require('../controllers/user')
const notificationController    = require('../controllers/notification')

module.exports.createCourse = (req, res, next)=>{

    let {course_code, course_name, instructor_id, term, year} = req.body

    courseModel.createCourse(course_code,year,term,course_name, (err,course_id)=>{
        if(err){return res.status(500).json({message:err})}
        courseModel.addPeople(course_id,[instructor_id],(err)=>{
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

module.exports.getAllCourses = (req,res,next)=>{
    courseModel.getAllCourses((err, courses)=>{
        if(err){return res.status(404).json({message:err})}
        res.status(200).json(courses)
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

module.exports.deleteAll = (req,res,next)=>{
    let courses = req.body.courses

    for(course of courses){
        courseModel.deleteCourse(course,(err)=>{
            if(err){console.log(err)}
        })
    }
    return res.status(200).json({message:'Operation successfull'})
}

module.exports.addPeople = (req, res, next)=>{
    let courseID = req.params.courseID;
    let people   = req.body.people;

    console.log(people)
    
    courseModel.addPeople(courseID,people,(err)=>{
        if(err){return res.status(404).json({message:err})}
        return res.status(200).json({message:'People added to course'})
    })
}

module.exports.dropPeople = (req,res,next)=>{
    let courseID = req.params.courseID;
    let people   = req.body.people;

    courseModel.dropPeople(courseID,people,(err)=>{
        if(err){return res.status(404).json({message:err})}
        return res.status(200).json({message:'People dropped from course'})
    })
}

module.exports.getAssignments = (req,res,next)=>{
    let courseID    = req.params.id
    
    courseModel.getAssignments(courseID,(err,assignments)=>{
        if(err){return res.status(500).json({message:err})}
        return res.status(200).json(assignments)
    })
}

module.exports.getAssignmentsWithGrades = (req,res,next)=>{
    let courseID    = req.params.id
    let studentID   = req.params.studentID
    
    courseModel.getAssignmentsWithGrades(courseID,studentID,(err,assignments)=>{
        if(err){return res.status(404).json({message:err})}
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
    courseModel.getAverageGrade(studentID,courseID,(err,grade)=>{
        if(err){return res.status(404).json({message:err})}
        return res.status(200).json({grade:grade})
    })
}