const {Storage} = require('@google-cloud/storage')

const multer    = require('multer')
const shortid   = require('shortid')

const GCS_STORAGE = new Storage({
    projectId   :   process.env.GCS_PROJECT_ID,
    keyFilename :   process.env.GCS_KEY_FILE
})

const Bucket = GCS_STORAGE.bucket(process.env.GCS_DEFAULT_BUCKET)


async function _uploadFile (req, file, callback){

    const gcs_file_id = shortid.generate() 
    
    const createdFile = Bucket.file(gcs_file_id)

    let writeStream = createdFile.createWriteStream({
        resumable   :false,
        gzip        :true
    })

    file.stream.pipe(writeStream)

    writeStream.on('finish',()=>{
        createdFile.makePublic();
        req.filename    = file.originalname
        req.gcs_id      = gcs_file_id
        callback(null)
    })
    
    writeStream.on('error',(err)=>{
        createdFile.delete()
        req.filename    = file.originalname
        req.gcs_id      = gcs_file_id
        callback(err)
    })
}

async function _removeFile(req,file,callback){
    
}

function StorageEngine(){}

StorageEngine.prototype._handleFile = _uploadFile;

StorageEngine.prototype._removeFile = _removeFile;

module.exports = multer({
    storage: new StorageEngine(),
    limits:{fileSize: 16*1024*1024}
});