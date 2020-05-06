const course = require('./course');


course.createCourse('COMP101', 1999, 'Spring', 'Programming', (err,id)=>{
    if(err){
        console.log(err)
    }
    console.log(id)
})