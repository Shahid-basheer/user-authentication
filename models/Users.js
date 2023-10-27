const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniquevalidator = require("mongoose-unique-validator");


const UserSchema = new Schema({
    username: {
        type: String,
        unique: '{VALUE} Username already registered',
        required: [true, 'Username is required '],
    },
    email: {
        type: String,
        unique: '{VALUE} email already registered',
        required: [true, 'email is required'],
        match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    },
    password: {
        type: String,
        unique: true,
        required: [true, 'password is required'],
    },
    roles: {
        type: String,
        default: "user",
        enum: {
            values: ["user", "admin"],
            message: '{VALUE} is not supported'
        }
    }
})

UserSchema.plugin(uniquevalidator)
module.exports = mongoose.model("users", UserSchema);