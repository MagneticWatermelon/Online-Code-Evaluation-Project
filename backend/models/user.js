const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validate_email = require('validate-email-node-js');
const course_given = require('./course_given').model;
const course_taken = require('./course_taken').model;
const Assignment = require('./assignment');
const Notification = require('./notification');
const Grade = require('./grade');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    mail: { type: String, required: true },
    user_role: { type: Number, required: true },
    profile_photo: { type: String, required: false },
    password_hash: { type: String, required: true },
    date: { type: Date, default: Date.now }
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);
/* Following checks the user in the db and returns the user_id of that user.
    example callback call => callback(err, user_id)

        - if the user not exist then callback(err, null)
 */
const checkUser = (mail, password, callback) => {
    User.findOne({ mail: mail })
        .then(usr => {

            if (!usr) return callback("Email not found");

            bcrypt.compare(password, usr.password_hash).then(valid_pass => {

                if (!valid_pass) return callback("invalid password", null);

                return callback(null, usr.id);

            })
                .catch(err => {
                    return callback('cannot validate password', null);
                })

        })
        .catch(err => {
            return callback(err, null)
        })
}

/* Following function adds a new user to the system
    example callback call => callback(err)
 */
const addUser = (name, mail, user_role, password, callback) => {
    if (!validate_email.validate(mail)) return callback("Not invalid email ")
    //find someone from database
    User.findOne({ mail: mail }).then((usr) => {
        //if User cant find in DB
        if (usr) return callback("It is a registered User.");
        // creating salt as running hash function.
        bcrypt.genSalt(10).then(
            constant_salt => {
                // creating hash_pass
                bcrypt.hash(password, constant_salt).then(
                    hash_pass => {
                        let user = new User({
                            name: name,
                            mail: mail,
                            //User role Student:0 , TA:1 , Teacher:2 ,Admin:3
                            user_role: user_role,
                            profile_photo: null,
                            password_hash: hash_pass,
                        });
                        // saving user
                        user.save()
                            .then(usr => { return callback(null); })
                            .catch(err => { return callback("Saving User problem"); });
                    }
                ).catch(
                    err => { return callback("HashPassword not generated"); }
                );
            }

        ).catch(
            err => { return callback("Salt not generated"); }
        );
    }
    ).catch(
        err => { return callback(err); }
    );
}

/* Following function returns the user as a json object
    example callback call => callback(err, userAsJson)
 */
const getUser = (user_id, callback) => {
    let promise = User.findById(user_id)
    promise
        .then(user => {
            if (user) { return callback(null, user) }
            return callback('User not found', null)
        })
}

const getAllUsers = (callback)=>{
    User.find()
    .then(users=>{
        return callback(null,users)
    })
    .catch(err=>{
        return callback('Cannot get users',null)
    })
}

/* Following updates the user information
    example callback call => callback(err)
 */
const updateUser = (user_id, name, profile_photo, callback) => {
    // all information has to be filled, otherwise problem can be existed in DB
    User.updateMany({ _id: user_id }, { $set: { name: name, profile_photo: profile_photo } }, (err) => {
        if (err) return callback("There is an error to Uptade to DB")
    })
    return callback(null);
}

/* Following function updates the password of the user
    example callback call => callback(err)
 */
const updatePassword = (user_id, password, callback) => {
    let usr = User.findOne({ _id: user_id }).then(
        usr => {
            if (!usr) return callback("Not Invalid User ID");
            bcrypt.compare(password, usr.password_hash).then(
                valid_pass => {
                    if (valid_pass) return callback("Same Password with last one");
                    bcrypt.genSalt(10).then(
                        new_salt => {
                            bcrypt.hash(password, new_salt).then(
                                new_password => {
                                    User.updateOne({ _id: user_id }, { $set: { password_hash: new_password } }, (err) => {
                                        if (err) return callback('There is an error to Uptade to DB')
                                    });
                                    return callback(null);
                                }
                            ).
                                catch(
                                    err => { return callback("new hash cannot be generated") }
                                );
                        }
                    ).catch(
                        err => { return callback("salt cannot be generated") }
                    );
                }
            ).catch(
                err => { return callback("Matching passwords Error") }
            );
        }
    ).catch(
        err => { return callback("searching User problem in DB"); }
    );
}

/* Following deletes the user
    example callback call => callback(err)
 */
