const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const courseSchema = new Schema({
    course_code: {type: Number, required: true},
    term: {type: String, required: true},
    name: {type: String, required: true},
}, {
    timestamps: true,
});

const Course = mongoose.model('Course', courseSchema);

/* Following function creates a course with given parameters
   example callback call => callback(err)
 */
const createCourse = async (course_code, term, name, callback)=>{
   const course = new Course({
      course_code: course_code,
      term: term,
      name: name
   });

   const result = await course.save();
   if(result)
   {
      return callback(null, result);
   }
      
      
}

/* Following function associates the given instructor with the course
   example callback call => callback(err)
 */
const associateInstructorWithCourse = (course_id, instructor_id,callback)=>{
   
}

/* Following function drops instructor from the course
   example callback call => callback(err)
*/
const dropInstructorFromCourse = (course_id, instructor_id, callback)=>{

}

/* Adds student to course
   example callback call => callback(err)
 */
const addStudentToCourse = (course_id, student_id, callback)=>{

}

/* Drops student from course
   example callback call => callback(err)
 */
const dropStudentFromCourse = (course_id, student_id, callback)=>{

}

/* Returns course as a jason object
   example callback call => callback(err,course)
 */
const getCourse = (course_id, callback)=>{

   

}

/* Returns the assignment ids from this course
    example callback call => callback(err, arrayOfAssignmentIDs) 
 */
const getAssignments = (course_id, callback)=>{

}

/* Returns the id of the instructor who associated with this course
    example callback call => callback(err, instructor_id)
 */
const getInstructor = (course_id, callback)=>{

}

/* Returns an array of student ids who are taking this course
    example callback(err, arrayOfStudentIDs)
 */
const getStudents = (course_id, callback)=>{

}

/* Deletes the course
   example callback call => callback(err)
 */
const deleteCourse = (course_id, callback)=>{

}

/* Updates course properties
    example callback call => callback(err)
 */
const updateCourse = (course_id, title, course_code, term, callback)=>{

}


module.exports.model = Course;
module.exports.createCourse = createCourse;
module.exports.associateInstructorWithCourse = associateInstructorWithCourse;
module.exports.dropInstructorFromCourse = dropInstructorFromCourse;
module.exports.addStudentToCourse = addStudentToCourse;
module.exports.dropStudentFromCourse = dropStudentFromCourse;
module.exports.getCourse = getCourse;
module.exports.getAssignments = getAssignments;
module.exports.getInstructor = getInstructor;
module.exports.getStudents = getStudents;
module.exports.deleteCourse = deleteCourse;
module.exports.updateCourse = updateCourse;