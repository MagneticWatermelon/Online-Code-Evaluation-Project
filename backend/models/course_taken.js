const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Course_Taken_Schema = new Schema({
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }
}, {
    timestamps: true,
});

const Course_Taken = mongoose.model('Course_Taken', Course_Taken_Schema);

const add = (course_id, student_id) => {
    Course_Taken
    .find({course_id:course_id,student_id:student_id})
    .then(result=>{
        if(result.length>=1){return;}

        let obj = new Course_Taken({
            student_id: student_id,
            course_id: course_id
        })
    
        obj.validate()
            .then(result => {
                obj.save()
                    .then()
                    .catch()
            })
            .catch()

    })
    .catch(err=>{

    })
}

const drop = (course_id, student_id) => {
    Course_Taken
        .findOneAndDelete({ student_id: student_id, course_id: course_id })
        .then()
        .catch()
}

module.exports.model = Course_Taken;
module.exports.add = add;
module.exports.drop = drop;