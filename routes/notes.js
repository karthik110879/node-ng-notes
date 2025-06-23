const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Folder = require('../models/Folder');
const Note = require('../models/Note');
const router = express.Router();


//create notes
router.post('/user/:userId/folder/:folderId/note', async (req, res) => {
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

// get all notes 
router.get('/user/:userId/folders/:folderId/notes', async (req, res) => { 
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

//Update note 
router.post('/user/:userId/folders/:folderId/notes/:noteId', async (req, res) => {
    const { folderId, name } = req.body;
    try {
        console.log('Reached Update note ');
        return res.status(200).json('Reached Update note')
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

//Delete note 
router.post('/user/:userId/folders/:folderId/notes/:noteId', async (req, res) => {
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
