const mongoose = require('mongoose');
const idGenerator = require('../helpers/idGenerator');
 
const UserSchema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true,
        default: () => idGenerator('USER'),
    },
    userSettingsId: {
        type: String,
        unique: true,
        default: () => idGenerator('SETNG'),
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String,
        required: false,
        default: null
    },
}, {timestamps: true})

module.exports = mongoose.model('User', UserSchema);