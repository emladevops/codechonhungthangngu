const bodyParser = require('body-parser');
const express = require('express')
require('body-parser')

const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const Contest = require('../models/Contest');
const Contest_Index = require('../models/Contest_Index');

module.exports = function(app) {
    app.post('/api/beta/contest/getContest', auth.isAdmin, async(req, res) => {
        Contest.find({}, function(err, list) {
            res.send(list);
        })
    })
}