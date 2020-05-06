const jwt = require('jsonwebtoken')


module.exports = (req,res,next)=>{
    
    const header = req.get('Authorization');

    if(!header){
        return res.status(403).json({message:'cannot read header'})
    }
    const token = header.split(' ')[1]

    let decodedToken;

    try{
        decodedToken = jwt.verify(token, 'dwightgetthedoor')
    }
    catch(e){
        return res.status(403).json({message:'Don\'t have permission'})
    }

    if(!decodedToken){return res.status(403).json({message:'Don\'t have permission'})}

    user_role = decodedToken.user_role

    if(user_role==2){
        next()
    }
    else{
        res.status(403).json({message:'Don\'t have permission'})
    }
}