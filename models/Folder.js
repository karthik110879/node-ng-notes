const mongoose = require('mongoose');
const idGenerator = require('../helpers/idGenerator');



const FolderSchema = new mongoose.Schema({
    folderId: {
        type: String,
        unique: true,
        default: () => idGenerator('FLDR'),
    },
    userId: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: true,
    },
    isStared: {
        type: Boolean,
        required: false,
        default: false
    }
}, {timestamps: true})

module.exports = mongoose.model('Folder', FolderSchema);
