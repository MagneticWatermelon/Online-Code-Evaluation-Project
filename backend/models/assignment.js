const mongoose  = require('mongoose');
const Question  = require('./question');
const Submission= require('./submission');

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

   example callback call => callback(err , id)
 */
const createAssignment = (course_id, instructor_id, title, release_date, due_date, explanation, weight, callback)=>{
    Assignment.findOne({
            course_id: course_id,
            releasing_instructor_id: instructor_id,
            title: title,
            release_date: release_date,
            due_date: due_date,
            explanation: explanation,
            weight: weight,
    })
    .then(result => {
        if (result) {
            return callback("This assignment already exists",null);
        } else {
            const assignment = new Assignment({
                course_id: course_id,
                releasing_instructor_id: instructor_id,
                title: title,
                release_date: release_date,
                due_date: due_date,
                explanation: explanation,
                weight: weight,
            });
            assignment.validate()
            .then(success=>{
                assignment.save()
                .then(result => {
                    if (!result) {
                        return callback("Error while creating creating the assignment",null);
                    } else {
                        return callback(null,assignment._id);
                    }
                })
                .catch(err => {
                    return callback("Error occured",null);
                })
            })
            .catch(err=>{
                return callback('Assignment cannot be created',null)
            })
            
        }
    })
    .catch(err => {
        return callback("Error occured",null);
    })
   
    

}

/* Following function returns the assignment as a jason object
   
    example callback call => callback(err, assignment)
 */
const getAssignment = (assignment_id, callback)=>{
    
        Assignment.findById(assignment_id)
        .then(result => {
            if (!result) {
                return callback("Assignment could not found", null);
            } else {
                return callback(null, result);
            }
        })
       .catch(err => {
           return callback("Error occured", null);
       })
}

/* following function takes assignment_id and returns an array of question ids

    example callback call => callback(err, arrayOfQuestionIDs)
*/
const getQuestions = (assignment_id, callback)=>{
    
        Question.model
        .find({assignment_id: assignment_id})
        .select()
        .then(result => {
            if (!result) {
                return callback("Question could not found", null);
            } else {
                return callback(null, result);
            }
        })
        .catch(err => {
            return callback("Error occured", null);
        })
}

/* Deletes assignment
    example callback call => callback(err)
 */
const deleteAssignment = (assignment_id, callback)=>{
    
        Assignment.findByIdAndDelete(assignment_id)
        .then(result => {
            if (!result) {
                return callback("Assignment could not be deleted");
            } else {
                return callback(null);
            }
        })
        .catch(err => {
            return callback("Erro occured");
        });  
}

/* Updates assignment properties
    example callback call => callback(err)
 */
const updateAssignment =  (assignment_id, title, release_date, due_date, explanation, weight, callback)=>{    
    
        Assignment.findByIdAndUpdate(assignment_id, {
            $set:{
                title: title,
                release_date: release_date,
                due_date: due_date,
                explanation: explanation,
                weight: weight
            }
         })
         .then(result => {
             if (!result) {
                 return callback("Assignment could not be updated");
             } else {
                 return callback(null);
             }
         })
         .catch(err => {
             return callback("Error occured");
         })
   
}

/* Following function computes the average grade for the given student
    example callback call => callback(err, grade)

        a = maximum submission score

        b = question point

            then
        
        some of scores      = sum(a) for all questions

        potential scores    = sum(b) for all questions


        student's gradde    = [(some of scores)/(potential scores)]*100

*/
const getGrade = (student_id, assignment_id, callback)=>{
    Question.model
    .find({assignment_id:assignment_id})
    .select({_id:1,points:1})
    .then(questions=>{

        let total = questions.map(q=>q.points).reduce((a,b)=>(a+b))

        //
        let score = questions.map(async(q)=>{
            return await Submission.model.find({question_id:q._id,student_id:student_id})
            .select({score:1})
            .then(scores=>{return (Math.max(scores)*q.points)/total})
            .catch(err=>{return 0})
        }).reduce((a,b)=>a+b,0)
        
        let grade = score/total

        return callback(null,grade)
    })
    .catch(err=>{
        console.log(err)
        return callback('Cannot get grade',null)
    })
}

module.exports.model = Assignment;
module.exports.createAssignment = createAssignment;
module.exports.getQuestions     = getQuestions;
module.exports.getAssignment    = getAssignment;
module.exports.updateAssignment = updateAssignment;
module.exports.deleteAssignment = deleteAssignment;
module.exports.getGrade         = getGrade;
