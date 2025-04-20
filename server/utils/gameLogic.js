/**
 * Utility functions for game logic
 */

// Calculate XP required for next level
exports.calculateXpForLevel = (level) => {
  return level * 1000;
};

// Calculate progress percentage toward next level
exports.calculateLevelProgress = (currentXp, level) => {
  const requiredXp = exports.calculateXpForLevel(level);
  const previousLevelXp = exports.calculateXpForLevel(level - 1);
  const levelXp = requiredXp - previousLevelXp;
  const xpInCurrentLevel = currentXp - previousLevelXp;
  
  return Math.floor((xpInCurrentLevel / levelXp) * 100);
};

// Check if a planet should be unlocked
exports.shouldUnlockPlanet = (gameProgress, planetId) => {
  // Planet unlock requirements
  const planetUnlockRequirements = {
    'codeforge': { level: 1 }, // Always unlocked
    'neuron': { level: 5, totalXp: 5000 },
    'droidcore': { level: 5, totalXp: 5000 },
    'cryptia': { level: 10, totalXp: 10000 },
    'devopsprime': { level: 10, totalXp: 10000 },
    'algomatrix': { level: 15, totalXp: 15000 }
  };
  
  const requirements = planetUnlockRequirements[planetId];
  if (!requirements) return false;
  
  return gameProgress.level >= requirements.level &&
         (!requirements.totalXp || gameProgress.xp.total >= requirements.totalXp);
};

// Determine badge for user based on their level and primary path
exports.determineUserBadge = (level, primaryPath) => {
  const badges = {
    'fullStack': ['Code Apprentice', 'Stack Developer', 'Master Builder', 'Full Stack Wizard'],
    'ai': ['Data Novice', 'ML Engineer', 'Neural Architect', 'AI Mastermind'],
    'android': ['App Beginner', 'Mobile Builder', 'Android Expert', 'Mobile Maestro'],
    'cybersecurity': ['Security Intern', 'Cyber Guardian', 'Security Expert', 'Encryption Master'],
    'devops': ['Cloud Novice', 'Pipeline Builder', 'DevOps Specialist', 'Infrastructure Wizard'],
    'algorithms': ['Code Trainee', 'Algorithm Solver', 'Complexity Master', 'Algorithm Sage']
  };
  
  if (level < 5) return badges[primaryPath][0];
  if (level < 10) return badges[primaryPath][1];
  if (level < 20) return badges[primaryPath][2];
  return badges[primaryPath][3];
};

// Calculate mission score based on time taken, errors, and completion
exports.calculateMissionScore = (mission, timeTaken, errors, completed) => {
  if (!completed) return 0;
  
  // Base score
  let score = 100;
  
  // Deduct points for time (if mission has a time limit)
  if (mission.timeLimit > 0) {
    const timeRatio = timeTaken / mission.timeLimit;
    if (timeRatio > 1) {
      // Took longer than allowed time
      score -= 20;
    } else {
      // Bonus for fast completion
      score += Math.floor((1 - timeRatio) * 20);
    }
  }
  
  // Deduct points for errors
  score -= errors * 5;
  
  // Ensure score is between 0-100
  return Math.max(0, Math.min(100, score));
};