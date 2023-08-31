const { User, Thought } = require('../models');

module.exports = {
    // get all thoughts
    async getThoughts(req,res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    // get one thought
    async getOneThought(req,res) {
        try {
            const thought = await Thought.findOne( { _id: req.params.thoughtId } )
                .select('-__v');
            if (!thought) {
                return res.status(404).json( {message: 'No thought with that ID'} )
            }
            res.json(thought)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    // create a thought
    async createThought(req,res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { username: req.body.username },
                { $push: { thoughts: thoughts._id } },
                { new: true }
            );
            if(!user) {
                return res.status(404).json( { message: 'Thought created, but user does not exist.' } )
            }
            res.json( { message: 'Thought created' } )
        } catch (err) {
            res.status(500).json(err)
        }
    },

    // delete a thought
    async deleteThought(req,res) {
        try {
            const thought = await Thought.findOneAndDelete( { _id: req.params.thoughtId } );
            res.status(200).json(thought)
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // update a thought information

    async updateThought(req, res){
        try {
            const thought = await Thought.findOneAndUpdate({ id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true });
            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // create reaction
    async createReaction(req, res){
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'reaction created, thought not found' });
            }

            res.json({ message: 'Reaction Created!' })
        } catch (err) {
            res.status(500).json(err)
        }
    },

    // delete reaction
    async deleteReaction(req, res){
        
    }
};