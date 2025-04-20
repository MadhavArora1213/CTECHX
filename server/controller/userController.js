const GameProgress = require('../models/GameProgress');

// Get user's game statistics
exports.getGameStats = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ message: 'User ID required' });
    
    const gameProgress = await GameProgress.findOne({ userId });
    if (!gameProgress) {
      return res.status(404).json({ message: 'Game progress not found' });
    }
    
    res.json({
      level: gameProgress.level,
      xp: gameProgress.xp,
      completedMissions: gameProgress.completedMissions.length,
      unlockedPlanets: gameProgress.unlockedPlanets.length,
      unlockedAchievements: gameProgress.unlockedAchievements.length
    });
  } catch (error) {
    console.error('Error fetching game stats:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user's achievements
exports.getAchievements = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ message: 'User ID required' });
    
    const gameProgress = await GameProgress.findOne({ userId });
    if (!gameProgress) {
      return res.status(404).json({ message: 'Game progress not found' });
    }
    
    // Get all achievements and mark which ones are unlocked
    const achievements = await Achievement.find({});
    const achievementsWithStatus = achievements.map(achievement => ({
      ...achievement.toObject(),
      unlocked: gameProgress.unlockedAchievements.includes(achievement._id.toString())
    }));
    
    res.json(achievementsWithStatus);
  } catch (error) {
    console.error('Error fetching achievements:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get leaderboard data
exports.getLeaderboard = async (req, res) => {
  try {
    const { type = 'total', limit = 10 } = req.query;
    
    // Validate leaderboard type
    const validTypes = ['total', 'fullStack', 'ai', 'android', 'cybersecurity', 'devops', 'algorithms'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({ message: 'Invalid leaderboard type' });
    }
    
    // Get top players based on XP type
    const leaderboard = await GameProgress.find()
      .sort({ [`xp.${type}`]: -1 })
      .limit(Number(limit));
    
    // Format leaderboard data
    const formattedLeaderboard = leaderboard.map(entry => ({
      userId: entry.userId,
      xp: entry.xp[type],
      level: entry.level
    }));
    
    res.json(formattedLeaderboard);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Change primary path (specialization)
exports.changePrimaryPath = async (req, res) => {
  try {
    const { userId, primaryPath } = req.body;
    if (!userId) return res.status(400).json({ message: 'User ID required' });
    
    // Validate path
    const validPaths = ['fullStack', 'ai', 'android', 'cybersecurity', 'devops', 'algorithms'];
    if (!validPaths.includes(primaryPath)) {
      return res.status(400).json({ message: 'Invalid path selection' });
    }
    
    // Update game progress with new path
    const gameProgress = await GameProgress.findOneAndUpdate(
      { userId },
      { primaryPath },
      { new: true }
    );
    
    if (!gameProgress) {
      return res.status(404).json({ message: 'Game progress not found' });
    }
    
    res.json({ 
      message: 'Primary path updated successfully',
      primaryPath: gameProgress.primaryPath 
    });
  } catch (error) {
    console.error('Error changing primary path:', error);
    res.status(500).json({ message: 'Server error' });
  }
};