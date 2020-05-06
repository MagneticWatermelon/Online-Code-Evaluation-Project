const course = require('../models/course')
const user   = require('../models/user')

module.exports.createCourse = (req, res, next)=>{

    const course_code   = req.body.course_code;
    const course_name   = req.body.course_name;
    const instructor_id = req.body.instructor_id;
    const term          = req.body.term;
    const year          = req.body.year;

    course.createCourse(course_code,year,term,course_name, (err,course_id)=>{
        if(err){
            return res.status(500).json({message:err})
        }
        course.associateInstructorWithCourse(course_id, instructor_id, (err)=>{
            if(err){return res.status(500).json({message:err})}

            return res.status(201).json({
                                            message:'Course succesfully created',
                                            course_id:course_id,
                                        })
        })
    })
}

module.exports.getCourse = (req,res,next)=>{

    let courseID = req.params.id
    let role = req.user_role;
    let personID = req.user_id;

    console.log(courseID)

    if(role=='admin'){
        course.getCourse(courseID, (err,course)=>{
            if(err){
                return res.status(404).json({message:err})
            }
            return res.status(200).json(course)
        })
    }

    if(role=='instructor'){

        user.getGivenCourses(personID,(err, courses)=>{
            
            if(err){return res.status(403).json({message:err})}
            
            if(courses.includes(courseID)){
                course.getCourse(courseID, (err,course)=>{
                    if(err){
                        return res.status(404).json({message:'Don\'t have permission'})
                    }
                    return res.status(200).json(course)
                })
            }
        })
    }

    if(role=='student'){
        user.getTakenCourses(personID,(err, courses)=>{
            console.log(courses)
            if(err){return res.status(403).json({message:err})}
            
            if(courses.includes(courseID)){
                course.getCourse(courseID, (err,course)=>{
                    if(err){
                        return res.status(404).json({message:'Don\'t have permission'})
                    }
                    return res.status(200).json(course)
                })
            }
        })
    }

    return res.status(404).json({message:'Don\'t have permission'});
}

module.exports.updateCourse = (req, res, next)=>{

}

module.exports.deleteCourse = (req, res, next)=>{

}

module.exports.addStudent = (req, res, next)=>{

}

module.exports.dropStudent = (req,res,next)=>{

}


module.exports.addInstructor = (req, res, next)=>{

}

module.exports.dropInstructor = (req,res,next)=>{

}

module.exports.getAssignments = (req,res,next)=>{

}

module.exports.getStudents = (req,res,next)=>{

}

module.exports.getInstructors = (req,res,next)=>{

}