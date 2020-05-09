const {Storage} = require('@google-cloud/storage')

const multer        = require('multer')

const GCS_STORAGE = new Storage({
    projectId   :   process.env.GCS_PROJECT_ID,
    keyFilename :   process.env.GCS_KEY_FILE
})

const Bucket = GCS_STORAGE.bucket(process.env.GCS_DEFAULT_BUCKET)


function _uploadFile (req, file, callback){

    //const filename  = req.filename;
    
    let writeStream = Bucket.file('asdafafas').createWriteStream({
        resumable   :false,
        gzip        :true
    })

    file.stream.pipe(writeStream)
}

function _removeFile(req,file,callback){

}

function StorageEngine(){}

StorageEngine.prototype._handleFile = _uploadFile;

StorageEngine.prototype._removeFile = _removeFile;

module.exports = multer({
    storage: new StorageEngine(),
    limits:{fileSize: 16*1024*1024}
});