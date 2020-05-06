const user = require('../models/user')


module.exports.createUser = (req,res,next)=>{
    const name = req.body.name
    const mail = req.body.mail
    const role = req.body.role
    const password = req.body.password

    user.addUser(name,mail,role,password, (err)=>{

        if(err){return res.status(500).json({message:err})}

        return res.status(201).json({message:'User created'})
    })
}


module.exports.deleteUser = (req,res,next)=>{

    const userid = req.params.id

    user.deleteUser(userid,(err)=>{
        if(err){return res.status(500).json({message:err})}

        return res.status(200).json({message:'User succesfully deleted'})
    })
}

module.exports.getUser = (req,res,next)=>{
    const userid = req.params.id

    user.getUser(userid, (err, user)=>{
        if(err){return res.status(500).json({message:err})}

        return res.status(200).json(user)
    })

}

module.exports.updatePassword = (req,res,next)=>{
    const givenID   = req.params.id
    const userID    = req.user_id
    const role      = req.user_role

    if(givenID==userID || role==2){

        const mail = req.body.mail
        const old_password  = req.body.old_password
        const new_password  = req.body.new_password

        user.checkUser(mail, old_password,(err,user_id)=>{
            if(!err && user_id){
                user.updatePassword(givenID, new_password,(err)=>{
                    if(err){return res.status(500).json({message:'Cannot update password'})}

                    return res.status(200).json({message:'Password updated succesfully'})
                })
            }
        })
    }
    else{
        return res.status(401).json({message:'Permission denied'})
    }
}

module.exports.addProfilePhoto = (req,res,next)=>{
    const givenID   = req.params.id
    const userID    = req.user_id
    const role      = req.user_role

    if(givenID==userID || role==2){

        const image_uri = req.body.image_uri

        user.addProfilePhoto(givenID,image_uri,(err)=>{
            if(err){return res.status(500).json({message:'Cannot update image'})}

            return res.status(200).json({message:'Image updated succesfully'})
        })
    }
    else{
        return res.status(401).json({message:'Permission denied'})
    }
}

module.exports.getGivenCourses = (req,res,next)=>{

    const userid = req.params.id

    user.getGivenCourses(userid, (err, course_ids)=>{
        if(err){return res.status(500).json({message:'Cannot get courses of the user'})}

        return res.status(200).json({courses:course_ids})
    })

}

module.exports.getTakenCourses = (req,res,next)=>{

    const userid = req.params.id

    user.getTakenCourses(userid,(err, course_ids)=>{
        if(err){return res.status(500).json({message:'Cannot get courses of the user'})}

        return res.status(200).json({courses:course_ids})
    })
}