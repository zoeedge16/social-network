const { User } = require('../models');

module.exports = {
    // get all users
    async getUsers(req,res) {
        try {
            const users = await User.find().populate({ path: 'thoughts' });
            res.json(users);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    // get one user
    async getOneUser(req,res) {
        try {
            const user = await User.findOne( { _id: req.params.userId } ).populate('thoughts', 'friends')
                .select('-__v');
            if (!user) {
                return res.status(404).json( {message: 'No user with that ID'} )
            }
            res.json(user)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    // create a user
    async createUser(req,res) {
        try {
            const user = await User.create(req.body);
            res.json(user)
        } catch (err) {
            res.status(500).json(err)
        }
    },

    // delete a user and remove their thought
    async deleteUser(req,res) {
        try {
            const user = await User.findOneAndRemove( { _id: req.params.userId } );
            res.status(200).json({ message: `${user} deleted` })

        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // update a user information

    async updateUser(req, res){
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId }, 
                { $set: req.body }, 
                { runValidators: true, new: true }
            );
            res.status(200).json(user)
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // add friend 

    async addFriend(req,res) {
       try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId} },
            { runValidators: true, new: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'Friend added, user not found' })
        }
        res.json({ message: 'Friend added' })
       } catch(err) {
        res.status(500).json(err)
       }
    },

    // delete friend

    async deleteFriend(req,res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: {friends: req.params.friendId} },
                { new: true }
            );

        if (!user) {
            return res.status(404).json( { message: 'User not found' } )
        }

        res.json( { message: 'friend deleted' } )
        } catch (err) {
            res.statue(500).json(err)
        }
    }
};