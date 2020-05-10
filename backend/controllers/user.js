const userModel         = require('../models/user')
const assignmentModel   = require('../models/assignment')
const questionModel     = require('../models/question')


module.exports.createUser = (req,res,next)=>{
    let {name,mail,role,password} = req.body

    userModel.addUser(name,mail,role,password, (err)=>{
        if(err){return res.status(500).json({message:err})}
        return res.status(201).json({message:'User created'})
    })
}


module.exports.deleteUser = (req,res,next)=>{
    const userid = req.params.id
    userModel.deleteUser(userid,(err)=>{
        if(err){return res.status(500).json({message:err})}
        return res.status(200).json({message:'User succesfully deleted'})
    })
}

module.exports.getUser = (req,res,next)=>{
    const userid = req.params.id
    userModel.getUser(userid, (err, user)=>{
        if(err){return res.status(500).json({message:err})}
        return res.status(200).json(user)
    })
}

module.exports.updatePassword = (req,res,next)=>{
    const givenID = req.params.id
    let {mail, old_password, new_password} = req.body
    
    userModel.checkUser(mail, old_password,(err,user_id)=>{
        if(!err && user_id){
            userModel.updatePassword(givenID, new_password,(err)=>{
                if(err){return res.status(500).json({message:'Cannot update password'})}
                return res.status(200).json({message:'Password updated succesfully'})
            })
        }
    })
}

module.exports.addProfilePhoto = (req,res,next)=>{
    const givenID   = req.params.id
    const image_uri = req.body.image_uri
    userModel.addProfilePhoto(givenID,image_uri,(err)=>{
        if(err){return res.status(500).json({message:'Cannot update image'})}
        return res.status(200).json({message:'Image updated succesfully'})
    })
}

module.exports.getCourses = (req,res,next)=>{

    const givenID   = req.params.id

    userModel.getUser(givenID,(err, user)=>{
        if(err){return res.status(500).json({message:err})}
        
        const role      = user.user_role

        const getCourses = role==1 ? userModel.getGivenCourses : userModel.getTakenCourses;
        
        getCourses(userid, (err, course_ids)=>{
            if(err){return res.status(500).json({message:'Cannot get courses of the user'})}
    
            return res.status(200).json({courses:course_ids})
        })
    })
}


module.exports.getNotifications = (req,res,next)=>{
    const givenID   = req.params.id
    userModel.getNotifications(givenID,(err, noitifications)=>{
        if(err){return res.status(500).json({message:'Inernal server error'})}
        return res.status(200).json(noitifications)
    })
}


module.exports.checkUser = (req,res,next)=>{
    const givenID = req.params.id
    const userID  = req.user_id
    const role    = req.user_role

    if(givenID==userID || role==2){
        next()
    }
    else{
        return res.status(403).json({message:'Permission denied'})
    }
}

module.exports.doesHaveCourse = (course_id, userid, role)=>{
    return new Promise((resolve,reject)=>{

        if(role==2){return resolve(true)}
        
        else if(role==1 || role==0){

            const getCoursesOfUser = (role==1) ? userModel.getGivenCourses : userModel.getTakenCourses;
            
            getCoursesOfUser(userid, (err, courses)=>{
                if(err){return reject(false)}
                if(courses.map(a => a.course_id.toString()).includes(course_id.toString())){return resolve(true)}
                return reject(false);
            })
        }

        else{return reject(false)}
        
    })
}

module.exports.doesHaveAssignment = (assignmentID, userid, role)=>{
    return new Promise((resolve,reject)=>{
        
        assignmentModel.getAssignment(assignmentID, (err, assignment)=>{
            if(err){return reject(false)}

            const course = assignment.course_id

            this.doesHaveCourse(course, userid, role)
            .then(success=>{return resolve(true)})
            .catch(err=>{return reject(false)})
        })
        
    })
}

module.exports.doesHaveQuestion = (questionID, userid, role)=>{
    return new Promise((resolve, reject)=>{
        questionModel.getQuestion(questionID, (err, question)=>{
            if(err){return reject(false)}

            const assignment = question.assignment_id

            this.doesHaveAssignment(assignment, userid, role)
            .then(success => {return resolve(true)})
            .catch(err=>{return reject(false)})
        })
    })
}