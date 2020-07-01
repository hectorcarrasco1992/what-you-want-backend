const mongoose = require('mongoose');

const ActivitySchema = mongoose.Schema({
    name: { type: String, trim: true },
    cuisines:{type:String,trim:true},
    location: {
        address: { type: String, trim: true },
    },
    cost: { type: String, trim: true },
    thumb: { type: String, trim: true },
});

module.exports = mongoose.model("Activity",ActivitySchema)
