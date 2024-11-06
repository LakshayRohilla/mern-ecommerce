const express = require("express");
const router = express.Router();
const userController = require('../controllers/user-controller');
// We can also do, const {authUser,
    // registerUser,
    // logoutUser,
    // getUserProfile,
    // updateUserProfile,
    // getUsers,
    // getUserById,
    // deleteUser,
    // updateUser} require('../controllers/user-controller');
// Then just use the names.
const {protect, admin} = require('../middleware/auth-middleware');

// router.get('/', userController.getUsers);
// router.post("/registerUser", userController.registerUser);
router.route('/').post(userController.registerUser).get(protect, admin, userController.getUsers);
// You just dont have to be protected, but should be an admin too.
router.post("/logout", userController.logoutUser);
router.post("/login", userController.authUser);
// router.get("/userProfile", userController.getUserProfile);
// router.put("/updateUserProfile", userController.updateUserProfile);
router.route('/profile')
.put(protect, userController.updateUserProfile)
.get(protect, userController.getUserProfile);
// router.get("/:uid", userController.getUserById);
// router.delete("/:uid", userController.deleteUser);
// router.put("/:uid", userController.updateUser);
router.route('/:uid').delete(protect, admin, userController.deleteUser).get(protect, admin, userController.getUserById).put(protect, admin, userController.updateUser);

module.exports = router;