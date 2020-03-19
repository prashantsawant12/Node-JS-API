const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name:String,
    contact:String,
    email:String,
    password:String
}, {
    timestamps: true
});

module.exports = mongoose.model('User',UserSchema);