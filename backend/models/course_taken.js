const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Course_Taken_Schema = new Schema({
    student_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    course_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true}
}, {
    timestamps: true,
});

const Course_Taken = mongoose.model('Course_Taken', Course_Taken_Schema);
module.exports = Course_Taken;