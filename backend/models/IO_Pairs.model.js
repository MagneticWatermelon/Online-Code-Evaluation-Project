const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const IO_PairsSchema = new Schema({
    question_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true},
    instructor_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    date: {type: Date, default: Date.now},
    inputs: [{type: String, required: true}],
    outputs: [{type: String, required: true}],
    explanation: {type: String, required: true},

}, {
    timestamps: true,
});

const IO_Pairs = mongoose.model('Input_Output_Pairs', IO_PairsSchema);
module.exports = IO_Pairs;