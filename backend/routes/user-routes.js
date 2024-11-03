const express = require("express");
const router = express.Router();
const userController = require('../controllers/user-controller');

// router.get('/', userController.getUsers);
// router.post("/registerUser", userController.registerUser);
router.route('/').post(userController.registerUser).get(userController.getUsers);
router.post("/logout", userController.logoutUser);
router.post("/login", userController.authUser);
// router.get("/userProfile", userController.getUserProfile);
// router.put("/updateUserProfile", userController.updateUserProfile);
router.route('/profile').post(userController.updateUserProfile).get(userController.getUserProfile);
// router.get("/:uid", userController.getUserById);
// router.delete("/:uid", userController.deleteUser);
// router.put("/:uid", userController.updateUser);
router.route('/:uid').delete(userController.deleteUser).get(userController.getUserById).put(userController.updateUser);

module.exports = router;