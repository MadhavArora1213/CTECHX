const mongoose = require('mongoose');

const MissionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  planetId: {
    type: String,
    required: true,
    index: true
  },
  techType: {
    type: String,
    enum: ['fullStack', 'ai', 'android', 'cybersecurity', 'devops', 'algorithms'],
    required: true
  },
  type: {
    type: String,
    enum: ['code', 'puzzle', 'quiz', 'dragdrop'],
    required: true
  },
  difficulty: {
    type: Number,
    min: 1,
    max: 5,
    default: 1
  },
  xpReward: {
    type: Number,
    default: 100
  },
  timeLimit: {
    type: Number, // in seconds
    default: 0 // 0 means no time limit
  },
  content: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  solution: mongoose.Schema.Types.Mixed,
  expectedOutput: String,
  hints: [String],
  prerequisites: [{
    type: String // Mission IDs
  }],
  questions: [{ // For quiz-type missions
    question: String,
    options: [String],
    correctAnswer: Number
  }],
  passingScore: {
    type: Number,
    default: 70 // Percentage required to pass
  }
});

module.exports = mongoose.model('Mission', MissionSchema);