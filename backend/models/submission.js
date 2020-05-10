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

const saveSubmission = (student_id, question_id, score, evaluation, files, language, comment, callback)=>{
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
const getSubmission = (submission_id, callback)=>{
    Submission.findById(submission_id).then(
        Submission_obj=>{
            if(!Submission_obj) return callback("SubmissionId is not valid",null);
            return callback(null,Submission_obj);
        }
    ).catch(
         err=> {return callback("Getting Submission Object problem from DB",null);}
    );
    
}

/* Following function returns an array of json object
    example callback call => callback(err, files)
*/
const getFiles = (submission_id, callback)=>{
    Submission.findById(submission_id).then(
        File_obj=>{
            if(!File_obj) return callback("Invalid ID",null);
        Submission.findById(submission_id).select({files:1,_id:0}).then((File_res)=>{
            return callback(null,File_res);}
        ).catch(
            (err)=>{return callback("File cannot be selected from DB",null)}
        )    
        }
    ).catch(
        err=>{return callback("Getting FileObject Problem from DB",null)}
    );
    
}

/* Deletes the submission
    example callback call => callback(err)
 */
const deleteSubmission = (submission_id, callback)=>{
    Submission.findById(submission_id).then(
        submisson_delete=>{
            if(!submisson_delete) return callback("SubmissionID is not valid ",null);
            Submission.findByIdAndDelete(submission_id,(err)=>{if(err)return callback("Delete Problem in DB")},(err)=>{
                if(err) {return callback("FindByIDandDelete code Problem");}
            });
            return   callback(null);
        }
    ).catch(
                err=>{return callback("SubmissionID problem in DB")}
    );
}

/* Following function is used for changing the score manually (by instructor)
    example callback call => callback(err)
 */
const updateScore = (submission_id, score, callback)=>{
    Submission.findById(submission_id).then(
        updateScore=>{
            if(!updated_Score) return callback("ID is not valid ");
            Submission.findByIdAndUpdate(submission_id,{$set:{
                score:score,
            },
        },(err)=>{if(err) return callback("Update problem to DB")});
        return  callback(null);
        }
    ).catch(
        err=>{return callback("SubmissionId Problem");}
    );
}

/* Updates the evaluation
    example callback call => callback(err)
 */
const updateEvaluation = (submission_id, evaluation, callback)=>{
    Submission.findById(submission_id).then(
        updateEvaluatin_obj=>{
            if(!updateEvaluatin_obj) return callback("ID is not valid ");
            Submission.findByIdAndUpdate(submission_id,{$set:{
                    evaluation:evaluation,
                },
            },(err)=>{if(err) return callback("Update problem to DB")});
            return  callback(null);
        }
    ).catch(
        err=>{return callback("Submission Id Error  in DB");}
    );
}

module.exports.model = Submission;

module.exports.saveSubmission   = saveSubmission;
module.exports.getSubmission    = getSubmission;
module.exports.deleteSubmission = deleteSubmission;
module.exports.updateScore      = updateScore;
module.exports.updateEvaluation = updateEvaluation;
module.exports.getFiles         = getFiles;