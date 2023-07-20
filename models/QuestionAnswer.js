const mongoose = require('mongoose');

const QuestionAnswer = new mongoose.Schema({
  SubmittedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  QIndex: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'QuestionIndex',
    required: true,
  },
  
  __debug: {
    default: false
  },

  UAnswer: {
    type: String,
    required: true,
  },
  
  AResult: {
    type: String,
    required: false,
    default: "Pending for judgement..."
  },

  QStatus: {
    type: Boolean,
    required: true,
    default: false,
    // If false, then the admin check isn't completed
  },

});


module.exports = mongoose.model("QuestionAnswer", QuestionAnswer); 
