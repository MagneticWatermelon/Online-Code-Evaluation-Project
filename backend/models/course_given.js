const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Course_Given_Schema = new Schema({
    instructor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }

}, {
    timestamps: true,

});
const Course_Given = mongoose.model('Course_Given', Course_Given_Schema);


const add = (course_id, instructor_id) => {
    Course_Given
    .find({course_id:course_id,instructor_id:instructor_id})
    .then(result=>{
        console.log(result)
        if(result.length>=1){return;}

        let obj = new Course_Given({
            instructor_id: instructor_id,
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

const drop = (course_id, instructor_id) => {
    Course_Given
        .findOneAndDelete({ instructor_id: instructor_id, course_id: course_id })
        .then()
        .catch()
}

module.exports.model = Course_Given;
module.exports.add = add;
module.exports.drop = drop;