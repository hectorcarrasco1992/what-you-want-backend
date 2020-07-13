const express = require('express');
const router = express.Router();

const {
    signUp,
    login,
    findFriend,
} = require('./userController/userController');


router.post('/login', login);
router.post('/register', signUp);
router.post('/find-friend', findFriend);

module.exports = router;
