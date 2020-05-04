const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Course_Given_Schema = new Schema({
    instructor_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    course_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true},
    term: {type: String, required: true},
}, {
    timestamps: true,    

});
const Course_Given = mongoose.model('Course_Given', Course_Given_Schema);
module.exports = Course_Given;