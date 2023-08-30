const { User, Thought } = require('../models');

module.exports = {
    // get all users
    async getUsers(req,res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    // get one user
    async getOneUser(req,res) {
        try {
            const user = await User.findOne( { _id: req.params.userId } )
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

            if(!user) {
                return res.status(404).json( {message: 'No such user exists'} )
            }

            const thought = await Thought.findOneAndUpdate(
                { username: req.params.userId },
                { $pull: { username: req.params.userId } },
                { new: true }
            );

            if (!thought) {
                return res.status(404).json( { message: 'User deleted, but no thought found' } )
            }
            res.json({ message: 'User successfully deleted' })

        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // update a user information

    async updateUser(req, res){
        try {
            const user = await User.findOneAndUpdate({ id: req.params.userId })
                .select('-__v');

            if (!user) {
                return res.status(404).json( { message: 'User not found' } )
            }

        res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    }
};