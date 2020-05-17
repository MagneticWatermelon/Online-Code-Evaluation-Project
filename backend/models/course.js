const mongoose = require('mongoose');
const CourseGiven = require('./course_given');
const CourseTaken = require('./course_taken');
const Assignment = require('./assignment');
const Announcement = require('./announcement');
const Resource = require('./resource');
const Grade    = require('./grade');
const User     = require('./user')
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
            return callback(null, course._id)
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
      if (flag){return callback(null);}
      else {
         course_taken = new CourseTaken({
            student_id: student_id,
            course_id: course_id
         });
         course_taken.validate()
         .then(()=>{
            course_taken.save()
            .then(result => {
               return callback(null)
            })
            .catch(err=>{
               return callback(err);
            });
         })
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

const getAssignmentsWithGrades = (course_id,student_id,callback)=>{
   Assignment.model
        .find({course_id:course_id})
        .select({title:1,_id:1,due_date:1})
        .then(assignments=>{
            let promises = assignments.map(async assignment=>{
                return new Promise((resolve,reject)=>{
                    let obj     = assignment.toObject()
                    let date    = assignment.due_date

                    obj.status  = Date.parse(date)>Date.now() ? 'Closed' : 'Open'
                
                    Grade.model
                    .findOne({assignment_id:assignment._id, student_id:student_id})
                    .then(result=>{
                        if(!result){obj.grade = null;resolve(obj);return;}
                        obj.grade = result.grade
                        resolve(obj);
                    })
                    .catch(err=>{
                        obj.grade = null
                        resolve(obj);
                    })
                })
            })

            Promise.all(promises)
            .then(results=>{
                callback(null,results)
            })
            .catch(err=>{
                console.log(err)
                callback('Cannot get assignments', null)
            })
        })
        .catch(err=>{
            console.log(err)
            callback('Cannot get assignments', null)
        })
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
               return callback(result);
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
   .then(announcements => {
      if (!announcements) {return callback("No announcement found", null);} 
      
      let promises = announcements.map(async announcement=>{
         return User.model
         .findById(announcement.instructor_id)
         .select({name:1,profile_photo:1,_id:0})
         .then(instructor=>{
            let obj = announcement.toObject()
            obj['instructor'] = instructor
            return obj;
         })
         .catch(err=>{
            let obj = announcement.toObject()
            obj['instructor'] = {name:'',profile_photo:''}
            return obj;
         })
      })

      Promise.all(promises)
      .then(result=>{
         return callback(null,result)
      })
      .catch(err=>{
         return callback('Cannot get announcements',null)
      })

   })
   .catch(err => {
         return callback("Error occured while getting announcements", null);
   });
}

/* Following function returns the resource_ids of the given course

   example callback call => callback(err, resource_ids)
 */
const getResources = (course_id, callback)=>{
   Course.findById(course_id)
   .then(course=>{
      if(!course){return callback('Course id is invalid',null)}
      Resource.model.find({course_id:course_id})
      .select()
      .then(resources=>{
         let promises = resources.map(async resource=>{
            return new Promise((resolve,reject)=>{
               User.model
               .findById(resource.instructor_id)
               .select({name:1})
               .then(person=>{
                  let obj = resource.toObject()
                  obj.instructor = person.name
                  resolve(obj)
               })
               .catch(err=>{
                  let obj = resource.toObject()
                  obj.instructor = 'undefined'
                  resolve(obj)
               })
            })
         })

         Promise.all(promises)
         .then(results=>{
            return callback(null,results)
         })
      })
      .catch(err=>{
         return callback('Cannot get course\'s resources',null)
      })
   })
   .catch(err=>{
      return callback('Course id is invalid',null)
   })
}

/* Following function computes average grade of the student from all assignments
 */
const getAverageGrade = (student_id, course_id, callback)=>{
   Assignment.model
   .find({course_id:course_id})
   .select({_id:1, weight:1})
   .then(assignments=>{

      let gradePromises = assignments.map(async function(assignment){
         let score   = await Grade.getGrade(student_id,assignment._id)
         let weight  = assignment.weight
         let item    = {'score':score,'weight':weight};
         return item;
      })
      Promise.all(gradePromises)
      .then(grades=>{
         let averageGrade = grades.map(function(grade){
            if(grade.score){return ((grade.score*grade.weight)/100)}
            return 0;
         }).reduce((a,b)=>(a+b))
         return callback(null,Math.round(averageGrade))
      })
      .catch(err=>{
         return callback('Grade cannot be calculated',null)
      })
   })
   .catch(err=>{
      return callback('Grade cannot be calculated',null)
   })
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
module.exports.getAverageGrade            = getAverageGrade;
module.exports.getAssignmentsWithGrades   = getAssignmentsWithGrades;