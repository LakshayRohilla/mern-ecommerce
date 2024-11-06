const User = require('../models/userModel');
const bcrypt = require("bcryptjs");
const errorModel = require('../models/error-model');
const jwt = require('jsonwebtoken');
const generateToken = require('../utils/generate-token');

const authUser = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return next(errorModel(401, "User not found, could not log you in."));
        }

        const isValidPassword = await bcrypt.compare(password, existingUser.password);

        if (!isValidPassword) {
            return next(errorModel(401, "Invalid credentials, could not log you in."));
        }
        if(existingUser){
            generateToken(res, existingUser._id, existingUser.email); // here, second & third param is payload
            res.json({ userId: existingUser.id, email: existingUser.email, token}); // just token = token: token
        }
    } catch (err) {
        return next(errorModel(500, "Login failed, please try again later."));
    }
};

const registerUser = async (req, res, next) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email }); // here, just email means => email:email

    if (userExists) {
        return next(errorModel(400, "User already exists"));
    }

    const hashedPassword = await bcrypt.hash(password, 12); 

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    if (user) {
        generateToken(res, user._id, user.email); // here, second & third param is payload
        res.status(201).json({_id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin});
    } else {
        return next(errorModel(400, "User registration failed !!"));
    }
}

const logoutUser = async (req, res, next) => {
    res.cookie('jwt', '' ,{ httpOnly: true, expires: new Date(0)}); // jwt is the name of the cookie, that we provided at the time we created it.
    res.status(200).json({message: 'Logged out successfully !!'});
}

const getUserProfile = async (req, res, next) => {
    res.send("User Profile !!!")
}

const updateUserProfile = async (req, res, next) => {
    res.send("Update User Profile !!!")
}

// For admin :

const getUsers = async (req, res, next) => {
    res.send("Get all users !!!")
}

const getUserById = async (req, res, next) => {
    res.send("Get user by ID !!!")
}

const deleteUser = async (req, res, next) => {
    res.send("Delete user !!!")
}

const updateUser = async (req, res, next) => {
    res.send("Update user !!!")
}

module.exports = {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUserById,
    deleteUser,
    updateUser
  };