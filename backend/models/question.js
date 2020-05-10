const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionSchema = new Schema({
    assignment_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Assignment', required: true},
    title: {type: String, required: true},
    explanation: {type: String, required: true},
    submission_limit:{type: Number, required:true},
    points:{type:Number, required:true}, // points
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
    example callback call => callback(err)

    !! important
      Here, the inputs is an array of array of strings
        example inputs parameter => [ ['1.1','1.2'] , ['2.1','2.2'] , ['3.1','3.2'] ] // 3 test cases' inputs
        example outputs parameter=> [ ['1.1','1.2'] , ['2.1','2.2'] , ['3.1','3.2'] ] // 3 test cases' outputs
 */
const createQuestion =(assignment_id, title, explanation, submission_limit,points, inputs, outputs, callback)=>{
    let question  =  new Question({
            assignment_id:assignment_id,
            title:title,
            explanation:explanation,
            submission_limit:submission_limit,
            inputs:inputs,
            outputs:outputs,
            points:points
    });
    question.validate().then((value)=>{
        question.save()
        .then((value)=>{return callback(null)})
        .catch((err)=> {return callback("Saving question problem to DB")})
    }
    ).catch(
        callback("Validation Error!!!!")
    );
   
}

/* Following function returns the question as a jason object
    example callback call => callback(err, question)
*/
const getQuestion =  (question_id, callback)=>{
 Question.findById(question_id)
 .then(
     quest=>{
        if(!quest) return callback("QuestionID is not valid ",null);
        return callback(null,quest);
     }
 ).catch( (err)=>{
     return callback(err,null)
 }
 );
 
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
const updateQuestion = (question_id, title, explanation,submission_limit,points,callback)=>{
    Question.findById(question_id)
    .then(
        quest=>{
           if(!quest) return callback("QuestionID is not valid ");
           Question.findByIdAndUpdate(question_id,{$set:{
            title:title,
            explanation:explanation,
            submission_limit:submission_limit,
            points:points
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
module.exports.model = Question;

module.exports.createQuestion = createQuestion;
module.exports.getQuestion = getQuestion;
module.exports.setIOOfQuestion = setIOOfQuestion;
module.exports.updateQuestion = updateQuestion;
module.exports.deleteQuestion = deleteQuestion;

