const mongoose = require('mongoose');

const TestResultSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // For now, making it optional
  },
  userEmail: {
    type: String,
    required: false
  },
  results: {
    overall: {
      correct: Number,
      total: Number,
      percentage: Number
    },
    subjects: {
      type: Map,
      of: {
        correct: Number,
        total: Number,
        percentage: Number
      }
    }
  },
  answers: [{
    type: Number // Array of selected option indexes
  }],
  completedAt: {
    type: Date,
    required: true
  },
  testDuration: {
    type: Number, // in seconds
    default: 3000
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('TestResult', TestResultSchema);
