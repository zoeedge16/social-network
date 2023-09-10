const router = require('express').Router();
const {
    getThoughts,
    getOneThought,
    createThought,
    deleteThought,
    updateThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtController');

// /api/thoughts

router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId

router.route('/:thoughtId').get(getOneThought).put(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtId/reactions

router.route('/:thoughtId/reactions').post(createReaction)

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);
module.exports = router