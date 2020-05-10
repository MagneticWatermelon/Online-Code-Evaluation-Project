const mongoose = require('mongoose');
const CourseGiven = require('./course_given');
const CourseTaken = require('./course_taken');
const Assignment = require('./assignment');
const Announcement = require('./announcement');


const Schema = mongoose.Schema;

const courseSchema = new Schema({
    course_code: {type: String, required: true, unique: true},
    year: {type: Number, required: true},
    term: {type: String, required: true},
    name: {type: String, required: true}
}, {
    timestamps: true,
});


const Course = mongoose.model('Course', courseSchema);
//const CourseGiven = mongoose.model('Course_Given', course_given_schema);

/* Following function creates a course with given parameters
   example callback call => callback(err, course.id)
 */
const createCourse = (course_code, year, term, name, callback)=>{
   //check if the same course exists
   Course.findOne({course_code: course_code})
   .then(cors=>{
      if(cors){return true}
      return false;
   })
   .then(doesExist=>{
      if(doesExist){return callback('Course already exist', null)}
      const course = new Course({
         course_code: course_code,
         term: term,
         year: year,
         name: name
      });
      course.validate()
      .then(result=>{
         course.save()
         .then(result=>{
            return callback(null, cors._id)
         })
         .catch(err=>{
            console.log(err)
            return callback('Course cannot be created',null)
         })
      })
      .catch(err=>{
         return callback('Bad parameters', null)
      })


   })

   .catch(err=>{
      return callback(err,null)
   })
}

/* Following function associates the given instructor with the course
   example callback call => callback(err)
 */
const addInstructorToCourse = (course_id, instructor_id, callback)=>{
   //check for duplicates
   CourseGiven.findOne({
      course_id: course_id,
      instructor_id: instructor_id
   })

   .then(flag=>{
      if(flag){return true;}
      return false
   })
   .then(isDuplicate=>{

      if(isDuplicate){return callback("Duplicate error");}
   
      const courseGiven = new CourseGiven({
         course_id: course_id,
         instructor_id: instructor_id,
      });

      courseGiven.validate()
      .then(result=>{
         courseGiven.save()
         .then(result=>{
            return callback(null)
         })
         .catch(err=>{
            return callback(err)
         })
      })
      .catch(err=>{
         return callback(err)
      })
   })

   .catch(err=>{
      return callback(err)
   })
}

/* Following function drops instructor from the course
   example callback call => callback(err)
*/
const dropInstructorFromCourse = (course_id, instructor_id, callback)=>{  
   
       CourseGiven.findOneAndDelete({
         course_id: course_id,
         instructor_id: instructor_id,
      })
      .then(result=>{
         return callback(null);
      })
      .catch(err=>{
         return callback("Error while deleting");
      })
  

}

/* Adds student to course
   example callback call => callback(err)
 */
const addStudentToCourse = (course_id, student_id, callback)=>{
   CourseTaken.findOne({
      course_id: course_id,
      student_id: student_id
   })
   .then(flag=>{
      if (flag){
         return callback("Duplicate error");
      } else {
         course_taken = new CourseTaken({
            student_id: student_id,
            course_id: course_id
         });
         course_taken.validate();
         course_taken.save()
         .then(result => {
            return callback(null)
         })
         .catch(err=>{
            return callback("Error while inserting data");
         });
      }
   })
   
   
}

/* Drops student from course
   example callback call => callback(err)
 */
const dropStudentFromCourse = (course_id, student_id, callback)=>{
         CourseTaken.findOneAndDelete({
         student_id: student_id,
         course_id: course_id
      })
      .then(result => {
         if(result)
         {
            return callback(null);
         }
         else{
            return callback("Course could not find");
         }
      })
      .catch(err => 
         {
            return callback("Error while dropping student from the course");
         });
   
}

/* Returns course as a jason object
   example callback call => callback(err,course)
 */
