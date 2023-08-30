const { Thought } = require('../models');

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
            res.json(thought)
        } catch (err) {
            res.status(500).json(err)
        }
    },

    // delete a thought
    async deleteThought(req,res) {
        try {
            const thought = await Thought.findOneAndRemove( { _id: req.params.thoughtId } );

            if(!user) {
                return res.status(404).json( {message: 'No such thought exists'} )
            }

            res.json({ message: 'Thought successfully deleted' })

        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // update a thought information

    async updateThought(req, res){
        try {
            const thought = await Thought.findOneAndUpdate({ id: req.params.thoughtId })
                .select('-__v');

            if (!thought) {
                return res.status(404).json( { message: 'Thought not found' } )
            }

        res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    }
};