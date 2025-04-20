/**
 * Game Helper Functions
 * 
 * Utility functions for Tech Odyssey game mechanics, calculations, 
 * and data transformations.
 */

// Calculate XP required for a level
export const calculateXpForLevel = (level) => {
  // Formula: Each level requires base of 150 XP plus 10% more than the previous level
  if (level <= 1) return 0;
  const baseXP = 150;
  return Math.round(baseXP * Math.pow(1.1, level - 1));
};

// Calculate total XP required for a specific level
export const calculateTotalXpForLevel = (level) => {
  let total = 0;
  for (let i = 1; i <= level; i++) {
    total += calculateXpForLevel(i);
  }
  return total;
};

// Calculate level from total XP
export const calculateLevelFromXp = (totalXp) => {
  let level = 1;
  let xpForNextLevel = calculateXpForLevel(level + 1);
  
  while (totalXp >= xpForNextLevel) {
    level++;
    xpForNextLevel += calculateXpForLevel(level + 1);
  }
  
  return level;
};

// Calculate progress to the next level as a percentage
export const calculateLevelProgress = (totalXp) => {
  const currentLevel = calculateLevelFromXp(totalXp);
  const xpForCurrentLevel = calculateTotalXpForLevel(currentLevel);
  const xpForNextLevel = calculateTotalXpForLevel(currentLevel + 1);
  const xpNeeded = xpForNextLevel - xpForCurrentLevel;
  const xpProgress = totalXp - xpForCurrentLevel;
  
  return Math.min(100, Math.round((xpProgress / xpNeeded) * 100));
};

// Check if a planet is unlocked for a user based on requirements
export const isPlanetUnlocked = (planet, userData) => {
  // If there's no requirement, the planet is unlocked by default (starter planet)
  if (!planet.unlockRequirement) return true;
  
  const { type, planetId, count } = planet.unlockRequirement;
  
  switch (type) {
    case 'mission-count':
      // Check if the user completed required number of missions on specified planet
      const completedMissions = userData.completedMissions || [];
      const planetMissions = completedMissions.filter(m => m.planetId === planetId);
      return planetMissions.length >= count;
      
    case 'planet-completion':
      // Check if the user has completed the specified planet
      const completedPlanets = userData.completedPlanets || [];
      return completedPlanets.includes(planetId);
      
    case 'planets-visited':
      // Check if the user has visited required number of planets
      const visitedPlanets = userData.visitedPlanets || [];
      return visitedPlanets.length >= count;
      
    case 'level':
      // Check if the user has reached required level
      return (userData.level || 1) >= count;
      
    default:
      return false;
  }
};

// Check if a mission is available for a user
export const isMissionAvailable = (mission, userData) => {
  // If mission has no requirements, it's available
  if (!mission.requiredSkills || mission.requiredSkills.length === 0) return true;
  
  const completedMissionIds = (userData.completedMissions || []).map(m => m.id);
  return mission.requiredSkills.every(skill => completedMissionIds.includes(skill));
};

// Get rarity color for UI styling
export const getRarityColor = (rarity) => {
  switch (rarity) {
    case 'common':
      return { bg: 'bg-gray-500', text: 'text-gray-500', border: 'border-gray-500' };
    case 'uncommon':
      return { bg: 'bg-green-500', text: 'text-green-500', border: 'border-green-500' };
    case 'rare':
      return { bg: 'bg-blue-500', text: 'text-blue-500', border: 'border-blue-500' };
    case 'epic':
      return { bg: 'bg-purple-500', text: 'text-purple-500', border: 'border-purple-500' };
    case 'legendary':
      return { bg: 'bg-yellow-500', text: 'text-yellow-500', border: 'border-yellow-500' };
    default:
      return { bg: 'bg-gray-500', text: 'text-gray-500', border: 'border-gray-500' };
  }
};

// Format time duration in a readable way
export const formatDuration = (minutes) => {
  if (minutes < 60) {
    return `${minutes} min`;
  } else {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  }
};

// Calculate success rate of mission completion for a given mission
export const calculateMissionSuccessRate = (mission, allAttempts) => {
  if (!allAttempts || allAttempts.length === 0) return 0;
  
  const missionAttempts = allAttempts.filter(attempt => attempt.missionId === mission.id);
  if (missionAttempts.length === 0) return 0;
  
  const successfulAttempts = missionAttempts.filter(attempt => attempt.passed);
  return Math.round((successfulAttempts.length / missionAttempts.length) * 100);
};

// Check if an achievement is unlocked for a user
export const isAchievementUnlocked = (achievement, userData) => {
  const { type, count, planetId, tag, score, factor } = achievement.criteria;
  
  switch (type) {
    case 'mission-completion':
      return (userData.completedMissions || []).length >= count;
      
    case 'planet-missions':
      const planetMissions = (userData.completedMissions || []).filter(m => m.planetId === planetId);
      return planetMissions.length >= count;
      
    case 'planet-completion':
      return (userData.completedPlanets || []).includes(planetId);
      
    case 'tag-completion':
      const taggedMissions = (userData.completedMissions || []).filter(m => m.tags?.includes(tag));
      return taggedMissions.length >= count;
      
    case 'mission-score':
      const highScoreMissions = (userData.missionScores || []).filter(m => m.score >= score);
      return highScoreMissions.length >= count;
      
    // Add more achievement criteria checks as needed
      
    default:
      return false;
  }
};

// Calculate achievement completion percentage for a user
export const calculateAchievementProgress = (achievement, userData) => {
  const { type, count, planetId, tag } = achievement.criteria;
  
  switch (type) {
    case 'mission-completion':
      const completedCount = (userData.completedMissions || []).length;
      return Math.min(100, Math.round((completedCount / count) * 100));
      
    case 'planet-missions':
      const planetMissions = (userData.completedMissions || []).filter(m => m.planetId === planetId);
      return Math.min(100, Math.round((planetMissions.length / count) * 100));
      
    case 'tag-completion':
      const taggedMissions = (userData.completedMissions || []).filter(m => m.tags?.includes(tag));
      return Math.min(100, Math.round((taggedMissions.length / count) * 100));
      
    // For binary achievements like planet completion, return either 0 or 100
    case 'planet-completion':
      return (userData.completedPlanets || []).includes(planetId) ? 100 : 0;
      
    default:
      return 0;
  }
};

// Generate a random mission hint based on mission and user progress
export const generateMissionHint = (mission, userProgress) => {
  // This could be expanded with more specific hints based on mission type, difficulty, etc.
  const hints = [
    `Focus on the key objectives first: ${mission.objectives[0]}`,
    `This mission requires understanding of ${mission.requiredSkills.join(', ')}`,
    `Many students find the ${mission.difficulty > 3 ? 'third part' : 'second part'} challenging - take your time!`,
    `Don't forget to test your code thoroughly before submission`,
    `Review the provided resources for helpful tips`,
  ];
  
  // Return a random hint
  return hints[Math.floor(Math.random() * hints.length)];
};