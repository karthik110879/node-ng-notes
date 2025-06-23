const mongoose = require('mongoose');
const idGenerator = require('../helpers/idGenerator');



const NoteSchema = new mongoose.Schema({
    noteId: {
        type: String,
        unique: true,
        default: () => idGenerator('NOTE'),
    },
    folderId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: false,
        default: ''
    },
    description: {
        type: String,
        required: true,
        default: ''
    }
}, {timestamps: true})

module.exports = mongoose.model('Note', NoteSchema);
