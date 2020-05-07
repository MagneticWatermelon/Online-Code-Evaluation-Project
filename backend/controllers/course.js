const courseModel = require('../models/course')
const userController = require('../controllers/user')

module.exports.createCourse = (req, res, next)=>{

    const course_code   = req.body.course_code;
    const course_name   = req.body.course_name;
    const instructor_id = req.body.instructor_id;
    const term          = req.body.term;
    const year          = req.body.year;

    courseModel.createCourse(course_code,year,term,course_name, (err,course_id)=>{
        if(err){
            return res.status(500).json({message:err})
        }
        courseModel.associateInstructorWithCourse(course_id, instructor_id, (err)=>{
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

    if (role==0 || role==1 || role==2){
        userController.doesHaveCourse(courseID, personID, user_role)
        .then(success=>{
             courseModel.getCourse(courseID, (err, course)=>{
                if(err){
                    return res.status(403).json({message:'Don\'t have permission'})
                }
                return res.status(200).json(course)
             })
        })
        .catch(err=>{
            return res.status(403).json({message:'Don\'t have permission'})
        })
    }

    else{
        return res.status(401).json({message:'Authentication required'})
    }
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