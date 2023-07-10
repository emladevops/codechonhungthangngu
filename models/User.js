const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: String,
    token: {
        type: String,
    },
    
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    phone: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true,
    },
    updatedAt: {
        type: Date,
        default: () => Date.now(),
    },
    isAdmin: {
        type: Boolean,
        required: false,
        default: false,
    }
})

module.exports = mongoose.model("User", userSchema);