const mongoose = require('mongoose')


module.exports.connectToDB = (callback)=>{
    mongoose.connect(process.env.ATLAS_URI)
    .then(result=>{
        callback(result)
    })
    .catch(err=>{
        console.log(err)
    })
}
