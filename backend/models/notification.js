const mongoose = require('mongoose');
const Assignment = require('./assignment');


const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    student_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    assignment_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Assignment', required: true},
    title: {type: String, required:true},
    explanation: {type:String, required:true},
    active: {type: Boolean, default:true,required:false}
}, {
    timestamps: true,
});

const Notification = mongoose.model('Notification', notificationSchema);

/* Following function creates a new notification and returns the id of
    created notification

    example callback call => callback(err,notification_id)
 */
const createNotification = (student_id,assignment_id,title,explanation,callback)=>{
    let not_obj = new  Notification({
        student_id:student_id,
        assignment_id:assignment_id,
        title:title,
        explanation:explanation,
        active:true
    });
    not_obj.validate().then( value=>{
        not_obj.save()
        .then(callback(null))
        .catch((err)=> callback("Saving notification problem to DB"));
    }
        
    ).catch(
        err=>{
            return callback("Validation Error");
        }
    );
}

/* Following function deletes the notification

    example callback call => callback(err) 
 */
const deleteNotification = (notification_id,callback)=>{
    Notification.findById(notification_id).then(not_obj=>{
        if(!not_obj) return callback("NotificationID is not valid ");
        Notification.findByIdAndDelete(notification_id,(err)=>{if(err)return callback("Delete Problem in DB")});
        return  callback(null);}
    ).catch(
        err=>{
            return callback(err);
        }
    );
}

/* Following function returns notification and when the operation
    ends successfully, deactivates the notification automatically
    
    exmple callback call => callback(err,notification)
 */
const getNotification = (notification_id, callback)=>{
    Notification.findById(notification_id)
 .then(
     not_obj=>{
        if(!not_obj) return callback("NotificationID is not valid ",null);
        return callback(null,not_obj);
     }
 ).catch(
     err=>{
    callback(err,null)}
 );
}



module.exports.model = Notification

module.exports.createNotification = createNotification;
module.exports.getNotification = getNotification;
module.exports.deleteNotification = deleteNotification;