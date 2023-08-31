const router = require('express').Router();

const {
    getUsers,
    getOneUser,
    createUser,
    deleteUser,
    updateUser,
    addFriend,
    deleteFriend

} = require('../../controllers/userController');

// /api/user

router.route('/').get(getUsers).post(createUser);

// /api/user/:userId
router.route('/:userId').get(getOneUser).put(updateUser).delete(deleteUser);

// /api/user/:userId/friends/:friendId

router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router