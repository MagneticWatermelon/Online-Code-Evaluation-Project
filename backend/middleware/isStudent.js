const jwt = require('jsonwebtoken')


module.exports = (req,res,next)=>{

    const header = req.get('Authorization');

    if(!header){
        return res.status(403).json({message:'Cannot read Request Header'})
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

    if(user_role==0 || user_role==1){
        next()
    }
    else{
        res.status(403).json({message:'Authentication Required'})
    }
}   