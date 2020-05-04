const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const submissionSchema = new Schema({
    student_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    question_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true},
    submitted_code:  {type: String, required: true},   
    date: {type: Date, default: Date.now},    
    explanation: {type: String, required: true},

}, {
    timestamps: true,
});

const Submission = mongoose.model('Submission', submissionSchema);
module.exports = Submission;