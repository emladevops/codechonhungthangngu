const mongoose = require('mongoose');

const QuestionIndex = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 50,
  },

  isFCE: {
    type: Boolean,
    required: true,
    default: false,
  },
  
  body: {
    type: String,
    required: false,
    default: "",
  },

  // If the case is FCE
  //
    
  ans1: {
    type: Boolean,
    default: false,
    required: true,
  },

  ans2: {
    type: Boolean,
    default: false,
    required: true,
  },
  ans3: {
    type: Boolean,
    default: false,
    required: true,
  },
  ans4: {
    type: Boolean,
    default: false,
    required: true,
  },
});

module.exports = mongoose.model("QuestionIndex", QuestionIndex);