const getCourse = (course_id, callback)=>{
      Course.findById(course_id)
      .then(result => {
         if (!result) {
            return callback("Course could not found", null);
         } else {
            return callback(null, result);
         }

      })
      .catch(err => {
         return callback("Error while getting the course", null);
      })
}

/* Returns the assignment ids from this course
    example callback call => callback(err, arrayOfAssignmentIDs) 
 */
const getAssignments = (course_id, callback)=>{
      Assignment.model
         .find({course_id: course_id})
         .select({"_id": 0})
         .then(result => {
            if (!result) {
               return callback("Assignment could not found", null);
            } else {
               return callback(null, result);
            }
         })
         .catch(err => {
            return callback("Error occured" ,null);
         });     
   
}

/* Returns the id of the instructor who associated with this course
    example callback call => callback(err, instructor_id)
 */
const getInstructors = (course_id, callback)=>{
       CourseGiven
         .find({course_id: course_id})
         .select({instructor_id: 1})
         .then(result => {
            if (!result) {
               return callback("Instructor could not found", null);
            } else {
               return callback(null, result);
            }
         })
         .catch(err => {
            return callback("Error occured" ,null);
         }); 
}

/* Returns an array of student ids who are taking this course
    example callback(err, arrayOfStudentIDs)
 */
const getStudents = async (course_id, callback)=>{
 
       CourseTaken
         .find({course_id: course_id})
         .select({student_id: 1})
         .then(result => 
            {
               if (!result) {
                  return callback("Student could not found", null);
               } else {
                  return callback(null, result);
               }
            })
            .catch(err => {
               return callback("Error occured" ,null);
            }); 
}

/* Deletes the course
   example callback call => callback(err)
 */
const deleteCourse =  (course_id, callback)=>{
  
      Course.findByIdAndDelete(course_id)
      .then(result => {
         if (!result) {
            return callback("Course couldnt found");
         } else {
            return callback(null);
         }
      })
      .catch(err => {
         return callback("Error while deleting the course");
      })
      
   
}

/* Updates course properties
    example callback call => callback(err)
 */
const updateCourse =  (course_id, title, course_code, term, year, callback)=>{     
         Course.findByIdAndUpdate(course_id, {
            $set: {
               title: title,
               course_code: course_code,
               term: term,
               year: year
            }
            
         })
         .then(result => {
            if (!result) {
               return callback("Course could not be updated");
            } else {
               return callback(null);
            }
         })
         .catch(err => {
            return callback("Error while updating the course");
         });
}

/* Following function returns the announcement ids of the given course

   example callback call => callback(err,announcement_ids)
 */
const getAnnouncements = (course_id, callback)=>{
   Announcement.model
   .find({course_id: course_id})
   .select({"_id": 0})
   .then(result => {
      if (!result) {
         return callback("No announcement found", null);
      } else {
         return callback(null, result);
      }
      })
      .catch(err => {
         return callback("Error occured while getting announcements", null);
      });
}

/* Following function returns the resource_ids of the given course

   example callback call => callback(err, resource_ids)
 */
const getResources = (course_id, callback)=>{

}

/* Following function computes average grade of the student from all assignments
 */
const getAverageGrade = (student_id,callback)=>{

}


module.exports.model = Course;
module.exports.createCourse               = createCourse;
module.exports.addInstructorToCourse      = addInstructorToCourse;
module.exports.dropInstructorFromCourse   = dropInstructorFromCourse;
module.exports.addStudentToCourse         = addStudentToCourse;
module.exports.dropStudentFromCourse      = dropStudentFromCourse;
module.exports.getCourse                  = getCourse;
module.exports.getAssignments             = getAssignments;
module.exports.getInstructors             = getInstructors;
module.exports.getStudents                = getStudents;
module.exports.deleteCourse               = deleteCourse;
module.exports.updateCourse               = updateCourse;
module.exports.getAnnouncements           = getAnnouncements;
module.exports.getResources               = getResources;
module.exports.getAverageGrade            = getAverageGrade