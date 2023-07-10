const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false, // Only visible to admins
    },
});

module.exports = mongoose.model("Group", GroupSchema);