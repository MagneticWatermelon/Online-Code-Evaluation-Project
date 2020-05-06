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

    files:  [{nameofFile:String,subimittedcode:String}],   // should be changed to files

    language:{type:String, required:true}, // added
    date: {type: Date, default: Date.now},    
    comment: {type: String, required: false}
}, {
    timestamps: true,
});

/* Following function saves the submission to the db
    example callback call => callback(err)
 */
const Submission = mongoose.model('Submission', submissionSchema);
const saveSubmission = async (student_id, question_id, score, evaluation, files, language, comment, callback)=>{
    let submission_obj =  Submission({
        student_id:student_id,
        question_id,question_id,
        score:score,
        evaluation,evaluation,
        files: files,
        language: language,
        comment:comment
    });
    submission_obj.save()
    .then(callback(null))
    .catch((err)=> callback("Saving question problem to DB"));
}

/* Returns the submission as a json object
    example callback call => callback(err, submission)
 */
const getSubmission = async(submission_id, callback)=>{
    let Submission_obj = await Submission.findById(submission_id);
    if(!Submission_obj) return callback("SubmissionId is not valid",null);
    return callback(null,Submission_obj);
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
const getFiles = async(submission_id, callback)=>{
    let File_obj = await Submission.findById(submission_id);
    if(!File_obj) return callback("Invalid ID",null);
    File_res =  await Submission.findById(submission_id).select({files:1,_id:0});
    return callback(null,File_res);
}

/* Deletes the submission
    example callback call => callback(err)
 */
const deleteSubmission = async(submission_id, callback)=>{
    let submisson_delete = await Submission.findById(submission_id);
    if(!submisson_delete) return callback("SubmissionID is not valid ",null);
    Submission.findByIdAndDelete(submission_id,(err)=>{if(err)return callback("Delete Problem in DB")});
    return   callback(null);
}

/* Following function is used for changing the score manually (by instructor)
    example callback call => callback(err)
 */
const updateScore = async(submission_id, score, callback)=>{
    let updated_Score = await Submission.findById(submission_id);
    if(!updated_Score) return callback("ID is not valid ");
    Submission.findByIdAndUpdate(submission_id,{$set:{
            score:score,
        },
    },(err)=>{if(err) return callback("Update problem to DB")});
    return  callback(null);
}

/* Updates the evaluation
    example callback call => callback(err)
 */
const updateEvaluation = async(submission_id, evaluation, callback)=>{
    let updateEvaluatin_obj = await Submission.findById(submission_id);
    if(!updateEvaluatin_obj) return callback("ID is not valid ");
    Submission.findByIdAndUpdate(submission_id,{$set:{
            evaluation:evaluation,
        },
    },(err)=>{if(err) return callback("Update problem to DB")});
    return  callback(null);
}
module.exports.model = Submission;

module.exports.saveSubmission = saveSubmission;
module.exports.getSubmission = getSubmission;
module.exports.deleteSubmission = deleteSubmission;
module.exports.updateScore = updateScore;
module.exports.updateEvaluation = updateEvaluation;
module.exports.getFiles = getFiles;