const resourceModel = require('../models/resource')

module.exports.addResourceToDB= (req,res,next)=>{
    const courseID = req.params.courseID
    const userID   = req.user_id
    const role     = req.user_role

    req.filename   = 'assalkdjlhbj'
}

module.exports.uploadResource = ()=>{}

module.exports.downloadResource = (req,res,next)=>{

}

module.exports.deleteResource = (req,res,next)=>{

}