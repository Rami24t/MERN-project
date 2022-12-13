const jwt = require('jsonwebtoken'); // description: https://www.npmjs.com/package/jsonwebtoken
const bcrypt = require('bcryptjs'); // description: https://www.npmjs.com/package/bcryptjs
const asyncHandler = require('express-async-handler'); // description: https://www.npmjs.com/package/express-async-handler
const User = require('../models/userModel');

// private because: used to generate a token for a user
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}


// public because: used to register a new user / login an existing one

//@desc Register/Add a user
//@route POST /api/users
//@access Public 
const addUser = asyncHandler(async (req, res) => {
    if(!req.body || !req.body.name || !req.body.email || !req.body.password) {
        res.status(400)
        throw new Error('Missing fields');
    }
    const {name, email, password} = req.body;

    const userExists = await User.findOne({ email });
    if(userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    //make hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name, email, password: hashedPassword
    })

    if(user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }
    else {
        res.status(400);
        throw new Error('Invalid user data');
    }
    // console.log(req.body);
    // res.status(200).json({ message: 'User added successfully!', user });
})

//@desc Authenticate/LogIn a user
//@route POST /api/users/login
//@access Public
const logInUser = asyncHandler(async (req, res) => {
    if(!req.body || !req.body.email || !req.body.password) {
        res.status(400)
        throw new Error('Missing fields');
    }
    const {email, password} = req.body;
    const userExists = await User.findOne({ email });
    if(userExists && (await bcrypt.compare(password, userExists.password))) {
        res.status(200).json({
            _id: userExists._id,
            username: userExists.username,
            email: userExists.email,
            token: generateToken(userExists._id)
        })
    }
        else
        {
            res.status(400);
            throw new Error('Invalid username and password combination');
        }
})

//@desc Get the users
//@route GET /api/users
//@access Private
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.status(200).json({ message: 'Getting users', users });
})


// private because: used to get the user's profile
//@desc Get user profile/data
//@route POST /api/users/myprofile
//@access Private
const getMyProfile = asyncHandler(async (req, res) => {
    if(!req.user) {
        res.status(400)
        throw new Error('No user!');
    }
//    console.log(req.body);
const {_id, name, email} = req.user;
    res.status(200).json({ success: true, user: {_id, name, email} });
})


//@desc Update user
//@route PUT /api/users/:id
//@access Private
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if(user) {
        user.text = req.body.text || user.text;
        const updatedUser = await user.save();
        res.status(200).json({ message: 'User updated successfully!', updatedUser });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
})

//@desc Delete user
//@route DELETE /api/users/:id
//@access Private
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if(user) {
        await user.remove();
    } else {
        res.status(404);
        throw new Error('User not found');
    }
    res.status(200).json({ message: 'User deleted successfully!', user });
})

module.exports = { getMyProfile, logInUser , getUsers, addUser, updateUser, deleteUser }