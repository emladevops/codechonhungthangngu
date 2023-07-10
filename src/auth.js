const bodyParser = require('body-parser');
const express = require('express')
require('body-parser')

const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

module.exports = function(app) {



app.get('/', (req, res) => {
    res.send("Cannot GET /");
})

app.post('/api/beta/auth/register', async (req, res) => {
    try {
        const { name, password, email, phone } = req.body;
        if (!(name && email && password && phone)) {
            res.status(404).send("Missing data");
        }

        if (await User.findOne({ email })) {
            res.status(409).send("Email already in database");
        }
        
        encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name: name, 
            password: encryptedPassword,
            email: email,
            phone: phone,
        });

        const token = jwt.sign({
            user_id: user._id, email
        },
        "emladevops", {
            expiresIn: "24h",
        }
        );
        user.token = token;

        user.save();

        res.status(201).json(user);
    }
    catch(e) {
        console.error(e);
    }
})

app.post('/api/beta/auth/login', async (req, res) => {
    try {
    const {email, password} = req.body;
    if(!(email && password)) {
        res.status(400).send("All fields are required");
    }

    const user = await User.findOne({email});
    console.log(user);

    if(user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({
            user_id: user._id, email
        },
        "emladevops" /* TODO: Change this in production environment */, {
            expiresIn: "24h",
        }
        );
        user.token = token;
        await user.save();
        res.status(200).json(user);
    }
    else { res.status(400).send("Invalid credentials");} 
    }
    catch (e) {
        console.error(e);
    }
})

app.post('/api/beta/auth/isAdmin', auth.isAdmin, async (req, res) => {
    res.status(200).send("Valid");
})

app.post('/api/beta/auth/loggedIn', auth.validToken, async(req, res) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    let user = await User.findOne({token});

    res.status(200).send("Hi there, " + user.name);
})

app.post('/api/beta/auth/changeinfo', auth.validToken, async(req, res) => {
    const currtoken = req.body.token || req.query.token || req.headers["x-access-token"];
    const { targetEmail } = req.body;
    const { newEmail, newPhone, newPassword, newName, newAdmin } = req.body;
    try {
        let currentUser = await User.findOne({token: currtoken});
        let userToUpdate = await User.findOne({email: targetEmail});
        if (userToUpdate.token != currtoken && currentUser.isAdmin == false) {
            res.status(500).send("You don't have permission to update this user.")
        }
        if (userToUpdate.token == currtoken || currentUser.isAdmin == true) {
            if (newEmail != null && newEmail != undefined && newEmail != '') {
                userToUpdate.email = newEmail;
            }
            if (newPhone != null && newPhone != undefined && newPhone != '') {
                userToUpdate.phone = newPhone;
            }
            if (newPassword != null && newPassword != undefined && newPassword != '') {
                encryptedPassword = await bcrypt.hash(newPassword, 10);
                userToUpdate.password = encryptedPassword;
                // Revoke current session and token
                userToUpdate.token = null;
            }
            if (newName != null && newName != undefined && newName != '') {
                userToUpdate.name = newName;
            }
            
            let isTrueSet = /^true$/i.test(newAdmin);
            if (isTrueSet == true || isTrueSet == false) {
                userToUpdate.isAdmin = isTrueSet;
                console.log("updated");
            }
            
            userToUpdate.save();
        }
        res.status(200).send();
    } catch(e) {
        res.status(500).send(e);
    }
})

app.post('/api/beta/profile/lookup', async(req, res) => {
    try {
        const { keyword } = req.body.keyword;
        const token = req.body.token || req.query.token || req.headers["x-access-token"];
        let authenticated = false;
        let currentUser;
        if (token == null || token == undefined) {
            authenticated = false;
        }
        else {
            authenticated = true;
            currentUser = await User.findOne({token: token});
        }

        if (keyword == 'true' === 'false') {
            throw("What are you doing?");
        }
        
        let finder;
        if (authenticated) {
            if (currentUser.isAdmin == true) {
                finder = await User.find({keyword}).select(["-token", "-password"]);
            }
            if (currentUser.isAdmin == false) {
                finder = await User.find({keyword}).select(["-token", "-createdAt", "-updatedAt", "-email", "-phone", "-password", "-isAdmin"]);
            }
        } 

        if (!authenticated) {
            finder = await User.find({keyword}).select(["-token", "-createdAt", "-updatedAt", "-email", "-phone", "-password", "-isAdmin"]);
        }
        
        console.log(finder + ' ' + keyword);
        res.status(200).json(finder);
    } catch (e) {
        console.log(e);
        res.status(409).send(e);
    }
})

app.post('/api/beta/auth/groups/add', auth.isAdmin, async(req, res) => {
    const { userid, groupid } = req.body;
    console.log(userid);
    try {
        let ModifyingUser = await User.findById(userid);
        ModifyingUser.ContestGroups = groupid;
        await ModifyingUser.save();
        res.status(200).send("Completed");
    }
    catch (e) {
        res.status(500).send("An error occured");
    }
});
}