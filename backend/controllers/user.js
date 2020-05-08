const user = require('../models/user')


module.exports.createUser = (req,res,next)=>{
    const name = req.body.name
    const mail = req.body.mail
    const role = req.body.role
    const password = req.body.password

    user.addUser(name,mail,role,password, (err)=>{
        if(err){
            return res.status(500).json({message:err})
        }

        return res.status(201).json({message:'User created'})
    })
}


module.exports.deleteUser = (req,res,next)=>{

}


module.exports.updateUser = (req,res,next)=>{

}

module.exports.getUser = (req,res,next)=>{

}