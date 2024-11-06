const User = require('../models/userModel');
const bcrypt = require("bcryptjs");
const errorModel = require('../models/error-model');
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
        if(existingUser && isValidPassword){
            generateToken(res, existingUser._id, existingUser.email); // here, second & third param is payload
            // res.json({ userId: existingUser.id, email: existingUser.email, token}); // just token = token: token
            res.json({ userId: existingUser.id, email: existingUser.email}); // removed the token else we have to return it from the generateToken.
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
    // mern-app way | Yogantaram
    // let userProfile;
    // try{
    //      userProfile = await User.findById(req.user._id);
    // } catch (err) {
    //     return next(errorModel(404, "Unable to find user profile !!"));
    // }

    // res.json({userProfile});
    // res.json({userProfile: userProfile.toObject({ getters: true })}); // just to get the id without underscore. Which might not be nessesary everytime.

    // MERN E-Commerce way -------------- I'd use this approach -----------------<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    const user = await User.findById(req.user._id);

    if (user) {
        // res.json({ // by this we can get the only those information that we would like to provide.
        // _id: user._id,
        // name: user.name,
        // email: user.email,
        // isAdmin: user.isAdmin,
        // });
        res.json({user});
    } else {
        return next(errorModel(404, "Unable to find user profile !!"));
    }
}

const updateUserProfile = async (req, res, next) => {
    const user = await User.findById(req.user._id); 
    // mern-app | Yogantaram (admin-controller --> patchProduct)
    // In this we are getting the user Id from req.param. Bc this is how we are providing it using the endpoint.
    // MERN E-Commerce
    // req.user._id , we are getting this from the auth file. As we are setting req.user = payload that we get in the cookie.

    if (user) {
        // const {name, email, password} = req.body; See how its done in the Yogantaram
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = await bcrypt.hash(req.body.password, 12);
        }

        const updatedUser = await user.save();
        // we are stroing the user in a variable so that we could show the selected data in the response.
        // You can also send the complete user in the updatedSuer in the response. Refer - Yogantaram project
        res.json({_id: updatedUser._id, name: updatedUser.name, email: updatedUser.email, isAdmin: updatedUser.isAdmin});
    } else {
        return next(errorModel(404, "User not found!!"));
    }
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