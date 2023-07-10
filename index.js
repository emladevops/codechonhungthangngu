const bodyParser = require('body-parser');
const express = require('express')
require('body-parser')

const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('./middleware/auth');
mongoose.connect("mongodb://localhost:27017/vnmt");


const app = express();

app.use(express.json());
app.use(bodyParser({extended: true}))

require("./src/auth")(app);



app.listen(8080);