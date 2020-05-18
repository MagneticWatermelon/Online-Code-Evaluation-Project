const mongoose = require('mongoose');
const Submission = require('./submission').model;
const Assignment = require('./assignment');

const Schema = mongoose.Schema;

const questionSchema = new Schema({
    assignment_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Assignment', required: true},
    title: {type: String, required: true},
    explanation: {type: String, required: true},
    submission_limit:{type: Number, required:true},
    points:{type:Number, required:true},
    languages:[{type:String, required:true}], // added
    inputs:[[
        {type: String, required:true}
    ]], // added
    
    outputs:[[
        {type: String, required:true}
    ]] // added

}, {
    timestamps: true,
});
const Question = mongoose.model('Question', questionSchema);

/* Creates a new question
    example callback call => callback(err, question_id)
 */
const createQuestion =(assignment_id, title, explanation, submission_limit,points,languages, inputs, outputs, callback)=>{
    let question  =  new Question({
            assignment_id:assignment_id,
            title:title,
            explanation:explanation,
            submission_limit:submission_limit,
            inputs:inputs,
            outputs:outputs,
            points:points,
            languages:languages
    });
    question.validate().then((value)=>{
        question.save()
        .then((value)=>{return callback(null, question._id)})
        .catch((err)=> {return callback("Saving question problem to DB",null)})
    }
    ).catch(err=>{
        callback(err, null)
    });
   
}

/* Following function returns the question as a jason object
    example callback call => callback(err, question)
*/
const getQuestion =  (question_id, callback)=>{
    Question.findById(question_id)
    .then(question=>{
        if(!question){return callback('Question not found',null)}
        return callback(null,question)
    })
    .catch(err=>{
        console.log(err)
        return callback('Question not found', null)
    })
}

/* Updates inputs and outputs of the question
    example callback call => callback(err)
 */
const setIOOfQuestion =(question_id, inputs, outputs, callback)=>{
    Question.findById(question_id)
 .then(
     quest=>{
        if(!quest) return callback("QuestionID is not valid ");
        Question.findByIdAndUpdate(question_id,{$set:{
            inputs:inputs,
            outputs:outputs
        },
    },(err)=>{if(err) return callback("Update problem to DB")});
    return callback(null);
        
     }
 ).catch(
    err=>{
        return callback(err);
    }
);
}

/* Updates the question with given parameters
    example callback call => callback(err)
 */
const updateQuestion = (question_id, title, explanation,submission_limit,points,languages,callback)=>{
    Question.findByIdAndUpdate(question_id,{$set:{
        title:title,
        explanation:explanation,
        submission_limit:submission_limit,
        points:points,
        languages:languages
    }})
    .then(success=>{
        return callback(null)
    })
    .catch(err=>{
        return callback('Update operation failed')
    })
}

/* Deletes the question
    example callback call => callback(err)
 */
const deleteQuestion = (question_id, callback)=>{
    Question.findById(question_id).then(quest=>{
        if(!quest) return callback("QuestionID is not valid ");
        Question.findByIdAndDelete(question_id,(err)=>{if(err)return callback("Delete Problem i DB")});
        return  callback(null);}
    ).catch(
        err=>{
            return callback(err);
        }
    ); 
}

/*  Following function returns the submission ids from student
    example callback call => callback(err, submission_ids)
 */
const getSubmissions = (question_id,student_id,callback)=>{
    getAssignment(question_id)
    .then(assignment=>{
        Submission
        .find({student_id:student_id,question_id:question_id})
        .select({student_id:0,question_id:0})
        .then(submissions=>{
            let promises = submissions.map(async submission=>{
                return new Promise((resolve,reject)=>{
                    let obj = submission.toObject()
                    
                    if(obj.evaluation){

                        total    = obj.evaluation.map(e=>{e.status});
                        corrects = total.filter(b=>b=='correct').length;
                        
                        obj.tests   = `${corrects}/${total.length}`

                        obj.message = (corrects==total.length) ? 'Accepted':'Wrong'; 
                    }
                    else{
                        obj.tests   = null
                        obj.message = 'Submission has problems';
                    }

                    resolve(obj)
                })
            })

            Promise.all(promises)
            .then(results=>{
                assignment.submissions = results
                return callback(null,assignment)
            })
            .catch(err=>{
                console.log(err)
                return callback('Cannot get Submissions',null)
            })
        })
        .catch(err=>{
            console.log(err)
            return callback('Cannot get submissions',null)
        })
    })
    .catch(err=>{
        console.log(err)
        return callback('Cannot get submissions',null)
    })
}


/* callback(err, submission_count)
 */
const getSubmissionCount = (question_id,student_id,callback)=>{
    Submission
    .find({question_id:question_id,student_id:student_id})
    .select({_id:1})
    .then(submissions=>{
        return callback(null,submissions.length)
    })
    .catch(err=>{
        return callback('Cannot get submissions',null)
    })
}


const getAssignment = async (question_id)=>{
    return new Promise((resolve,reject)=>{
        Question.findById(question_id)
        .select({assignment_id:1})
        .then(question=>{
            if(!question){return reject()}
            Assignment.model
            .findById(question.assignment_id)
            .select({title:1,_id:1,due_date:1})
            .then(assignment=>{
                console.log(assignment)
                if(!assignment){return reject()}
                let obj     = assignment.toObject()
                let date    = assignment.due_date
                obj.status  = Date.parse(date)>Date.now() ? 'Closed' : 'Open'
                return resolve(obj)
            })
            .catch(err=>{
                console.log(err)
                return reject()
            })
        })
        .catch(err=>{
            console.log(err)
            return reject()
        })
    })
}

module.exports.model = Question;

module.exports.createQuestion       = createQuestion;
module.exports.getQuestion          = getQuestion;
module.exports.setIOOfQuestion      = setIOOfQuestion;
module.exports.updateQuestion       = updateQuestion;
module.exports.deleteQuestion       = deleteQuestion;
module.exports.getSubmissions       = getSubmissions;
module.exports.getAssignment        = getAssignment;
module.exports.getSubmissionCount   = getSubmissionCount;

