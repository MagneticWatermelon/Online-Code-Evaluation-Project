const mongoose = require('mongoose');
const CourseGiven = require('./course_given');
const CourseTaken = require('./course_taken');
const Assignment = require('./assignment');


const Schema = mongoose.Schema;

const courseSchema = new Schema({
    course_code: {type: String, required: true, unique: true},
    year: {type: Number, required: true},
    term: {type: String, required: true},
    name: {type: String, required: true},
}, {
    timestamps: true,
});


const Course = mongoose.model('Course', courseSchema);
//const CourseGiven = mongoose.model('Course_Given', course_given_schema);

/* Following function creates a course with given parameters
   example callback call => callback(err)
 */
const createCourse = async (course_code, year, term, name, callback)=>{
   //check if the same course exists
   const cors = await Course.findOne({
      course_code: course_code     
   });
   if(cors)
   {
      return callback("DUPLICATE COURSE");
   }

   //if it does not exist
   else
   {
      try{
         const course = new Course({
            course_code: course_code,
            term: term,
            year: year,
            name: name
         });
         await course.validate();
         const result = await course.save();
         return callback(null);
      }
      catch(e){
         return callback();
      }
   }  
      
}

/* Following function associates the given instructor with the course
   example callback call => callback(err)
 */
const associateInstructorWithCourse = async (course_id, instructor_id, callback)=>{
   //check for duplicates
   const flag = await CourseGiven.findOne({
      course_id: course_id,
      instructor_id: instructor_id
   });
   if(flag){
      return callback("Duplicate error");
   }
   else {
      try {
         const courseGiven = new CourseGiven({
            course_id: course_id,
            instructor_id: instructor_id,
         });
         await courseGiven.validate();
         const result = await courseGiven.save();
         return callback(null);
      } catch (e) {
         return callback("An error occured while creating data");         
      }
   }

   
}

/* Following function drops instructor from the course
   example callback call => callback(err)
*/
const dropInstructorFromCourse = async (course_id, instructor_id, callback)=>{
   
   try {
      const result =await CourseGiven.findOneAndDelete({
         course_id: course_id,
         instructor_id: instructor_id,
      });
      return callback(null);
   } catch (e) {
      return callback(e);
   }


}

/* Adds student to course
   example callback call => callback(err)
 */
const addStudentToCourse = async (course_id, student_id, callback)=>{
   const flag = await CourseTaken.findOne({
      course_id: course_id,
      student_id: student_id
   });
   if (flag) {
      return callback("Duplicate entry error");
   } else {
      try {
         const course_taken = new CourseTaken({
            student_id: student_id,
            course_id: course_id
         });
         
         await course_taken.validate();
         const result = await course_taken.save();
         return callback(null);         
      } catch (e) {
         return callback(e)
      }
   }

}

/* Drops student from course
   example callback call => callback(err)
 */
const dropStudentFromCourse =async (course_id, student_id, callback)=>{
   try {
      const result  =await CourseTaken.findOneAndDelete({
         student_id: student_id,
         course_id: course_id
      });
      return callback(null);
   } catch (e) {
      return callback(e);
   }
}

/* Returns course as a jason object
   example callback call => callback(err,course)
 */
const getCourse = async (course_id, callback)=>{
   try {
      const course = await Course.findById(course_id);      
      return callback(null, course);
   } catch (e) {
      return callback("Not found", null)
   }  

   

}

/* Returns the assignment ids from this course
    example callback call => callback(err, arrayOfAssignmentIDs) 
 */
const getAssignments = async (course_id, callback)=>{
   try {
      const assigns = await Assignment.model
         .find({course_id: course_id})
         .select({"_id": 0});
      return callback(null, assigns);
   } catch (error) {
      return callback("Error occured", null);
   }
}

/* Returns the id of the instructor who associated with this course
    example callback call => callback(err, instructor_id)
 */
const getInstructor = async(course_id, callback)=>{
   try {
      const instructor = await CourseGiven
         .find({course_id: course_id})
         .select({instructor_id: 1});
         return callback(null, instructor);
   } catch (e) {
      return callback("Error occured", null);
   }

}

/* Returns an array of student ids who are taking this course
    example callback(err, arrayOfStudentIDs)
 */
const getStudents = async (course_id, callback)=>{
   try {
      const result = await CourseTaken
         .find({course_id: course_id})
         .select({student_id: 1});
      return callback(null, result);
      
   } catch (e) {
      return callback("Error occured", null)
   }

}

/* Deletes the course
   example callback call => callback(err)
 */
const deleteCourse = async (course_id, callback)=>{
   try {
      const result = await Course.findByIdAndDelete(course_id);
      return callback(null);
   } catch (e) {
      return callback("Error occured");
   }
}

/* Updates course properties
    example callback call => callback(err)
 */
const updateCourse = async (course_id, title, course_code, term, year, callback)=>{

      try {
         const course = await Course.findByIdAndUpdate(course_id, {
            $set: {
               title: title,
               course_code: course_code,
               term: term,
               year: year
            }
            
         });

         return callback(null);
      } 
      catch (error) {
         return callback("Error occured");
      }
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