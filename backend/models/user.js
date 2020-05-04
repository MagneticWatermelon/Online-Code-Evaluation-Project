const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type: String, required: true},
    mail: {type: String, required: true},

    user_role: {type: Number, required: true}, // added
    
    profile_photo: {type: Buffer, required: false},
    password_hash: {type: String, required: true},
    salt: {type: String, required: true},
    date: {type: Date, default: Date.now}
}, {
    timestamps: true,
});

/* Following checks the user in the db and returns the user_id of that user.
    example callback call => callback(err, user_id)

        - if the user not exist then callback(err, null)
 */
const checkUser = (mail, password, callback)=>{

}

/* Following function adds a new user to the system
    example callback call => callback(err)
 */
const addUser = (name, mail, user_role, password, callback)=>{

}

/* Following function returns the user as a json object
    example callback call => callback(err, userAsJson)
 */
const getUser = (user_id, callback)=>{
    
}

/* Following updates the user information
    example callback call => callback(err)
 */
const updateUser = (user_id, name, mail, password, callback)=>{

}

/* Following deletes the user
    example callback call => callback(err)
 */
const deleteUser = (user_id, callback)=>{

}

/* Following adds a profile photo to the given user
    example callback call => callback(err)
 */
const addProfilePhoto = (user_id, profile_photo, callback)=>{

}

/* Following function returns an array of given course ids by the given instructor
    example callback call => callback(err, arrayOfCourseIDs)
*/
const getGivenCourses = (instructor_id, callback)=>{

}

/* Following function returns an array of taken course ids by the given student
    example callback call => callback(err, arrayOfCourseIDs)
 */
const getTakenCourses = (student_id, callback) =>{

}

const User = mongoose.model('User', userSchema);
module.exports.model = User;

module.exports.checkUser = checkUser;
module.exports.addUser = addUser;
module.exports.getUser = getUser;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
module.exports.addProfilePhoto = addProfilePhoto;
module.exports.getGivenCourses = getGivenCourses;
module.exports.getTakenCourses = getTakenCourses;