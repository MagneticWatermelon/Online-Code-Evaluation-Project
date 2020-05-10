const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const resourceSchema = new Schema({
    course_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true},
    instructor_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    file_name:  {type:String, required:true},
    gcs_id:{type:String, required:true},
}, {
    timestamps: true,
});

const Resource = mongoose.model('Resource', resourceSchema);


/* Following function creates a new resource and returns the id
    of the created resource
    example callback call => callback(err, resource_id)
*/
const addResource   = (course_id, instructor_id, file_name, gcs_id, callback)=>{
 let res_obj = new Resource({
        course_id: course_id,
        instructor_id: instructor_id,
        file_name: file_name,
        gcs_id:gcs_id
 }).validate().then(value=>{
    res_obj.save()
    .then((value)=>{return callback(null);})
    .catch((err)=> {return callback("Saving resources problem to DB")});
}
).catch(
    callback("Validation Error!!!!")
);
}

/* Following function deletes the resource
    example callback call => callback(err)
 */
const deleteResource = (resource_id, callback)=>{
    Resource.findById(resource_id).then(res_obj=>{
        if(!res_obj) return callback("ResourceID is not valid ");
        Resource.findByIdAndDelete(res_obj,(err)=>{if(err)return callback("Delete Problem in DB")});
        return  callback(null);}
    ).catch(
        err=>{
            return callback(err);
        }
    );
}


/* Following function returns the resource
    example callback call => callback(err, resource)
 */
const getResource   = (resource_id,callback)=>{
    Resource.findById(resource_id)
    .then(
        res_obj=>{
           if(!res_obj) return callback("ResourceID is not valid ",null);
           return callback(null,res_obj);
        }
    ).catch((err)=>{
        return  callback(err,null);
    }
      
    );
}

/* Following function changes the filename
    example callback call => callback(err)
 */
const setFilename = (resource_id, file_name, callback)=>{
    Resource.findById(resource_id)
    .then(
        res_obj=>{
           if(!res_obj) return callback("ResourceID is not valid ");
           Resource.findByIdAndUpdate(resource_id,{$set:{
               file_name:file_name,
           },
       },(err)=>{if(err) return callback("Update problem to DB")});
       return callback(null);   
        }
    ).catch(
       err=>{
           return callback(err);
       }
   );
}

module.exports.model = Resource;

module.exports.addResource = addResource;
module.exports.deleteResource = deleteResource;
module.exports.getResource = getResource;
module.exports.setFilename = setFilename;
