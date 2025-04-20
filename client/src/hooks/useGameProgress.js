import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

const useGameProgress = () => {
  const [gameProgress, setGameProgress] = useState({
    points: 0,
    level: 1,
    achievements: [],
    history: []
  });

  const earnPoints = useCallback((amount, activity) => {
    setGameProgress(prev => {
      // Calculate if this earns a level up (every 500 points)
      const newPoints = prev.points + amount;
      const currentLevel = Math.floor(prev.points / 500) + 1;
      const newLevel = Math.floor(newPoints / 500) + 1;
      
      // Create history entry
      const historyEntry = {
        id: uuidv4(),
        timestamp: new Date().toISOString(),
        type: 'points',
        amount,
        activity,
        newTotal: newPoints
      };
      
      // Check for level up
      let achievements = [...prev.achievements];
      if (newLevel > currentLevel) {
        achievements.push({
          id: uuidv4(),
          timestamp: new Date().toISOString(),
          type: 'level_up',
          title: `Reached Level ${newLevel}`,
          description: `You've earned ${newPoints} points total`,
          icon: '🏆'
        });
      }
      
      return {
        ...prev,
        points: newPoints,
        level: newLevel,
        achievements,
        history: [...prev.history, historyEntry]
      };
    });
  }, []);

  const unlockAchievement = useCallback((title, description = '', icon = '🎯') => {
    setGameProgress(prev => {
      // Check if achievement already exists
      if (prev.achievements.some(a => a.title === title)) {
        return prev;
      }
      
      const newAchievement = {
        id: uuidv4(),
        timestamp: new Date().toISOString(),
        type: 'achievement',
        title,
        description,
        icon
      };
      
      // Add points for achievement (50 points per achievement)
      const pointsForAchievement = 50;
      
      // Update points and check for level up
      const newPoints = prev.points + pointsForAchievement;
      const currentLevel = Math.floor(prev.points / 500) + 1;
      const newLevel = Math.floor(newPoints / 500) + 1;
      
      // Check if this achievement caused a level up
      let achievements = [...prev.achievements, newAchievement];
      if (newLevel > currentLevel) {
        achievements.push({
          id: uuidv4(),
          timestamp: new Date().toISOString(),
          type: 'level_up',
          title: `Reached Level ${newLevel}`,
          description: `You've earned ${newPoints} points total`,
          icon: '🏆'
        });
      }
      
      return {
        ...prev,
        points: newPoints,
        level: newLevel,
        achievements,
        history: [...prev.history, {
          id: uuidv4(),
          timestamp: new Date().toISOString(),
          type: 'achievement',
          activity: `Unlocked achievement: ${title}`,
          amount: pointsForAchievement,
          newTotal: newPoints
        }]
      };
    });
  }, []);

  const resetProgress = useCallback(() => {
    setGameProgress({
      points: 0,
      level: 1,
      achievements: [],
      history: []
    });
  }, []);

  return {
    gameProgress,
    earnPoints,
    unlockAchievement,
    resetProgress
  };
};

export default useGameProgress;