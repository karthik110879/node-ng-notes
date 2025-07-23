const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Folder = require('../models/Folder');
const Note = require('../models/Note');
const router = express.Router();
const tokenMiddlewear = require('../middlewears/tokenMiddlewear');


// get all notes 
router.get('/user/:userId/folders/:folderId/notes', tokenMiddlewear , async (req, res) => { 
    const {userId} = req.params;
    const {folderId} = req.params;
    try {
        console.log('Reached get all notes');
        const allNotes = await Note.find({userId, folderId});
        return res.status(200).json(allNotes)
    } catch (error) {
        res.status(500).send('Error while fetching folders')
    }
})
 
//create notes
router.post('/user/:userId/folder/:folderId/note', tokenMiddlewear , async (req, res) => {
    const {title} = req.body;
    const {content} = req.body;
    const {userId} = req.params;
    const {folderId} = req.params;
    try { 
        const newNote = new Note({
            title: title, 
            content:content,
            folderId: folderId,
            userId: userId
        });
        console.log('newNote',newNote);
        
        await newNote.save();
        res.status(201).json({msg: `Create Note ${newNote.noteId}`});
    } catch (error) {
        // console.error('Register error:', error.message); 
        res.status(500).send(`Server Error ${error}`);
    }
})

//Update note 
router.post('/user/:userId/folders/:folderId/notes/:noteId', tokenMiddlewear , async (req, res) => {
    // const { folderId, name } = req.body;
    const {title, content} = req.body; 
    const {userId, folderId, noteId} = req.params; 
    console.log('Reached Update note with params', userId, folderId, noteId, title, content);
    
    try {
        console.log('Reached Update note ');
        const updatedNote = await Note.findOneAndUpdate({ noteId },{ title, content });

        if (!updatedNote) {
            return res.status(404).json({ message: 'Note not found or does not belong to the user' });
        }

        return res.status(200).json({ msg: 'Note updated successfully', note: updatedNote });
        //find the record from mongo DB and update it
 

     
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

//Delete note 
router.post('/user/:userId/folders/:folderId/notes/:noteId', tokenMiddlewear , async (req, res) => {
    const { folderId, name } = req.body;
    try {
        console.log('Reached Delete note ');
        // const user = await User.findOne({ email });
        // if(!user) return res.status(400).json({msg: 'Invalid Credentials'});

        // const isMatch = bcrypt.compare(password, user.password);
        // if(!isMatch) return res.status(400).json({msg: "Invalid Credentials"});

        // const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRATION_TIME});
        // res.json({token, user: {id: user._id, username: user.username, email: user.email} });
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
