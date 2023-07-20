const bodyparser = require('body-parser')
const express = require('express')

const mongoose = require('mongoose')
const User = require('../models/User');
const QuestionSet = require('../models/QuestionSet')
const QuestionIndex = require('../models/QuestionIndex')
const QuestionAnswer = require('../models/QuestionAnswer')


const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

const Contest = require('../models/Contest')
const ContestIndex = require('../models/Contest_Index')

const Group = require('../models/Groups')

require('dotenv')

module.exports = function(app) {
  app.post('/api/beta/question/new', auth.isAdmin, async(req, res) => {
    let {title, isFCE, body, ans1, ans2, ans3, ans4} = req.body;

    if (isFCE=="true") isFCE = true;
    else isFCE = false;

    try {
      if (isFCE == true && ans1 != undefined && ans2 != undefined && ans3 != undefined && ans4 != undefined) {
        await QuestionIndex.create({
          title: title,
          isFCE: isFCE,
          body: body,
          ans1: ans1,
          ans2: ans2,
          ans3: ans3,
          ans4: ans4,
        });
      } else {
        await QuestionIndex.create({
          title: title,
          isFCE: isFCE,
          body: body,
        });
      }
      await QuestionIndex.create({
        title: title,
        isFCE: isFCE, //modified
        body: body,
      })
    } catch (e) {
      res.status(500).send(e);
    }
  });
  
}