const deleteUser = (user_id, callback) => {
    User.findById(user_id).then(
        usr => {
            if (!usr) return callback("Not a valid ID");
            User.findByIdAndDelete(user_id, (err, data) => {
                if (err) return callback("There is a error when deleting")
            });
            return callback(null);
        }
    ).catch(
        err => { return callback("Searching user Error in DB") }
    );
}

/* Following adds a profile photo to the given user
    example callback call => callback(err)
 */
const addProfilePhoto = (user_id, profile_photo, callback) => {

    User.findByIdAndUpdate(user_id, { $set: { profile_photo: profile_photo } }, (err, res) => {
        if (err) return callback("it didnt update")
    });
    return callback(null);
}

/* Following function returns an array of given course ids by the given instructor
    example callback call => callback(err, arrayOfCourseIDs)
*/
const getGivenCourses = (instructor_id, callback) => {
    course_given.findOne({ instructor_id: instructor_id }).then(
        inst => {
            if (!inst) return callback("Not invalid id", null);
            // it returns id and course id properities from DB and it is a JSON array
            course_given.find({ instructor_id: instructor_id }).select({ course_id: 1 }).then(
                courses_ids => {
                    return callback(null, courses_ids);
                }
            ).catch(
                err => { return callback("Course Given Error in DB", null) }
            );
        }
    ).
        catch(
            err => { return callback("Searching user Error in DB", null) }
        );
}

/* Following function returns an array of taken course ids by the given student
    example callback call => callback(err, arrayOfCourseIDs)
 */
const getTakenCourses = (student_id, callback) => {
    course_taken.findOne({ student_id: student_id }).then(
        student_id_obj => {
            if (!student_id_obj) return callback("Not valid ID", null);
            // it returns id and course id properities from DB and it is a JSON array
            course_taken.find({ student_id: student_id }).select({ course_id: 1 }).then(
                taken_courses => {
                    return callback(null, taken_courses);
                }
            ).catch(
                err => { return callback("Course Taken Error in DB", null) }
            );
        }
    ).catch(
        err => { return callback("Searching user Error in DB", null) }
    );
}

/* Following function returns the notification ids of the user

    example callback call => callback(err, notification_ids)
 */
const getNotifications = (user_id, callback) => {
    console.log(user_id)
    Notification.model
        .find({ student_id: user_id })
        .then(result => {
            return callback(null, result)
        })
        .catch(err => {
            console.log(err)
            return callback('Cannot get notifications', null)
        })
}

const getAssignments = (student_id, limit, callback) => {
    course_taken
        .find({ student_id: student_id })
        .select()
        .then(pairs => {

            let course_ids = pairs.map(p => (p.course_id))

            Assignment.model
                .find({ course_id: { $in: course_ids } })
                .select({ title: 1, _id: 1, due_date: 1 })
                .limit(limit)
                .then(assignments => {
                    let promises = assignments.map(async assignment => {
                        return new Promise((resolve, reject) => {
                            let obj = assignment.toObject()
                            let date = assignment.due_date

                            obj.status = Date.parse(date) > Date.now() ? 'Closed' : 'Open'

                            Grade.model
                                .findOne({ assignment_id: assignment._id, student_id: student_id })
                                .then(result => {
                                    if (!result) { obj.grade = null; resolve(obj); return; }
                                    obj.grade = result.grade
                                    resolve(obj);
                                })
                                .catch(err => {
                                    obj.grade = null
                                    resolve(obj);
                                })
                        })
                    })

                    Promise.all(promises)
                        .then(results => {
                            callback(null, results)
                        })
                        .catch(err => {
                            console.log(err)
                            callback('Cannot get assignments', null)
                        })
                })
                .catch(err => {
                    console.log(err)
                    callback('Cannot get assignments', null)
                })
        })
        .catch(err => {
            console.log(err)
            callback('Cannot get assignments', null)
        })
}

module.exports.model = User;

module.exports.checkUser = checkUser;
module.exports.addUser = addUser;
module.exports.getUser = getUser;
module.exports.getAllUsers= getAllUsers;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
module.exports.addProfilePhoto = addProfilePhoto;
module.exports.updatePassword = updatePassword;
module.exports.getGivenCourses = getGivenCourses;
module.exports.getTakenCourses = getTakenCourses;
module.exports.getNotifications = getNotifications;
module.exports.getAssignments = getAssignments;