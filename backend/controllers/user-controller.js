const User = require('../models/userModel');

const authUser = async (req, res, next) => {
    res.send("Auth User !!!!")
}

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