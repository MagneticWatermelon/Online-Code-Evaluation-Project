const mongoose = require('mongoose');
const Question = require('./question');

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

const Assignment = mongoose.model('Assignment', assignmentSchema);

/* Following function creates an assignment with given properties

   example callback call => callback(err)
 */
const createAssignment = async (course_id, instructor_id, title, release_date, due_date, explanation, weight, callback)=>{
    const flag =await  Assignment.findOne({
        course_id: course_id,
            releasing_instructor_id: instructor_id,
            title: title,
            release_date: release_date,
            due_date: due_date,
            explanation: explanation,
            weight: weight,
    });
    if (flag) {
        return callback("Duplicate error");
    } else {
        try {
            const assignment = new Assignment({
                course_id: course_id,
                releasing_instructor_id: instructor_id,
                title: title,
                release_date: release_date,
                due_date: due_date,
                explanation: explanation,
                weight: weight,
            });
            await assignment.validate();
            const result = await assignment.save();    
        } catch (e) {
            return callback(e);
        }
    }
    

}

/* Following function returns the assignment as a jason object
   
    example callback call => callback(err, assignment)
 */
const getAssignment = async (assignment_id, callback)=>{
    try {
        const assignment = await Assignment.findById(assignment_id);
        return callback(null, assignment);
    } catch (error) {
        return callback("Error occured", null);
    }
}

/* following function takes assignment_id and returns an array of question ids

    example callback call => callback(err, arrayOfQuestionIDs)
*/
const getQuestions = async (assignment_id, callback)=>{
    try {
        const quests = await Question.model
            .find({assignment_id: assignment_id})
            .select({"_id": 0});
        return callback(null, quests);
    } catch (error) {
        return callback("Error occured", null);
    }
}

/* Deletes assignment
    example callback call => callback(err)
 */
const deleteAssignment = async(assignment_id, callback)=>{
    try {
        const result = await Assignment.findByIdAndDelete(assignment_id);
    
    } catch (e) {
        return callback("Error occured");
    }
}

/* Updates assignment properties
    example callback call => callback(err)
 */
const updateAssignment = async (assignment_id, title, release_date, due_date, explanation, weight, callback)=>{    
    try {
        const result = await Assignment.findByIdAndUpdate(assignment_id, {
            $set:{
                title: title,
                release_date: release_date,
                due_date: due_date,
                explanation: explanation,
                weight: weight
            }
         });
    } catch (error) {
        return callback("Error occured");
    }
}


module.exports.model = Assignment;
module.exports.createAssignment = createAssignment;
module.exports.getQuestions     = getQuestions;
module.exports.getAssignment    = getAssignment;
module.exports.updateAssignment  = updateAssignment;
module.exports.deleteAssignment = deleteAssignment;
