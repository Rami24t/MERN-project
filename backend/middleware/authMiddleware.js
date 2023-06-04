const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// authorize user
const authorizeUser = asyncHandler(async (req, res, next) => {
    console.log(req.headers);
    const token = req.headers?.authorization;
    if(token && token.startsWith('Bearer') && token.split(' ')[1] !== 'null' && token.split(' ')[1] !== 'undefined' && token.split(' ')[1] !== ''){
        try{
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        next(); // to pass control to the next middleware
        }
        catch(err){
            console.log(err.message);
            res.status(401); 
            throw new Error('Authorization failed ')
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
})

module.exports = { authorizeUser }