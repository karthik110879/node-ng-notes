const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Session = require("../models/Session");
const router = express.Router();

//Register
router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ msg: "User already exsists" });
        const hashed = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashed });
        await user.save();
        res.status(201).json({ msg: "User Created" });
    } catch (error) {
        console.error("Register error:", error.message);
        res.status(500).send("Server Error");
    }
});

//Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    console.log('User Input ==>', email , password);
    
    // debugger;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Invalid Credentials" });

        const isMatch = bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" }); 
        console.log('Before creating a session');
        
        // create a session
        const session = await Session.create({
            userId: user._id,
            userAgent: req.headers['user-agent'],
            ip: req.ip,
        });

        console.log('Session created while login flow ==>', session);
        
        // while issuing a jwt include the session id aswell , so that for every req we can check the session activeness
        const token = jwt.sign(
            { 
                id: user.userId, 
                email: user.email ,  
                sessionId: session.sessionId
            }, 
            process.env.JWT_SECRET, 
            { 
                expiresIn: process.env.JWT_EXPIRATION_TIME 
            }
        );

        console.log('A fully signed Token ==>', token);  
        res.json({
            token,
            user: { 
                id: user.userId, 
                username: user.username, 
                email: user.email,
                // settingId: user.userSettingsId || null
            },
        });
    } catch (error) {
        console.log('Error while login');
        
        res.status(500).send("Server Error");
    }
});

//Logout
router.post("/logout", async (req, res) => {
      const sessionId = req.session?._id;
    console.log('WHILE LOGOUT ==> ', sessionId);
    
})

module.exports = router;
