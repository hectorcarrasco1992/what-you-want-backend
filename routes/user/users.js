const express = require('express');
const router = express.Router();
const { signUp, login } = require('./userController/userController');

/* GET users listing. */
router.post('/login', login);
router.post('/register', signUp);

module.exports = router;
