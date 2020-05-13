const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const submissionSchema = new Schema({
    student_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    question_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true},    
    score:{type:Number, required: true}, // added
    evaluation:[{
        status : String, // 'correct' or 'wrong'
        output : Array,  // student's output => ['o1','o2'.....]
    }],//added

    files:  [{name:String,content:String}],   // should be changed to files

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
    let submission =  new Submission({
        student_id:student_id,
        question_id,question_id,
        score:score,
        evaluation,evaluation,
        files: files,
        language: language,
        comment:comment
    });

    submission.validate()
    .then(success=>{
        submission.save()
        .then(callback(null))
        .catch((err)=> callback('Cannot save submission'));
    })
    .catch(err=>{
        return callback('Validation failed')
    })
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
    Submission.findByIdAndUpdate(submission_id,{$set:{
        score:score
    }},(err,submission)=>{
        if(err){return callback(err)}
        return callback(null)
    })
}

/* Updates the evaluation
    example callback call => callback(err)
 */
const updateEvaluation = (submission_id, evaluation, callback)=>{
    Submission.findByIdAndUpdate(submission_id,{$set:{
        evaluation:evaluation
    }},(err,submission)=>{
        if(err){return callback(err)}
        return callback(null)
    })
}

module.exports.model = Submission;

module.exports.saveSubmission   = saveSubmission;
module.exports.getSubmission    = getSubmission;
module.exports.deleteSubmission = deleteSubmission;
module.exports.updateScore      = updateScore;
module.exports.updateEvaluation = updateEvaluation;
module.exports.getFiles         = getFiles;