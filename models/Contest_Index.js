const mongoose = require('mongoose')

const contestIndexSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    startTime: {
        type: Date,
        required: true,
    },

    endTime: {
        type: Date,
        required: true,
    },

    isPublic: {
        type: Boolean,
        required: true,
        default: true,
    }
});

module.exports = mongoose.model("ContestIndex", contestIndexSchema);