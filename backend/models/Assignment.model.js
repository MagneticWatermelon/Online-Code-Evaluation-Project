const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const assignmentSchema = new Schema({
    course_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true},
    releasing_instructor_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    release_date:{type: Date, default: Date.now},
    due_date: {type: Date, default: Date.now},
    num_of_questions: {type: Number, required: true},
    explanation: {type: String, required: true},

}, {
    timestamps: true,
});

const Assignment = mongoose.model('Assignment', assignmentSchema);
module.exports = Assignment;