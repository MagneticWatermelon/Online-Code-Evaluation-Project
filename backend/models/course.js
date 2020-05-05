const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const courseSchema = new Schema({
    course_code: {type: Number, required: true},
    year: {type: Number, required:true},
    term: {type: String, required: true},
    name: {type: String, required: true},
}, {
    timestamps: true,
});

/* Following function creates a course with given parameters
   example callback call => callback(err)
 */
const createCourse = (course_code, year, term, name, instructor_id, callback)=>{
   console.log(course_code)
   console.log(year)
   console.log(term)
   console.log(name)
   console.log(instructor_id)
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
      callback(null,{
         course_code: '',
         term:'',
         name:''
      })
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
const updateCourse = (course_id, name, course_code, year, term, callback)=>{

}

const Course = mongoose.model('Course', courseSchema);
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