const jwt = require('jsonwebtoken')


module.exports = (req,res,next)=>{

    const header = req.get('Authorization');

    if(!header){
        return res.status(403).json({message:'Cannot Read Request Header'})
    }
    const token = header.split(' ')[1]

    let decodedToken;

    try{
        decodedToken = jwt.verify(token, 'dwightgetthedoor')
    }
    catch(e){
        return res.status(403).json({message:'Authentication Required'})
    }

    if(!decodedToken){return res.status(403).json({message:'Authentication Required'})}

    user_role = decodedToken.user_role
    user_id   = decodedToken.user_id

    req.user_role = user_role;
    req.user_id   = user_id;
    next();
}