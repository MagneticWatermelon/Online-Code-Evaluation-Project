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

}

/* Following function deletes the comment
    example callback call => callback(err)
 */
const deleteComment = (comment_id, callback)=>{

}


/* Following function returns the comment
    example callback call => callback(err, comment)
 */
const getComment    = (comment_id,callback)=>{

}


/* Following function updates the comment
    example callback call => callback(err)
 */
const updateComment = (comment_id, comment, callback)=>{

}




module.exports.model = Comment;

module.exports.createComment = createComment;
module.exports.deleteComment = deleteComment;
module.exports.getComment    = getComment;
module.exports.updateComment = updateComment;
