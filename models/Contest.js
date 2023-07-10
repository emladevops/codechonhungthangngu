const mongoose = require('mongoose');
const ContestIndex = require('./Contest_Index')
const User = require('./User')
const ContestSchema = new mongoose.Schema({
    userid: {
        type: User,
        required: true,
    },

    contestid: {
        type: ContestIndex,
        required: true,
    }
});

module.exports = mongoose.model("Contest", ContestSchema);