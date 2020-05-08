const mongoose = require('mongoose');
const Assignment = require('./assignment');


const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    student_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    assignment_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Assignment', required: true},
    title: {type: String, required:true},
    explanation: {type:String, required:true},
    active: {type: Boolean, default:true}
}, {
    timestamps: true,
});

const Notification = mongoose.model('Notification', notificationSchema);

/* Following function creates a new notification and returns the id of
    created notification

    example callback call => callback(err,notification_id)
 */
const createNotification = (student_id,assignment_id,title,explanation,callback)=>{

}

/* Following function deletes the notification

    example callback call => callback(err) 
 */
const deleteNotification = (notification_id,callback)=>{

}

/* Following function returns notification and when the operation
    ends successfully, deactivates the notification automatically
    
    exmple callback call => callback(err,notification)
 */
const getNotification = (notification_id, callback)=>{
    
}



module.exports.model = Notification

module.exports.createNotification = createNotification;
module.exports.getNotification = getNotification;
module.exports.deleteNotification = deleteNotification;