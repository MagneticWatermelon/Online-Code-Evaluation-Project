const mongoose = require('mongoose');
const User = require('./user');
const Comment = require('./comment');


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

const Announcement = mongoose.model('Announcement', announcementSchema);

/* Following function creates a new announcement and returns the id of
    created announcement

    example callback call => callback(err,announcement)
 */
const createAnnouncement = (instructor_id,course_id,title,explanation,callback)=>{ //recipients parameter added since it is set to be required in the schema
    Announcement.findOne({
        instructor_id: instructor_id,
        course_id: course_id,
        title: title,
        explanation: explanation
    })
    .then(flag => {
        if (!flag) {
            const announce = new Announcement({
                instructor_id: instructor_id,
                course_id: course_id,
                title: title,
                explanation: explanation,
                recipients: []
            });
            announce.validate()
            .then(check => {
                announce.save()
                .then(res => {
                    return callback(null, announce._id);
                })
                .catch(err => {
                    return callback("Announcement could not be created");
                })
            })
            .catch(err => {
                return callback("Bad parameters");
            })
        } else {
            return callback("Announcement already exists");
        }
    })
    .catch(err => {
        return callback("Announcement could not be created");
    })
  

}

/* Following function deletes the announcement

    example callback call => callback(err) 
 */
const deleteAnnouncement = (announcement_id,callback)=>{
    Announcement.findByIdAndDelete(announcement_id)
    .then(result => {
       if (!result) {
          return callback("Announcement couldnt found");
       } else {
          return callback(null);
       }
    })
    .catch(err => {
       return callback("Error while deleting the announcement");
    })

}

/* Following function returns the announcement
    
    exmple callback call => callback(err,announcement)
 */
const getAnnouncement = (announcement_id, callback)=>{
    Announcement.findById(announcement_id)
      .then(result => {
         if (!result) {
            return callback("Announcement could not found", null);
         } else {
            return callback(null, result);
         }

      })
      .catch(err => {
          console.log(err)
         return callback("Error while getting the Announcement", null);
      })
}

/*  Following function adds the given user_id to the receipents

    example callback call => callback(err)
 */
const addReceipent = (user_id, callback)=>{ //  DOES NOT FILLED !!!
    User.findById(user_id)
    .then(result => {
        if (!result) {
            return callback("Invalid user");
        } else {
            
        }
    })
    .catch(err => {
        return callback("Error while adding recipient");
    })


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
const getComments = (announcement_id, callback)=>{
    Comment.find({
        announcement_id: announcement_id
    })
    
      .then(result => {
         if (!result) {
            return callback("No comment found", null);
         } else {
            return callback(null, result);
         }

      })
      .catch(err => {
         return callback("Error while getting the course", null);
      })
    
}



module.exports.model = Announcement

module.exports.createAnnouncement   = createAnnouncement;
module.exports.getAnnouncement      = getAnnouncement;
module.exports.deleteAnnouncement   = deleteAnnouncement;
module.exports.updateAnnouncement   = updateAnnouncement;
module.exports.addReceipent         = addReceipent;
module.exports.getComments          = getComments;