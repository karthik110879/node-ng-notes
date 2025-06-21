const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();


//create folder
router.post('fldr/', async (req, res) => {
    const {name} = req.body;
    console.log(name);
    try {
        // const existing = await User.findOne({email});
        // if(existing) return res.status(400).json({msg: 'User already exsists'});

        // const hashed = await bcrypt.hash(password, 10);
        // const user = new User({username, email, password: hashed});
        // await user.save();
        res.status(201).json({msg: 'Create folder'});
    } catch (error) {
        // console.error('Register error:', error.message); 
        res.status(500).send('Server Error');
    }
})

//Update folder 
router.post('/fldr/:folderId', async (req, res) => {
    const { folderId, name } = req.body;
    try {
        const user = await User.findOne({ email });
        if(!user) return res.status(400).json({msg: 'Invalid Credentials'});

        const isMatch = bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({msg: "Invalid Credentials"});

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRATION_TIME});
        res.json({token, user: {id: user._id, username: user.username, email: user.email} });
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
