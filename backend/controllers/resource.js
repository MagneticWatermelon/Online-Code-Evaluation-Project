const resourceModel = require('../models/resource')
const gcsHelper     = require('../helpers/gcs')
let Duplex = require('stream').Duplex; 

module.exports.uploadResource = (req,res,next)=>{

   let {originalname, mimetype, buffer, size} = req.file

   gcsHelper.uploadFile(originalname, bufferToStream(buffer))

}

module.exports.downloadResource = (req,res,next)=>{

}

module.exports.deleteResource = (req,res,next)=>{

}

function bufferToStream(buffer) {  
    let stream = new Duplex();
    stream.push(buffer);
    stream.push(null);
    return stream;
}