const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Folder = require('../models/Folder');
const Note = require('../models/Note');
const router = express.Router();
const tokenMiddlewear = require('../middlewears/tokenMiddlewear');

//create folder
router.post('/user/:userId/folder/', async (req, res) => {
    const {title} = req.body;
    const {userId} = req.params;
    try {
        console.log('userId', userId,'name', title, req.body );
        // const existing = await User.findOne({email});
        // if(existing) return res.status(400).json({msg: 'User already exsists'});

        // const hashed = await bcrypt.hash(password, 10);
        const newFolder = new Folder({name: title, userId:userId});
        await newFolder.save();
        res.status(201).json({msg: 'Create folder'});
    } catch (error) {
        // console.error('Register error:', error.message); 
        res.status(500).send('Server Error');
    }
})

// get all folders
router.get('/user/:userId/folders', tokenMiddlewear , async (req, res) => {
    const {userId} = req.params;
    try {
        const allFolders = await Folder.find({userId});
        return res.status(200).json(allFolders)
    } catch (error) {
        res.status(500).send('Error while fetching folders')
    }
})

//Update folder 
router.post('/folder/:folderId', tokenMiddlewear , async (req, res) => {
    const { folderId, name } = req.body;
    try {
        const user = await User.findOne({ email });
        if(!user) return res.status(400).json({msg: 'Invalid Credentials'});

        const isMatch = bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({msg: "Invalid Credentials"});

        // const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRATION_TIME});
        // res.json({token, user: {id: user._id, username: user.username, email: user.email} });
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

//Delete folder 
router.delete('/user/:userId/folder/:folderId', tokenMiddlewear , async (req, res) => {
    // const { folderId, name } = req.body;
    const {folderId} = req.params;
    try {
        const folderToDelete = await Folder.findOne({folderId});
        if (!folderToDelete) {
            return res.status(404).json({ message: 'Folder not found or does not belong to the user' });
        }
        // check if the folder has notes if it has any notes throw error under lying notes exist cannot delete folder
        const notesInFolder = await Note.find({folderId});
        if (notesInFolder.length > 0) {
            return res.status(400).json({ message: 'Cannot delete folder with existing notes' });
        }
        // If the folder exists and has no notes, delete it
        console.log('Reached Delete folder with params', folderId); 
        const deletdFolder = await Folder.findOneAndDelete({folderId});
        if(!deletdFolder) {
            return res.status(404).json({ message: 'Folder not found or does not belong to the user' });
        }
        return res.status(200).json({ msg: 'Folder deleted successfully' })
    } catch (error) {
        res.status(500).send('Error while fetching folders')
    }
});

module.exports = router;
