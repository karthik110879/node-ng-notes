const jwt = require('jsonwebtoken');
const Session = require('../models/Session');



const tokenMiddlewear = async (req, res, next) => {
    //get token from the header 
    const authHeader = req.headers.authorization; 
    console.log('Got Authorization Header ==>', authHeader);

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log('Unable to Authorize the token', authHeader);
        return res.status(401).json({message: 'NOT AUTHORIZED'});
    }

    const token = authHeader.split(' ')[1];
    console.log('Actual token after cleanup ==>', token);
    
    try {
        console.log('Trying to decode the token for validity');
        const decoded = jwt?.verify(token, process.env.JWT_SECRET)
        console.log('decoded', decoded);
        //decoded ex: { id: '68591d6307782246b4f44d4e', iat: 1750863174, exp: 1750866774 }
        const session = await Session.findOne({sessionId: decoded.sessionId});
        console.log('session From DB', session);
        
        if(!session || !session.isValid) {
            return res.status(401).json({message: 'Session expired or invalidated'});
        }

        req.session = session;
        req.user = {id: decoded.id }
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' }); 
    }
}


module.exports = tokenMiddlewear;