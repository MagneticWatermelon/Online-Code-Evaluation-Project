const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const assignmentSchema = new Schema({
    course_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true},
    releasing_instructor_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    title: {type: String, required: true}, // added
    release_date:{type: Date, default: Date.now},
    due_date: {type: Date, default: Date.now},
    explanation: {type: String, required: true},
    weight: {type: Number, required:true} // added
}, {
    timestamps: true,
});

/* Following function creates an assignment with given properties

   example callback call => callback(err)
 */
const createAssignment = (course_id, instructor_id, title, release_date, due_date, explanation, weight, callback)=>{

}

/* Following function returns the assignment as a jason object
   
    example callback call => callback(err, assignment)
 */
const getAssignment = (assigment_id, callback)=>{

}

/* following function takes assignment_id and returns an array of question ids

    example callback call => callback(err, arrayOfQuestionIDs)
*/
const getQuestions = (assigment_id, callback)=>{

}

/* Deletes assignment
    example callback call => callback(err)
 */
const deleteAssignment = (assignment_id, callback)=>{

}

/* Updates assignment properties
    example callback call => callback(err)
 */
const updateAssigment = (assigment_id, title, release_date, due_date, explanation, weight, callback)=>{

}

const Assignment = mongoose.model('Assignment', assignmentSchema);
module.exports.model = Assignment;

module.exports.createAssignment = createAssignment;
module.exports.getQuestions     = getQuestions;
module.exports.getAssignment    = getAssignment;
module.exports.updateAssigment  = updateAssigment;
module.exports.deleteAssignment = deleteAssignment;
