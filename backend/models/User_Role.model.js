const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userModelSchema = new Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    user_role: {type: Number, required: true}
}, {
    timestamps: true,
});

const User_Role = mongoose.model('User_Role', userModelSchema);
module.exports = User_Role;