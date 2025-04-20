const mongoose = require('mongoose');

const AchievementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: 'default-achievement.png'
  },
  criteriaType: {
    type: String,
    enum: ['totalXP', 'techXP', 'missionCount', 'level', 'planetsMastered'],
    required: true
  },
  criteriaValue: {
    type: Number,
    required: true
  },
  techType: {
    type: String,
    enum: ['fullStack', 'ai', 'android', 'cybersecurity', 'devops', 'algorithms'],
    default: null
  },
  rarity: {
    type: String,
    enum: ['common', 'uncommon', 'rare', 'epic', 'legendary'],
    default: 'common'
  }
});

module.exports = mongoose.model('Achievement', AchievementSchema);