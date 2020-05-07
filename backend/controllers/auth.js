const user = require('../models/user');
const jwt   = require('jsonwebtoken')

module.exports.loginUser = (req,res,next)=>{
    const mail      = req.body.mail;
    const password  = req.body.password;
  
    user.checkUser(mail, password, (err, user_id)=>{
        if(err){
            return res.status(401).json({message:'Authentication failed'})
        }
        
        user.getUser(user_id, (err, user_information)=>{
            if(err){
                return res.status(401).json({message:'Authentication failed'})
            }

            const user_role = user_information.user_role;
            const user_mail = user_information.mail;

            const token = jwt.sign(
                {mail: user_mail, user_role:user_role, user_id:user_id},
                'dwightgetthedoor',
                {expiresIn:'30d'}
            )
    
            return res.status(200).json({
                token       : token,
                user_id     : user_id,
                user_role   : user_role
            })
        })
    })
}