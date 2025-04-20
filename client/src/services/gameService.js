import axios from 'axios';
import authService from './authService';

// Fix: Use import.meta.env instead of process.env
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const GAME_API = `${API_URL}/game`;

/**
 * Game Service
 * 
 * Handles all API calls related to the Tech Odyssey game, including:
 * - Planets and locations
 * - Missions
 * - Player data and progress
 * - Achievements
 * - Inventory
 * - Leaderboards
 */
class GameService {
  constructor() {
    // Setup request interceptor to include auth token
    axios.interceptors.request.use(
      (config) => {
        const token = authService.getToken();
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }
  
  /**
   * Get player game data
   * @returns {Promise} Player data including progress, level, inventory, etc.
   */
  async getGameData() {
    try {
      // For development without backend, return mock data
      return {
        currentPlanet: null,
        activeMission: null,
        completedMissions: [],
        inventory: [
          { id: 'item1', name: 'Code Debugger', type: 'tool', rarity: 'uncommon' },
          { id: 'item2', name: 'Neural Network', type: 'upgrade', rarity: 'rare' }
        ],
        xp: {
          total: 450,
          fullStack: 250,
          ai: 100,
          android: 0,
          cybersecurity: 50,
          devops: 50,
          algorithms: 0
        },
        level: 3,
        achievements: [
          { id: 'first-steps', name: 'First Steps', unlocked: true },
          { id: 'code-novice', name: 'Code Novice', unlocked: true },
          { id: 'bug-hunter', name: 'Bug Hunter', unlocked: false }
        ],
        notifications: []
      };
      
      // When backend is ready, use this instead:
      // const response = await axios.get(`${GAME_API}/player`);
      // return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }
  
  /**
   * Get all available planets
   */
  async getPlanets() {
    try {
      // For development without backend, return mock data
      return (await import('../game/data/planets')).default;
      
      // When backend is ready, use this instead:
      // const response = await axios.get(`${GAME_API}/planets`);
      // return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }
  
  /**
   * Get all missions
   */
  async getMissions() {
    try {
      // For development without backend, return mock data
      return (await import('../game/data/missions')).default;
      
      // When backend is ready, use this instead:
      // const response = await axios.get(`${GAME_API}/missions`);
      // return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }
  
  /**
   * Get all achievements
   */
  async getAchievements() {
    try {
      // For development without backend, return mock data
      return (await import('../game/data/achievements')).default;
      
      // When backend is ready, use this instead:
      // const response = await axios.get(`${GAME_API}/achievements`);
      // return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }
  
  /**
   * Start a mission
   */
  async startMission(missionId) {
    try {
      // For development, just return mission ID and start time
      return {
        missionId,
        startTime: new Date().toISOString(),
        status: 'in-progress'
      };
      
      // When backend is ready, use this instead:
      // const response = await axios.post(`${GAME_API}/missions/${missionId}/start`);
      // return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }
  
  /**
   * Complete a mission
   */
  async completeMission(missionId, solution) {
    try {
      // For development, simulate mission completion
      return {
        missionId,
        completed: true,
        score: 85,
        xpEarned: 100,
        rewards: ['code-badge', 'xp-boost']
      };
      
      // When backend is ready, use this instead:
      // const response = await axios.post(`${GAME_API}/missions/${missionId}/complete`, { solution });
      // return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }
  
  /**
   * Handle errors from API calls
   */
  handleError(error) {
    console.error('Game service error:', error);
    // You could add more error handling logic here
  }
}

// Export as default
const gameService = new GameService();
export default gameService;