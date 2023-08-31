const router = require('express').Router();

const {
    getUsers,
    getOneUser,
    createUser,
    deleteUser,
    updateUser,

} = require('../../controllers/userController');

// /api/user

router.route('/').get(getUsers).post(createUser);

// /api/user/:userId
router.route('/').get(getOneUser).delete(deleteUser);

// /api/user/:userId/friends
