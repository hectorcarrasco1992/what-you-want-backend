const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, trim: true },
    username: {
        type: String,
        unique: 'username must be unique',
        require: true,
    },
    email: { type: String, unique: 'email must be unique', trim: true },
    password: { type: String, trim: true },
    likes: { type: Array },
    dislikes: { type: Array },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    zipCode: { type: Number, trim: true },
});

module.exports = mongoose.model('User', UserSchema);
