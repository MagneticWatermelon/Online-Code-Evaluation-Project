const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Question = require('./question')
const Submission = require('./submission')

const GradeSchema = new Schema({
    assignment_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Assignment', required: true},
    student_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    grade:{type:Number, required:false,default:0}
}, {
    timestamps: true,    

});

const Grade = mongoose.model('Grade', GradeSchema);



const getGrade = (student_id,assignment_id)=>{
    return new Promise((resolve,reject)=>{
        Grade.findOne({student_id:student_id,assignment_id:assignment_id},(err,doc)=>{
            if(err){return reject()}
            if(!doc){updateGrade(student_id,assignment_id);return reject()}
            return resolve(doc.grade)
        })
    })
}

const updateGrade = async (student_id, assignment_id)=>{
    calculateGrade(student_id,assignment_id)
    .then(grade=>{
        Grade.findOne({student_id:student_id,assignment_id:assignment_id})
        .then(doc=>{
            if(!doc){
                let new_record = new Grade({
                    student_id:student_id,
                    assignment_id:assignment_id,
                    grade:grade
                })
                new_record.validate()
                .then(success=>{new_record.save()})
                .catch(err=>{console.log(err)})
            }
            else{

                doc.grade = grade;
                doc.validate()
                .then(success=>{doc.save()})
                .catch(err=>{console.log(err)})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
    .catch(err=>{
        console.log(err)
    })
}

const calculateGrade = (student_id, assignment_id)=>{
    return new Promise((resolve,reject)=>{
        Question.model
        .find({assignment_id:assignment_id})
        .select({_id:1,points:1})
        .then(questions=>{
            if(!questions){return resolve(null)}
            if(questions.length==0){return resolve(null)}

            let total = questions.map(q=>q.points).reduce((a,b)=>(a+b))
            
            return new Promise((resolve,reject)=>{
                
                let scores = questions.map((question)=> new Promise((resolve,reject)=>{
                    Submission.model.find({question_id:question._id,student_id:student_id})
                    .select({score:1})
                    .then(submissions=>{
                        if(!submissions){return resolve(0)}
                        if(submissions.length==0){return resolve(0)}
                        let max   = Math.max(...submissions.map(s=>s.score))
                        let score = (max*question.points)/100 
                        resolve(score)
                    })
                    .catch(err=>reject(0))
                }))
                resolve(scores)
            })
            .then(scores=>{
                Promise.all(scores)
                .then(results=>{
                    let gained_scores = results.reduce((a,b)=>(a+b))
                    let grade = (gained_scores/total)*100
                    return resolve(Math.round(grade))
                })
                .catch(err=>{
                    return reject(null)
                })
            })
        })
    })
}


module.exports.model = Grade;

module.exports.getGrade     = getGrade;
module.exports.updateGrade  = updateGrade