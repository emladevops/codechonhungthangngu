const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');

const middlewares = {

    validToken: (req, res, next) => {
        const token = req.body.token || req.query.token || req.headers["x-access-token"];
    
        if (!token) {
            res.status(403).send("A token is required for your action");
        }
    
        try {
            const decoded = jwt.verify(token, "emladevops");
            req.user = decoded;
        }
        catch (e) {
            return res.status(401).send("Invalid auth token");
        }
        return next();
    },

    isAdmin: async(req, res, next) => {
        const token = req.body.token || req.query.token || req.headers["x-access-token"];

        if (!token) {
            res.status(403).send("A token is required for your action");
        }
    
        try {
            const decoded = jwt.verify(token, "emladevops");
            req.user = decoded;
            let user2 = await User.findOne({token});
            console.log(await user2.isAdmin);

            if(await user2.isAdmin == true) {next()}
            else {return res.status(403).send("Not an admin")}
        }
        catch (e) {
            return res.status(403).send("Not an admin");
        }
        return next();
    },
}

module.exports = middlewares;