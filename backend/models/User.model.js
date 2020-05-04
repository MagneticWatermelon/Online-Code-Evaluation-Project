const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    profile_photo: {type: Buffer, required: false},
    mail: {type: String, required: true},
    password_hash: {type: String, required: true},
    salt: {type: String, required: true},
    date: {type: Date, default: Date.now}
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);
module.exports = User;