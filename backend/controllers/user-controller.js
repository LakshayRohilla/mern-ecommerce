const User = require('../models/userModel');
const bcrypt = require("bcryptjs");
const errorModel = require('../models/error-model');
const jwt = require('jsonwebtoken');

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

        let token;
            try {
                token = jwt.sign( 
                { userId: existingUser.id, email: existingUser.email }, 
                process.env.JWT_SECRET, // keep in mind for the login and signup keys should be the same.
                { expiresIn: '1h' } 
                );
            } catch {
                return next(errorModel(500, "Logging in failed, please try again later : Token error."));
            }
        
        // Set JWT as HTTP-Only cookie
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development', // we always keep the secure to true to have the https, but not in the development
            sameSite: 'strict',// to prevent attacks
            maxAge: 3600000 // 1 hr
        })    


        res.json({ userId: existingUser.id, email: existingUser.email, token}); // just token = token: token
    } catch (err) {
        return next(errorModel(500, "Login failed, please try again later."));
    }
};

const registerUser = async (req, res, next) => {
    res.send("Register User !!!")
}

const logoutUser = async (req, res, next) => {
    res.send("Logout User !!!")
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

exports.authUser = authUser;
exports.registerUser = registerUser;
exports.logoutUser = logoutUser;
exports.getUserProfile = getUserProfile;
exports.updateUserProfile = updateUserProfile;
exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.deleteUser = deleteUser;
exports.updateUser = updateUser;