const mongoose = require('mongoose');

const ActivitySchema = mongoose.Schema({
    name: { type: String, trim: true },
    id: { type: Number, trim: true },
    location: {
        address: { type: String, trim: true },
    },
    cost: { type: String, trim: true },
    thumb: { type: String, trim: true },
});
