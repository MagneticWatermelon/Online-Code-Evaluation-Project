const assignmentModel = require('../models/assignment')
const userController  = require('../controllers/user')


module.exports.createAssignment = (req,res,next)=>{

    const course_id     = req.body.course_id
    const userid        = req.user_id
    const role          = req.user_role
    const instructor_id = req.body.instructor_id

    userController.doesHaveCourse(course_id,userid,role)
    .then(success=>{
        const title         = req.body.title
        const release_date  = req.body.release_date
        const due_date      = req.body.due_date
        const explanation   = req.body.explanation
        const weight        = req.body.weight

        assignmentModel.createAssignment(course_id,instructor_id,title,release_date,due_date,explanation,weight, (err)=>{
            if(err){return res.status(500).json({message:'Cannot create assignment'})}
            
            return res.status(201).json({message:'Assignement Created Succesfully'})
        })
    })
    .catch(err=>{
        return res.status(403).json({message:'Permission denied'})
    })
}

module.exports.getAssignment = (req,res,next)=>{

    const assignmentID = req.params.id
    const userid = req.user_id
    const role = req.user_role

    if(role==2 || role==1 || role==0){
        
        userController.doesHaveAssignment(assignmentID, userid, role)

        .then(success=>{
            assignmentModel.getAssignment(assignmentID,(err,assignment)=>{
                if(err){return res.status(500).json({message:'Internal server error'})}

                return res.status(200).json(assignment)
            })
        })
        .catch(err=>{
            return res.status(401).json({message:'Permission Denied'})
        })
    }   

    else{
        return res.status(401).json({message:'Permission Denied'})
    }

}

module.exports.updateAssignment = (req,res,next)=>{
    
    const assignmentID = req.params.id
    const userid = req.user_id
    const role = req.user_role

    userController.doesHaveAssignment(assignmentID, userid, role)
    .then(success=>{
        const title         = req.body.title
        const release_date  = req.body.release_date
        const due_date      = req.body.due_date
        const explanation   = req.body.explanation
        const weight        = req.body.weight

        assignmentModel.updateAssignment(assignmentID, title, release_date, due_date, explanation, weight,(err)=>{
            if(err){return res.status(500).json({message:'Cannot update assignment'})}
            return res.status(201).json({message:'Assignment updated successfully'})
        })
    })
    .catch(err=>{
        return res.status(403).json({message:'Permission denied'})
    })  
}

module.exports.deleteAssignment = (req,res,next)=>{
    const assignmentID = req.params.id
    const userid = req.user_id
    const role = req.user_role

    userController.doesHaveAssignment(assignmentID, userid, role)
    .then(success=>{
        
        assignmentModel.deleteAssignment(assignmentID, (err)=>{
            if(err){return res.status(500).json({message:'Cannot delete assignment'})}
            return res.status(201).json({message:'Assignment deleted successfully'})
        })
    })
    .catch(err=>{
        return res.status(403).json({message:'Permission denied'})
    })
}

module.exports.getQuestions = (req,res,next)=>{

}