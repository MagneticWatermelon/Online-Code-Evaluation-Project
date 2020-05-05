const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validate_email = require('validate-email-node-js');
const course_given = require('./course_given');
const fs = require('fs');
const course_taken = require('./course_taken');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type: String, required: true},
    mail: {type: String, required: true},
    user_role: {type: Number, required: true}, // added    
    profile_photo: {type: Buffer, required: false},
    password_hash: {type: String, required: true},
    date: {type: Date, default: Date.now}
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);
/* Following checks the user in the db and returns the user_id of that user.
    example callback call => callback(err, user_id)

        - if the user not exist then callback(err, null)
 */
const checkUser = async (mail, password, callback)=>{
    let usr = await User.findOne({mail:mail});
    if(!usr) return callback("it is not a registered E-mail in Database");
    let valid_pass = await bcrypt.compare(password,usr.password_hash);
    if(!valid_pass) return callback("it is not a invalid Password",null);
    return callback(null,usr.id);
}

/* Following function adds a new user to the system
    example callback call => callback(err)
 */
const addUser = async(name, mail, user_role, password, callback)=>{
    if(!validate_email.validate(mail)) return callback("Not invalid email ")
    //find someone from database
    let usr = await User.findOne({mail:mail});
    //if User cant find in DB
    if(usr) return callback("It is a registered User.");
    // creating salt as running hash function.
    const constant_salt =await bcrypt.genSalt(10);
    // creating hash_pass
    const hash_pass = await bcrypt.hash(password,constant_salt);
    let user = new User({
        name:name,
        mail:mail,
        //User role Student:0 , TA:1 , Teacher:2 ,Admin:3
        user_role: user_role,
        profile_photo:null,
        password_hash:hash_pass,
    });
    // saving user
    user.save()
    .then()
    .catch((err)=> callback("Saving User problem"));
}

/* Following function returns the user as a json object
    example callback call => callback(err, userAsJson)
 */
const getUser = async (user_id, callback)=>{
    let usr = await User.findOne({_id:user_id});
    if(!usr) return callback("Not invalid UserId");
    callback(null,usr);
}

/* Following updates the user information
    example callback call => callback(err)
 */
const updateUser = async (user_id, name,profile_photo, callback)=>{
    // all information has to be filled, otherwise problem can be existed in DB
await User.updateMany({_id:user_id},{$set: {name:name,profile_photo:profile_photo}},(err)=>{
    if(err) return  callback("There is an error to Uptade to DB")
})
}

/* Following function updates the password of the user
    example callback call => callback(err)
 */
const updatePassword = async (user_id, password,callback)=>{
let usr = await User.findOne({_id:user_id});
if(!usr) return callback("Not Invalid User ID");
let valid_pass = await bcrypt.compare(password,usr.password_hash);
if(valid_pass) return callback("Same Password with last one");
const new_salt = await bcrypt.genSalt(10);
const new_password = await bcrypt.hash(password,new_salt);
console.log(new_password);
await User.updateOne({_id:user_id}, {$set: {password_hash:new_password}},(err)=>{
    if(err) return callback('There is an error to Uptade to DB')
});
//usr.updateO({$set: {password_hash:new_password}});
}

/* Following deletes the user
    example callback call => callback(err)
 */
const deleteUser = async (user_id, callback)=>{
    let usr = await User.findById(user_id);
    if(!usr) return callback("Not a valid ID"); 
    User.findByIdAndDelete(user_id,(err,data)=>{
        if(err) return callback("There is a error when deleting")
    });
}

/* Following adds a profile photo to the given user
    example callback call => callback(err)
 */
const addProfilePhoto = async(user_id, profile_photo, callback)=>{
    
 let usr = await User.findByIdAndUpdate(user_id,{$set:{profile_photo:profile_photo}},(err,res)=>{
     if(err) return callback("it didnt update")
 });
}

/* Following function returns an array of given course ids by the given instructor
    example callback call => callback(err, arrayOfCourseIDs)
*/
const getGivenCourses = async (instructor_id, callback)=>{
 let inst = await course_given.findOne({instructor_id:instructor_id});
 if(!inst) return callback("Not invalid id", null);
 // it returns id and course id properities from DB and it is a JSON array
 let courses_ids =  await course_given.find({instructor_id:instructor_id}).select({course_id:1});
 return callback(null, courses_ids);
}

/* Following function returns an array of taken course ids by the given student
    example callback call => callback(err, arrayOfCourseIDs)
 */
const getTakenCourses = async (student_id, callback) =>{
let student_id_obj = await course_taken.findOne({student_id:student_id});
if(!student_id_obj) return callback("Not valid ID",null);
// it returns id and course id properities from DB and it is a JSON array
let taken_courses = await course_taken.find({student_id:student_id}).select({course_id:1});
return callback(null,taken_courses);
}
module.exports.model = User;

module.exports.checkUser = checkUser;
module.exports.addUser = addUser;
module.exports.getUser = getUser;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
module.exports.addProfilePhoto = addProfilePhoto;
module.exports.updatePassword  = updatePassword;
module.exports.getGivenCourses = getGivenCourses;
module.exports.getTakenCourses = getTakenCourses;