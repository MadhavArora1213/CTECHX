const mongoose = require('mongoose');

const GameProgressSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  primaryPath: {
    type: String,
    enum: ['fullStack', 'ai', 'android', 'cybersecurity', 'devops', 'algorithms'],
    default: 'fullStack'
  },
  xp: {
    total: { type: Number, default: 0 },
    fullStack: { type: Number, default: 0 },
    ai: { type: Number, default: 0 },
    android: { type: Number, default: 0 },
    cybersecurity: { type: Number, default: 0 },
    devops: { type: Number, default: 0 },
    algorithms: { type: Number, default: 0 }
  },
  level: {
    type: Number,
    default: 1
  },
  completedMissions: [{
    type: String
  }],
  unlockedPlanets: [{
    type: String
  }],
  unlockedAchievements: [{
    type: String
  }],
  inventory: [{
    itemId: String,
    name: String,
    type: String,
    description: String,
    acquiredAt: Date
  }],
  lastActivity: {
    type: Date,
    default: Date.now
  }
});

// Create compound index for efficient queries
GameProgressSchema.index({ userId: 1, lastActivity: -1 });

module.exports = mongoose.model('GameProgress', GameProgressSchema);