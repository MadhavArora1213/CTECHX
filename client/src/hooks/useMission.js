// src/hooks/useMission.js
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import useGame from './useGame';

/**
 * Custom hook for managing mission data and interactions
 */
const useMission = (missionId = null, planetId = null) => {
  const { user } = useAuth();
  const { awardXp, updateAchievementProgress, addGameEvent } = useGame();
  
  const [mission, setMission] = useState(null);
  const [activeMissions, setActiveMissions] = useState([]);
  const [availableMissions, setAvailableMissions] = useState([]);
  const [completedMissions, setCompletedMissions] = useState([]);
  const [missionProgress, setMissionProgress] = useState(null);
  const [solution, setSolution] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  
  // Load mission data when missionId changes
  useEffect(() => {
    if (missionId && user?.id) {
      fetchMission(missionId);
    }
  }, [missionId, user?.id]);
  
  // Load planet missions when planetId changes
  useEffect(() => {
    if (planetId && user?.id) {
      fetchPlanetMissions(planetId);
    }
  }, [planetId, user?.id]);
  
  // Fetch a specific mission
  const fetchMission = useCallback(async (id) => {
    if (!user?.id) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`/api/game/missions/${id}`, {
        params: { userId: user.id }
      });
      
      setMission(response.data);
      
      // Check if user has progress on this mission
      if (response.data.userProgress) {
        setMissionProgress(response.data.userProgress);
        setSolution(response.data.userProgress.solution || null);
      }
      
    } catch (err) {
      console.error('Error fetching mission:', err);
      setError('Failed to load mission data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [user?.id]);
  
  // Fetch missions for a specific planet
  const fetchPlanetMissions = useCallback(async (id) => {
    if (!user?.id) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`/api/game/planets/${id}/missions`, {
        params: { userId: user.id }
      });
      
      setAvailableMissions(response.data.available || []);
      setActiveMissions(response.data.active || []);
      setCompletedMissions(response.data.completed || []);
      
    } catch (err) {
      console.error('Error fetching planet missions:', err);
      setError('Failed to load missions. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [user?.id]);
  
  // Start a mission
  const startMission = useCallback(async (id) => {
    if (!user?.id) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post(`/api/game/missions/${id}/start`, {
        userId: user.id
      });
      
      if (response.data.success) {
        // Update active missions
        setActiveMissions(prev => [...prev, response.data.mission]);
        
        // Remove from available missions
        setAvailableMissions(prev => 
          prev.filter(mission => mission.id !== id)
        );
        
        // Track mission start achievement
        updateAchievementProgress('startMission');
        
        // Add event
        addGameEvent({
          type: 'mission-start',
          message: `Started mission: ${response.data.mission.title}`,
          timestamp: new Date().toISOString()
        });
        
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error starting mission:', err);
      setError('Failed to start mission. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  }, [user?.id, updateAchievementProgress, addGameEvent]);
  
  // Update mission progress
  const updateProgress = useCallback(async (progress, currentSolution = null) => {
    if (!user?.id || !missionId) return;
    
    try {
      const response = await axios.post(`/api/game/missions/${missionId}/progress`, {
        userId: user.id,
        progress,
        solution: currentSolution
      });
      
      if (response.data.success) {
        setMissionProgress({
          ...missionProgress,
          progress,
          lastUpdated: new Date().toISOString()
        });
        
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error updating mission progress:', err);
      return false;
    }
  }, [user?.id, missionId, missionProgress]);
  
  // Save current solution (without submitting)
  const saveSolution = useCallback(async (currentSolution) => {
    if (!user?.id || !missionId) return;
    
    try {
      const response = await axios.post(`/api/game/missions/${missionId}/save`, {
        userId: user.id,
        solution: currentSolution
      });
      
      if (response.data.success) {
        setSolution(currentSolution);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error saving solution:', err);
      return false;
    }
  }, [user?.id, missionId]);
  
  // Submit solution for evaluation
  const submitSolution = useCallback(async (finalSolution) => {
    if (!user?.id || !missionId || !mission) return;
    
    setSubmitting(true);
    setError(null);
    setResult(null);
    
    try {
      const response = await axios.post(`/api/game/missions/${missionId}/submit`, {
        userId: user.id,
        solution: finalSolution
      });
      
      // Store result
      setResult(response.data);
      
      if (response.data.success) {
        // If mission completed successfully
        if (response.data.completed) {
          // Move mission from active to completed
          setActiveMissions(prev => 
            prev.filter(m => m.id !== missionId)
          );
          setCompletedMissions(prev => [
            ...prev, 
            { ...mission, completedAt: new Date().toISOString() }
          ]);
          
          // Award XP
          if (mission.xpReward) {
            awardXp(mission.xpReward);
          }
          
          // Update achievements
          updateAchievementProgress('completeMission');
          if (mission.type) {
            updateAchievementProgress(`complete${mission.type.charAt(0).toUpperCase() + mission.type.slice(1)}Mission`);
          }
          
          // Add event
          addGameEvent({
            type: 'mission-complete',
            message: `Completed mission: ${mission.title}`,
            timestamp: new Date().toISOString(),
            rewards: {
              xp: mission.xpReward,
              items: response.data.itemRewards || []
            }
          });
        }
        
        return {
          success: true,
          ...response.data
        };
      }
      
      return {
        success: false,
        ...response.data
      };
    } catch (err) {
      console.error('Error submitting solution:', err);
      setError('Failed to submit solution. Please try again.');
      return {
        success: false,
        message: 'Failed to submit solution due to a server error.'
      };
    } finally {
      setSubmitting(false);
    }
  }, [user?.id, missionId, mission, awardXp, updateAchievementProgress, addGameEvent]);
  
  // Get hint for current mission
  const getHint = useCallback(async () => {
    if (!user?.id || !missionId) return;
    
    try {
      const response = await axios.get(`/api/game/missions/${missionId}/hint`, {
        params: { userId: user.id }
      });
      
      if (response.data.hint) {
        return response.data.hint;
      }
      return null;
    } catch (err) {
      console.error('Error getting hint:', err);
      return null;
    }
  }, [user?.id, missionId]);
  
  // Reset mission progress
  const resetMission = useCallback(async () => {
    if (!user?.id || !missionId) return;
    
    try {
      const response = await axios.post(`/api/game/missions/${missionId}/reset`, {
        userId: user.id
      });
      
      if (response.data.success) {
        setSolution(null);
        setMissionProgress({
          ...missionProgress,
          progress: 0,
          attempts: (missionProgress?.attempts || 0) + 1,
          lastUpdated: new Date().toISOString()
        });
        
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error resetting mission:', err);
      return false;
    }
  }, [user?.id, missionId, missionProgress]);
  
  return {
    mission,
    activeMissions,
    availableMissions,
    completedMissions,
    missionProgress,
    solution,
    result,
    loading,
    submitting,
    error,
    fetchMission,
    fetchPlanetMissions,
    startMission,
    updateProgress,
    saveSolution,
    submitSolution,
    getHint,
    resetMission
  };
};

export default useMission;