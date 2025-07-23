const mongoose = require("mongoose");
const idGenerator = require('../helpers/idGenerator');


const SessionSchema = new mongoose.Schema({
    sessionId: {
        type: String,
        unique: true,
        require:true,
        default: () => idGenerator('SESS'),
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    userAgent: String,
    ip: String,
    createdAt: {
        type: Date,
        default: Date.now,
        expires: "2d", // Optional: auto-delete after 30 days
    },
    isValid: {
        type: Boolean,
        default: true,
    },
});

module.exports = mongoose.model('Session', SessionSchema)