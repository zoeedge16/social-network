const router = require('express').Router();
const thoughtRoute = require('./thoughtRoute');
const userRoute = require('./userRoute');

router.use('/thoughts', thoughtRoute);
router.use('/user', userRoute);

module.exports = router;