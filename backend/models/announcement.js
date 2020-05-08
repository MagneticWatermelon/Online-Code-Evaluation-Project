const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const announcementSchema = new Schema({
    instructor_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    course_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true},
    title: {type: String, required:true},
    explanation: {type:String, required:true},
    recipients: [{type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}]
}, {
    timestamps: true,
});

const Announcement = mongoose.model('Annoucement', announcementSchema);

/* Following function creates a new announcement and returns the id of
    created announcement

    example callback call => callback(err,announcement)
 */
const createAnnouncement = (insructor_id,course_id,title,explanation,callback)=>{

}

/* Following function deletes the announcement

    example callback call => callback(err) 
 */
const deleteAnnouncement = (announcement_id,callback)=>{

}

/* Following function returns the announcement
    
    exmple callback call => callback(err,announcement)
 */
const getAnnouncement = (announcement_id, callback)=>{
    
}

/*  Following function adds the given user_id to the receipents

    example callback call => callback(err)
 */
const addReceipent = (announcement_id, user_id, callback)=>{

}

/* Following function updates the announcement and at the end of operation
    receipents should be changed to an empty array since every student should
    be able noified when a change is made

        example callback call => callback(err)
 */
const updateAnnouncement = (announcement_id, title, explanation, callback)=>{
    // update announcement
    // delete recipients
}

/* Following function returns the comment ids made to given announcement
    example callback call => callback(err,comment_ids)
 */
const getComments = (announcement_id)=>{

}



module.exports.model = Announcement

module.exports.createAnnouncement   = createAnnouncement;
module.exports.getAnnouncement      = getAnnouncement;
module.exports.deleteAnnouncement   = deleteAnnouncement;
module.exports.updateAnnouncement   = updateAnnouncement;
module.exports.addReceipent         = addReceipent;
module.exports.getComments          = getComments;