const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionSchema = new Schema({
    assignment_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Assignment', required: true},
    number_of_io: {type: Number, required: true},
    explanation: {type: String, required: true},
   
}, {
    timestamps: true,
});

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;