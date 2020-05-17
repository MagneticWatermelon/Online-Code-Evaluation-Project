const jwt = require('jsonwebtoken')


module.exports = (req,res,next)=>{
    
    role = req.user_role

    if(role==1 || role==2){next()}
    else{
        return res.status(403).json({message:'Permission denied'})
    }
} 