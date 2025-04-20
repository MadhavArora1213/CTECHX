// src/hooks/useGame.js
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { useInventory } from '../contexts/InventoryContext';

/**
 * Custom hook for managing game state and interactions
 */
const useGame = () => {
  const { user } = useAuth();
  const { addItem } = useInventory();
  
  const [playerData, setPlayerData] = useState({
    level: 1,
    xp: 0,
    maxXp: 100,
    skills: {}
  });
  
  const [planets, setPlanets] = useState([]);
  const [unlockedPlanets, setUnlockedPlanets] = useState([]);
  const [activePlanet, setActivePlanet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [gameEvents, setGameEvents] = useState([]);
  const [achievements, setAchievements] = useState([]);
  
  // Load player game data
  useEffect(() => {
    if (!user?.id) return;
    
    const fetchGameData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Fetch player data
        const playerResponse = await axios.get(`/api/game/player/${user.id}`);
        setPlayerData(playerResponse.data);
        
        // Fetch planets data
        const planetsResponse = await axios.get(`/api/game/planets`);
        setPlanets(planetsResponse.data);
        
        // Filter unlocked planets
        const unlocked = planetsResponse.data.filter(planet => 
          planet.unlocked || planet.id === 'codeforge'
        );
        setUnlockedPlanets(unlocked);
        
        // Fetch player achievements
        const achievementsResponse = await axios.get(`/api/game/achievements/${user.id}`);
        setAchievements(achievementsResponse.data);
        
      } catch (err) {
        console.error('Error loading game data:', err);
        setError('Failed to load game data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchGameData();
  }, [user?.id]);
  
  // Award XP to player
  const awardXp = useCallback(async (amount) => {
    if (!user?.id) return;
    
    try {
      const response = await axios.post(`/api/game/player/${user.id}/award-xp`, { amount });
      
      const { newLevel, currentXp, maxXp, leveledUp } = response.data;
      
      // Update player data
      setPlayerData(prev => ({
        ...prev,
        level: newLevel,
        xp: currentXp,
        maxXp
      }));
      
      // If player leveled up, add to game events
      if (leveledUp) {
        addGameEvent({
          type: 'level-up',
          message: `Congratulations! You've reached level ${newLevel}`,
          timestamp: new Date().toISOString()
        });
        
        // Check if any planets unlock with this level
        checkPlanetUnlocks(newLevel);
      }
      
      return { leveledUp, newLevel };
    } catch (err) {
      console.error('Error awarding XP:', err);
      return false;
    }
  }, [user?.id]);
  
  // Check if new planets unlock based on level or other criteria
  const checkPlanetUnlocks = useCallback(async (level) => {
    if (!user?.id) return;
    
    try {
      const response = await axios.post(`/api/game/planets/check-unlocks`, {
        userId: user.id,
        level
      });
      
      if (response.data.newUnlocks?.length > 0) {
        // Update unlocked planets
        setUnlockedPlanets(prev => [
          ...prev,
          ...response.data.newUnlocks
        ]);
        
        // Add unlock events
        response.data.newUnlocks.forEach(planet => {
          addGameEvent({
            type: 'planet-unlock',
            message: `You've unlocked a new planet: ${planet.name}!`,
            timestamp: new Date().toISOString(),
            planet
          });
        });
      }
      
      return response.data.newUnlocks || [];
    } catch (err) {
      console.error('Error checking planet unlocks:', err);
      return [];
    }
  }, [user?.id]);
  
  // Add a game event to the log (for notifications, achievements, etc.)
  const addGameEvent = useCallback((event) => {
    setGameEvents(prev => [
      {
        id: Date.now(),
        ...event
      },
      ...prev
    ].slice(0, 50)); // Keep only the 50 most recent events
  }, []);
  
  // Award an achievement to the player
  const awardAchievement = useCallback(async (achievementId) => {
    if (!user?.id) return;
    
    try {
      const response = await axios.post(`/api/game/achievements/${user.id}/award`, {
        achievementId
      });
      
      if (response.data.success) {
        // Add to achievements list
        setAchievements(prev => [
          ...prev,
          response.data.achievement
        ]);
        
        // Add event
        addGameEvent({
          type: 'achievement',
          message: `Achievement Unlocked: ${response.data.achievement.title}`,
          timestamp: new Date().toISOString(),
          achievement: response.data.achievement
        });
        
        // Award XP if achievement gives XP
        if (response.data.achievement.xpReward) {
          awardXp(response.data.achievement.xpReward);
        }
        
        // Award item if achievement gives item
        if (response.data.achievement.itemReward) {
          addItem(response.data.achievement.itemReward);
        }
        
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error awarding achievement:', err);
      return false;
    }
  }, [user?.id, addGameEvent, awardXp, addItem]);
  
  // Check achievement progress
  const updateAchievementProgress = useCallback(async (type, amount = 1) => {
    if (!user?.id) return;
    
    try {
      const response = await axios.post(`/api/game/achievements/${user.id}/progress`, {
        type,
        amount
      });
      
      if (response.data.unlockedAchievements?.length > 0) {
        // Update achievements list
        setAchievements(prev => [
          ...prev,
          ...response.data.unlockedAchievements
        ]);
        
        // Add events for each unlocked achievement
        response.data.unlockedAchievements.forEach(achievement => {
          addGameEvent({
            type: 'achievement',
            message: `Achievement Unlocked: ${achievement.title}`,
            timestamp: new Date().toISOString(),
            achievement
          });
          
          // Award XP if achievement gives XP
          if (achievement.xpReward) {
            awardXp(achievement.xpReward);
          }
          
          // Award item if achievement gives item
          if (achievement.itemReward) {
            addItem(achievement.itemReward);
          }
        });
      }
      
      return response.data.unlockedAchievements || [];
    } catch (err) {
      console.error('Error updating achievement progress:', err);
      return [];
    }
  }, [user?.id, addGameEvent, awardXp, addItem]);
  
  // Get planet by id
  const getPlanet = useCallback((planetId) => {
    return planets.find(planet => planet.id === planetId) || null;
  }, [planets]);
  
  // Set active planet
  const navigateToPlanet = useCallback((planetId) => {
    const planet = getPlanet(planetId);
    if (planet && (planet.unlocked || planet.id === 'codeforge')) {
      setActivePlanet(planet);
      return true;
    }
    return false;
  }, [getPlanet]);
  
  // Check if player has specific achievement
  const hasAchievement = useCallback((achievementId) => {
    return achievements.some(a => a.id === achievementId);
  }, [achievements]);
  
  // Update player skill (for skill tree progression)
  const updateSkill = useCallback(async (skillId, level) => {
    if (!user?.id) return;
    
    try {
      const response = await axios.post(`/api/game/player/${user.id}/skills`, {
        skillId,
        level
      });
      
      if (response.data.success) {
        setPlayerData(prev => ({
          ...prev,
          skills: {
            ...prev.skills,
            [skillId]: level
          }
        }));
        
        // Add skill update event
        addGameEvent({
          type: 'skill-up',
          message: `Skill Updated: ${response.data.skillName} (Level ${level})`,
          timestamp: new Date().toISOString()
        });
        
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error updating skill:', err);
      return false;
    }
  }, [user?.id, addGameEvent]);
  
  return {
    playerData,
    planets,
    unlockedPlanets,
    activePlanet,
    loading,
    error,
    gameEvents,
    achievements,
    awardXp,
    navigateToPlanet,
    getPlanet,
    hasAchievement,
    awardAchievement,
    updateAchievementProgress,
    updateSkill,
    addGameEvent
  };
};

export default useGame;