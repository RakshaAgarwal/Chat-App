const mongoose = require('mongoose')

//Here we are using new because mongoose.Schema is a class and hence userSchema is an object
const userSchema = new mongoose.Schema({
name: { type: String, required: true, minlength: 3, maxlength: 30},
email: { type: String, required: true, minlength: 3, maxlength: 100, unique: true},
password: {type: String, required: true, minlength: 3, maxlength: 1024}
}, {
    timestamps: true
}) 

const userModel = mongoose.model('User', userSchema)
module.exports = userModel