const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionSchema = new Schema({
    assignment_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Assignment', required: true},
    title: {type: String, required: true},
    explanation: {type: String, required: true},
    
    inputs:[[
        {type: String, required:true}
    ]], // added
    
    outputs:[[
        {type: String, required:true}
    ]] // added

}, {
    timestamps: true,
});

/* Creates a new question
    example callback call => callback(err)

    !! important
      Here, the inputs is an array of array of strings
        example inputs parameter => [ ['1.1','1.2'] , ['2.1','2.2'] , ['3.1','3.2'] ] // 3 test cases' inputs
        example outputs parameter=> [ ['1.1','1.2'] , ['2.1','2.2'] , ['3.1','3.2'] ] // 3 test cases' outputs
 */
const createQuestion = (assignment_id, title, explanation, inputs, ouputs, callback)=>{

}

/* Following function returns the question as a jason object
    example callback call => callback(err, question)
*/
const getQuestion = (question_id, callback)=>{

}

/* Updates inputs and outputs of the question
    example callback call => callback(err)
 */
const setIOOfQuestion = (question_id, inputs, outputs, callback)=>{

}

/* Updates the question with given parameters
    example callback call => callback(err)
 */
const updateQuestion = (question_id, title, explanation, callback)=>{

}

/* Deletes the question
    example callback call => callback(err)
 */
const deleteQuestion = (question_id, callback)=>{

}

const Question = mongoose.model('Question', questionSchema);
module.exports.model = Question;

module.exports.createQuestion = createQuestion;
module.exports.getQuestion = getQuestion;
module.exports.setIOOfQuestion = setIOOfQuestion;
module.exports.updateQuestion = updateQuestion;
module.exports.deleteQuestion = deleteQuestion;

