const mongoose = require('mongoose');
require('./QuestionAnswer');
require('./QuestionIndex');
const QuestionSet = new mongoose.Schema({
  setName: {
    type: String,
    required: true,
  },

  linkedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'QuestionIndex',
    required: true,
  }
});
module.exports = mongoose.model("QuestionSet", QuestionSet);
