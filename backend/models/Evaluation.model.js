const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const evaluationSchema = new Schema({
    submission_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Submission', required: true},
    evaluation_result: {type: String, required: true},
    

}, {
    timestamps: true,
});

const Evaluation = mongoose.model('Evaluation', evaluationSchema);
module.exports = Evaluation;