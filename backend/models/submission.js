const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const submissionSchema = new Schema({
    student_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    question_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true},
    
    score:{type:Number, required: true}, // added

    evaluation:[{
        status  : String, // 'correct' or 'wrong'
        outputs : Array,  // student's outputs => ['o1','o2'.....]
    }],//added

    submitted_code:  {type: String, required: true},   // should be changed to files

    language:{type:String, required:true}, // added

    date: {type: Date, default: Date.now},    
    comment: {type: String, required: false}
}, {
    timestamps: true,
});

/* Following function saves the submission to the db
    example callback call => callback(err)
 */
const saveSubmission = (student_id, question_id, score, evaluation, files, language, comment, callback)=>{

}

/* Returns the submission as a json object
    example callback call => callback(err, submission)
 */
const getSubmission = (submission_id, callback)=>{

}

/* Following function returns an array of json object

    !! important

    example :  [    {name:String, content:String}, // file1
                    {name:String, content:String}  // file2
                    .
                    .
                    .
               ]

    example callback call => callback(err, files)
*/
const getFiles = (submission_id, callback)=>{

}

/* Deletes the submission
    example callback call => callback(err)
 */
const deleteSubmission = (submission_id, callback)=>{

}

/* Following function is used for changing the score manually (by instructor)
    example callback call => callback(err)
 */
const updateScore = (submission_id, score, callback)=>{

}

/* Updates the evaluation
    example callback call => callback(err)
 */
const updateEvaluation = (submission_id, evaluation, callback)=>{

}

const Submission = mongoose.model('Submission', submissionSchema);
module.exports.model = Submission;

module.exports.saveSubmission = saveSubmission;
module.exports.getSubmission = getSubmission;
module.exports.deleteSubmission = deleteSubmission;
module.exports.updateScore = updateScore;
module.exports.updateEvaluation = updateEvaluation;
module.exports.getFiles = getFiles;