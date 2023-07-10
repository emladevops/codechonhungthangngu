const bodyParser = require('body-parser');
const express = require('express')
require('body-parser')

const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const Groups = require('../models/Group')

module.exports = function(app) {
    app.post('/api/beta/groups/new', async(req, res) => {
        const {name} = req.body;
        console.log(name);
        try {
            const groups = await Groups.create({
                name: name,
            });
            await groups.save();
            res.status(200).send("Success");
        }
        catch (e) {
            res.status(500).send("An error occured. " + e)
        }
        
    })

    app.post('/api/beta/groups/list', async(req, res) => {
        let groupsAvailable = await Groups.find();
        res.status(200).send(groupsAvailable);
    })
}