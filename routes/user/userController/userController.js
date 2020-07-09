const User = require('../model/User');
const bcrypt = require('bcryptjs');
const dbErrorHelper = require('../../lib/dbErrorHelper/dbErrorHelper');
const jwtHelper = require('../authHelpers/jwtHelper');

module.exports = {
    signUp: async (req, res) => {
        try {
            let createdUser = new User({
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                city: req.body.city,
                state: req.body.state,
                zipCode: req.body.zipCode,
            });
            let genSalt = await bcrypt.genSalt(12);
            let hashedPassword = await bcrypt.hash(
                createdUser.password,
                genSalt
            );
            createdUser.password = hashedPassword;
            await createdUser.save();
            res.json({
                message: 'User created',
            });
        } catch (e) {
            res.status(500).json({
                message: dbErrorHelper(e),
            });
        }
    },

    login: async (req, res) => {
        console.log(req.body);

        try {
            let foundUser = await User.findOne({
                email: req.body.email,
            }).select('-__v -userCreated');
            if (foundUser === null) {
                throw Error('User not found, please sign up.');
            }
            let comparedPassword = await jwtHelper.comparePassword(
                req.body.password,
                foundUser.password
            );
            if (comparedPassword === 409) {
                throw Error('Check your email and password.');
            }
            let jwtToken = await jwtHelper.createJwtToken(foundUser);
            res.json({
                jwtToken: jwtToken,
            });
        } catch (e) {
            console.log(e);

            res.status(500).json({
                message: dbErrorHelper(e),
            });
        }
    },

    findFriend: async (req, res) => {
        try {

            console.log('req.body', req.body)
            let foundFriend = await User.findOne({
                username: req.body.username,
            });
            console.log('found friend:', foundFriend);

            res.send(foundFriend);
        } catch (error) {

            console.log(error);
        }
    },
};
