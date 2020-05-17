const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    announcement_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Announcement', required: true},
    comment: {type: String, required: true},
}, {
    timestamps: true,
});

const Comment = mongoose.model('Comment', commentSchema);


/* Following function creates a new comment
    example callback call => callback(err)
*/
const createComment = (user_id,announcement_id, comment,callback)=>{
    Comment.findOne({
        user_id: user_id,
        announcement_id: announcement_id,
        comment: comment,
    })
    .then(flag => {
        if (!flag) {
            const com = new Comment({
                user_id: user_id,
                announcement_id: announcement_id,
                comment: comment
            });
            com.validate()
            .then(check => {
                com.save()
                .then(res => {
                    return callback(null);
                })
                .catch(err => {
                    return callback("Comment could not be createed");
                })
            })
            .catch(err => {
                return callback("Bad parameters");
            })
        } else {
            return callback("Comment already exists");
        }
    })
    .catch(err => {
        return callback("Comment caould not be created");
    })
  

}

/* Following function deletes the comment
    example callback call => callback(err)
 */
const deleteComment = (comment_id, callback)=>{
    Comment.findByIdAndDelete(comment_id)
    .then(res => {
        if (!res) {
            return callback("Unvalid course");
        } else {
            return callback(null);
        }
    })
    .catch(err => {
        return callback("Error occured")
    });

}


/* Following function returns the comment
    example callback call => callback(err, comment)
 */
const getComment    = (comment_id,callback)=>{
    Comment.findById(comment_id)
    .then(comment=>{
        if(!comment){return callback('Not found',null)}
        return callback(null,comment)
    })
    .catch(err=>{
        return callback('Comment not found',null)
    })
}


/* Following function updates the comment
    example callback call => callback(err)
 */
const updateComment = (comment_id, comment, callback)=>{
    Comment.findByIdAndUpdate(comment_id, {
        $set: {
            comment: comment,
        }
    })
    .then(result => {
        if (!result) {
           return callback("Comment could not be updated");
        } else {
           return callback(null);
        }
     })
     .catch(err => {
        return callback("Error while updating the comment");
     });
}



module.exports.model = Comment;

module.exports.createComment = createComment;
module.exports.deleteComment = deleteComment;
module.exports.getComment    = getComment;
module.exports.updateComment = updateComment;
