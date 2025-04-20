// client/src/contexts/GameContext.jsx
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import gameService from '../services/gameService';

const GameContext = createContext();

const initialState = {
  currentPlanet: null,
  activeMission: null,
  completedMissions: [],
  inventory: [],
  xp: {
    total: 0,
    fullStack: 0,
    ai: 0,
    android: 0,
    cybersecurity: 0,
    devops: 0,
    algorithms: 0
  },
  level: 1,
  achievements: [],
  notifications: []
};

function gameReducer(state, action) {
  switch (action.type) {
    case 'SET_GAME_DATA':
      return { ...state, ...action.payload };
    case 'SELECT_PLANET':
      return { ...state, currentPlanet: action.payload };
    case 'START_MISSION':
      return { ...state, activeMission: action.payload };
    case 'COMPLETE_MISSION':
      return {
        ...state,
        completedMissions: [...state.completedMissions, action.payload.missionId],
        xp: {
          ...state.xp,
          total: state.xp.total + action.payload.xp,
          [action.payload.category]: state.xp[action.payload.category] + action.payload.xp
        }
      };
    case 'ADD_TO_INVENTORY':
      return {
        ...state,
        inventory: [...state.inventory, action.payload]
      };
    case 'UNLOCK_ACHIEVEMENT':
      return {
        ...state,
        achievements: state.achievements.map(a => 
          a.id === action.payload ? {...a, unlocked: true} : a
        ),
        notifications: [...state.notifications, {
          id: Date.now(),
          type: 'achievement',
          title: 'Achievement Unlocked!',
          message: `You've unlocked: ${state.achievements.find(a => a.id === action.payload).name}`
        }]
      };
    default:
      return state;
  }
}

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  
  useEffect(() => {
    // Fetch initial game data
    const fetchGameData = async () => {
      try {
        const gameData = await gameService.getGameData();
        dispatch({ type: 'SET_GAME_DATA', payload: gameData });
      } catch (error) {
        console.error("Failed to load game data:", error);
      }
    };
    
    fetchGameData();
  }, []);
  
  return (
    <GameContext.Provider value={{ 
      ...state, 
      dispatch,
      selectPlanet: (planet) => dispatch({ type: 'SELECT_PLANET', payload: planet }),
      startMission: (mission) => dispatch({ type: 'START_MISSION', payload: mission }),
      completeMission: (missionData) => dispatch({ type: 'COMPLETE_MISSION', payload: missionData }),
      addToInventory: (item) => dispatch({ type: 'ADD_TO_INVENTORY', payload: item }),
      unlockAchievement: (achievementId) => dispatch({ type: 'UNLOCK_ACHIEVEMENT', payload: achievementId })
    }}>
      {children}
    </GameContext.Provider>
  );
}

export const useGame = () => useContext(GameContext);