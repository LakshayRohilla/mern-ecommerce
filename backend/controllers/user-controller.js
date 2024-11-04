const User = require('../models/userModel');
const bcrypt = require("bcryptjs");
const errorModel = require('../models/error-model');

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

        res.json({ userId: existingUser.id, email: existingUser.email });
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