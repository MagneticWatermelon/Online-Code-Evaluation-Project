const {Storage} = require('@google-cloud/storage')

const storage = new Storage({
    projectId:'wired-height-276615',
    keyFilename:'./wired-height-276615-c511781c0400.json'
})

const uploadFile = async (filename, readStream)=>{
    
    readStream.pipe(storage.bucket('oncoev_resources').file(filename).createWriteStream({
        resumable:false,
        gzip:true
    }))
}

module.exports.uploadFile = uploadFile;