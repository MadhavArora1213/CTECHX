const GameProgress = require('../models/GameProgress');
const Achievement = require('../models/Achievement');
const { shouldUnlockPlanet } = require('../utils/gameLogic');

exports.getGameProgress = async (req, res) => {
  try {
    const { userId } = req.query;
    // With Firebase, we'll use the userId from the query or token
    if (!userId) return res.status(400).json({ message: 'User ID required' });
    
    const gameProgress = await GameProgress.findOne({ userId });
    
    if (!gameProgress) {
      // If no progress exists yet, create initial progress
      const newProgress = new GameProgress({
        userId,
        xp: { total: 0, fullStack: 0, ai: 0, android: 0, cybersecurity: 0, devops: 0, algorithms: 0 },
        level: 1,
        completedMissions: [],
        unlockedPlanets: ['codeforge'],
        unlockedAchievements: []
      });
      
      await newProgress.save();
      return res.json(newProgress);
    }
    
    return res.json(gameProgress);
  } catch (error) {
    console.error('Error fetching game progress:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getPlanets = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ message: 'User ID required' });
    
    const gameProgress = await GameProgress.findOne({ userId });
    if (!gameProgress) {
      return res.status(404).json({ message: 'Game progress not found' });
    }
    
    // Predefined planet data
    const planets = [
      {
        id: 'codeforge',
        name: 'CodeForge',
        description: 'Build. Debug. Deploy.',
        techType: 'fullStack',
        difficulty: 1,
        image: '/assets/planets/codeforge.png'
      },
      {
        id: 'neuron',
        name: 'Neuron',
        description: 'Train your AI pet and beat evil corrupted datasets.',
        techType: 'ai',
        difficulty: 2,
        image: '/assets/planets/neuron.png'
      },
      {
        id: 'droidcore',
        name: 'DroidCore',
        description: 'Repair the Android OS core by building apps for citizens.',
        techType: 'android',
        difficulty: 2,
        image: '/assets/planets/droidcore.png'
      },
      {
        id: 'cryptia',
        name: 'Cryptia',
        description: 'Infiltrate enemy systems, defend your code, decrypt the vaults.',
        techType: 'cybersecurity',
        difficulty: 3,
        image: '/assets/planets/cryptia.png'
      },
      {
        id: 'devopsprime',
        name: 'DevOps Prime',
        description: 'Deploy fleets of microservices across the galaxy.',
        techType: 'devops',
        difficulty: 3,
        image: '/assets/planets/devopsprime.png'
      },
      {
        id: 'algomatrix',
        name: 'AlgoMatrix',
        description: 'Defeat bugs in the algorithm arena.',
        techType: 'algorithms',
        difficulty: 4,
        image: '/assets/planets/algomatrix.png'
      }
    ];

    // Mark which planets are unlocked for the user
    const planetsWithUnlockStatus = planets.map(planet => ({
      ...planet,
      unlocked: gameProgress.unlockedPlanets.includes(planet.id)
    }));

    res.json(planetsWithUnlockStatus);
  } catch (error) {
    console.error('Error fetching planets:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getMissions = async (req, res) => {
  try {
    const { planetId } = req.params;
    const { userId } = req.query;
    
    if (!userId) return res.status(400).json({ message: 'User ID required' });
    
    // Find missions for the specified planet
    const missions = await Mission.find({ planetId });
    
    // Get user's progress to check completed missions
    const gameProgress = await GameProgress.findOne({ userId });
    if (!gameProgress) {
      return res.status(404).json({ message: 'Game progress not found' });
    }

    // Mark which missions are completed by the user
    const missionsWithStatus = missions.map(mission => ({
      ...mission.toObject(),
      completed: gameProgress.completedMissions.includes(mission._id.toString())
    }));

    res.json(missionsWithStatus);
  } catch (error) {
    console.error('Error fetching missions:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.completeMission = async (req, res) => {
  try {
    const { missionId } = req.params;
    const { userId, score } = req.body;
    
    if (!userId) return res.status(400).json({ message: 'User ID required' });
    
    // Find the mission
    const mission = await Mission.findById(missionId);
    if (!mission) {
      return res.status(404).json({ message: 'Mission not found' });
    }
    
    // Calculate XP earned based on score
    const xpEarned = Math.floor((score / 100) * mission.xpReward);
    
    // Update user's game progress
    const gameProgress = await GameProgress.findOne({ userId });
    if (!gameProgress) {
      return res.status(404).json({ message: 'Game progress not found' });
    }
    
    // Check if this mission is already completed
    if (gameProgress.completedMissions.includes(missionId)) {
      return res.status(400).json({ message: 'Mission already completed' });
    }
    
    // Update XP
    gameProgress.xp.total += xpEarned;
    gameProgress.xp[mission.techType] += xpEarned;
    
    // Add to completed missions
    gameProgress.completedMissions.push(missionId);
    
    // Check for level up
    const newLevel = Math.floor(gameProgress.xp.total / 1000) + 1;
    const leveledUp = newLevel > gameProgress.level;
    gameProgress.level = newLevel;
    
    // Check for new planet unlocks
    const planets = ['neuron', 'droidcore', 'cryptia', 'devopsprime', 'algomatrix'];
    
    planets.forEach(planetId => {
      if (!gameProgress.unlockedPlanets.includes(planetId) && shouldUnlockPlanet(gameProgress, planetId)) {
        gameProgress.unlockedPlanets.push(planetId);
      }
    });
    
    await gameProgress.save();
    
    // Check for new achievements
    const unlockedAchievements = await checkForAchievements(userId);
    
    res.json({
      message: 'Mission completed',
      xpEarned,
      newTotal: gameProgress.xp.total,
      leveledUp,
      newLevel: gameProgress.level,
      unlockedAchievements,
      unlockedPlanets: gameProgress.unlockedPlanets.filter(p => !req.body.previouslyUnlocked.includes(p))
    });
  } catch (error) {
    console.error('Error completing mission:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Helper function to check for achievements
async function checkForAchievements(userId) {
  try {
    const gameProgress = await GameProgress.findOne({ userId });
    const achievements = await Achievement.find({});
    const unlockedAchievements = [];
    
    for (const achievement of achievements) {
      // Skip already unlocked achievements
      if (gameProgress.unlockedAchievements.includes(achievement._id.toString())) {
        continue;
      }
      
      let unlocked = false;
      
      // Check different achievement criteria
      switch(achievement.criteriaType) {
        case 'totalXP':
          unlocked = gameProgress.xp.total >= achievement.criteriaValue;
          break;
        case 'techXP':
          unlocked = gameProgress.xp[achievement.techType] >= achievement.criteriaValue;
          break;
        case 'missionCount':
          unlocked = gameProgress.completedMissions.length >= achievement.criteriaValue;
          break;
        case 'level':
          unlocked = gameProgress.level >= achievement.criteriaValue;
          break;
      }
      
      if (unlocked) {
        gameProgress.unlockedAchievements.push(achievement._id);
        unlockedAchievements.push(achievement);
      }
    }
    
    if (unlockedAchievements.length > 0) {
      await gameProgress.save();
    }
    
    return unlockedAchievements;
  } catch (error) {
    console.error('Error checking achievements:', error);
    return [];
  }
}