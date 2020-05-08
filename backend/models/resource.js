const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const resourceSchema = new Schema({
    course_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true},
    instructor_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
}, {
    timestamps: true,
});

const Resource = mongoose.model('Resource', commentSchema);


/* Following function creates a new resource and returns the id
    of the created resource
    example callback call => callback(err, resource_id)
*/
const addResource   = (course_id,instructor_id,callback)=>{

}

/* Following function deletes the resource
    example callback call => callback(err)
 */
const deleteResource = (resource_id, callback)=>{

}


/* Following function returns the resource
    example callback call => callback(err, resource)
 */
const getResource   = (comment_id,callback)=>{

}

module.exports.model = Resource;

module.exports.addResource = addResource;
module.exports.deleteResource = deleteResource;
module.exports.getResource = getResource;