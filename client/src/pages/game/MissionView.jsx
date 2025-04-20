// src/pages/game/MissionView.jsx
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useMission from '../../hooks/useMission';
import { useAuth } from '../../contexts/AuthContext';
import MissionContent from '../../components/missions/MissionContent';
import MissionComplete from '../../components/missions/common/MissionComplete';
import MissionControls from '../../components/missions/MissionControls';
import MissionProgress from '../../components/missions/MissionProgress';
import LoadingOverlay from '../../components/ui/LoadingOverlay';
import { FaArrowLeft, FaExclamationCircle, FaLightbulb } from 'react-icons/fa';

const MissionView = () => {
  const { planetId, missionId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Mission state
  const [solution, setSolution] = useState(null);
  const [autoSaveTimer, setAutoSaveTimer] = useState(null);
  const [isAutosaving, setIsAutosaving] = useState(false);
  const [autosaveSuccess, setAutosaveSuccess] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [dirty, setDirty] = useState(false);
  
  // Mission hook
  const {
    mission,
    missionProgress,
    loading,
    submitting,
    error,
    fetchMission,
    saveSolution: saveMissionSolution,
    submitSolution,
    resetMission,
    getHint,
    result
  } = useMission(missionId);
  
  // Initialize solution from mission data when it loads
  useEffect(() => {
    if (mission?.userProgress?.solution) {
      setSolution(mission.userProgress.solution);
    } else if (mission?.startingCode) {
      setSolution(mission.startingCode);
    }
  }, [mission]);
  
  // Auto-save functionality
  useEffect(() => {
    // Only auto-save if solution has changed and is not null
    if (solution !== null && dirty) {
      // Clear any existing timers
      if (autoSaveTimer) clearTimeout(autoSaveTimer);
      
      // Set new timer to save after 3 seconds of inactivity
      const timer = setTimeout(() => {
        handleSaveSolution(true);
      }, 3000);
      
      setAutoSaveTimer(timer);
    }
    
    // Clean up timer on unmount
    return () => {
      if (autoSaveTimer) clearTimeout(autoSaveTimer);
    };
  }, [solution, dirty]);
  
  // Handle solution change
  const handleSolutionChange = useCallback((newSolution) => {
    setSolution(newSolution);
    setDirty(true);
  }, []);
  
  // Save solution
  const handleSaveSolution = useCallback(async (isAutoSave = false) => {
    if (!solution) return;
    
    if (isAutoSave) {
      setIsAutosaving(true);
    }
    
    const success = await saveMissionSolution(solution);
    
    if (isAutoSave) {
      setIsAutosaving(false);
      if (success) {
        setAutosaveSuccess(true);
        setTimeout(() => setAutosaveSuccess(false), 2000);
        setDirty(false);
      }
    }
    
    return success;
  }, [saveMissionSolution, solution]);
  
  // Submit solution
  const handleSubmitSolution = useCallback(async () => {
    if (!solution) return;
    
    // Save first
    await handleSaveSolution();
    
    // Then submit
    const result = await submitSolution(solution);
    
    // Handle success and display completion screen
    if (result.success && result.completed) {
      setSuccessData({
        score: result.score || 100,
        xpEarned: mission?.xpReward || 0,
        newAchievements: result.achievements || [],
        newItems: result.itemRewards || [],
        message: result.message || 'Great job! You\'ve successfully completed this mission.'
      });
      setShowSuccess(true);
    }
    
    return result;
  }, [handleSaveSolution, mission, solution, submitSolution]);
  
  // Reset mission
  const handleResetMission = useCallback(async () => {
    if (window.confirm('Are you sure you want to reset your progress? All your code will be lost.')) {
      const success = await resetMission();
      if (success && mission?.startingCode) {
        setSolution(mission.startingCode);
      }
    }
  }, [mission, resetMission]);
  
  // Get hint
  const handleGetHint = useCallback(async () => {
    const hint = await getHint();
    if (hint) {
      setShowHints(true);
    }
    return hint;
  }, [getHint]);
  
  // Handle mission completion
  const handleCompleteMission = useCallback(() => {
    navigate(`/student/${user.id}/gaming/planet/${planetId}`);
  }, [navigate, planetId, user?.id]);
  
  // Return to planet view
  const handleBackToPlanet = () => {
    // If there are unsaved changes, confirm before leaving
    if (dirty) {
      const confirm = window.confirm('You have unsaved changes. Are you sure you want to leave?');
      if (!confirm) return;
    }
    navigate(`/student/${user.id}/gaming/planet/${planetId}`);
  };
  
  // Calculate mission difficulty
  const difficultyLabel = useMemo(() => {
    const difficulty = mission?.difficulty || 1;
    const labels = ['Beginner', 'Easy', 'Intermediate', 'Advanced', 'Expert'];
    return labels[difficulty - 1] || 'Intermediate';
  }, [mission]);
  
  // Show success screen
  if (showSuccess) {
    return (
      <MissionComplete
        score={successData.score}
        xpEarned={successData.xpEarned}
        newAchievements={successData.newAchievements}
        newItems={successData.newItems}
        message={successData.message}
        onComplete={handleCompleteMission}
      />
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-6 h-full flex flex-col">
      {/* Loading overlay */}
      <LoadingOverlay 
        isVisible={submitting} 
        message="Evaluating your solution..."
      />
      
      {/* Top bar */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <button
              onClick={handleBackToPlanet}
              className="mr-4 p-2 bg-gray-800 hover:bg-gray-700 rounded-full text-gray-300 hover:text-white transition"
            >
              <FaArrowLeft />
            </button>
            
            <div>
              <h1 className="text-2xl font-bold text-white">
                {loading ? (
                  <div className="h-8 w-60 bg-gray-800 animate-pulse rounded"></div>
                ) : (
                  mission?.title
                )}
              </h1>
              
              <div className="flex items-center mt-1">
                {loading ? (
                  <div className="h-5 w-32 bg-gray-800 animate-pulse rounded"></div>
                ) : (
                  <>
                    <span className={`text-xs px-2 py-0.5 rounded uppercase font-medium
                      ${mission?.type === 'coding' ? 'bg-blue-900/50 text-blue-300' :
                        mission?.type === 'puzzle' ? 'bg-purple-900/50 text-purple-300' :
                        mission?.type === 'quiz' ? 'bg-green-900/50 text-green-300' :
                        mission?.type === 'deployment' ? 'bg-orange-900/50 text-orange-300' :
                        'bg-gray-800 text-gray-300'
                      }
                    `}>
                      {mission?.type}
                    </span>
                    <span className="mx-2 text-gray-500">•</span>
                    <span className="text-gray-400 text-sm">{difficultyLabel} Difficulty</span>
                    {mission?.estimatedTime && (
                      <>
                        <span className="mx-2 text-gray-500">•</span>
                        <span className="text-gray-400 text-sm">~{mission.estimatedTime} mins</span>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
          
          {/* Mission progress and rewards */}
          {!loading && (
            <div className="flex flex-wrap gap-3">
              <div className="bg-gray-800 px-3 py-1 rounded-lg flex items-center">
                <span className="text-yellow-400 mr-2">XP</span>
                <span className="text-white font-medium">{mission?.xpReward}</span>
              </div>
              
              {/* Only show progress if already started */}
              {missionProgress && (
                <MissionProgress progress={missionProgress} />
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Error message */}
      {error && (
        <div className="bg-red-900/30 border border-red-800 rounded-lg p-4 mb-6 flex items-center">
          <FaExclamationCircle className="text-red-500 text-xl mr-3" />
          <div>
            <div className="text-white font-medium">Error</div>
            <div className="text-red-300">{error}</div>
          </div>
        </div>
      )}
      
      {/* Mission content area */}
      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
        {/* Instructions column */}
        <div className="w-full lg:w-2/5 xl:w-1/3 bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col">
          <div className="p-4 bg-gray-700 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-white">Instructions</h2>
            <button 
              onClick={() => setShowHints(!showHints)}
              className="text-blue-400 hover:text-blue-300 flex items-center text-sm"
            >
              <FaLightbulb className="mr-1" /> {showHints ? 'Hide Hints' : 'Show Hints'}
            </button>
          </div>
          
          <div className="p-4 overflow-y-auto flex-1">
            {loading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-4 bg-gray-700 animate-pulse rounded w-full"></div>
                ))}
                <div className="h-4 bg-gray-700 animate-pulse rounded w-2/3"></div>
              </div>
            ) : (
              <div className="prose prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: mission?.instructions }} />
                
                {/* Requirements section */}
                {mission?.requirements && mission.requirements.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-white border-b border-gray-700 pb-2">Requirements</h3>
                    <ul className="mt-3">
                      {mission.requirements.map((req, index) => (
                        <li key={index} className="mb-2">{req}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Hints panel (collapsible) */}
          <AnimatePresence>
            {showHints && mission?.hints && mission.hints.length > 0 && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-blue-900/20 border-t border-blue-800 overflow-hidden"
              >
                <div className="p-4">
                  <h3 className="font-medium text-blue-300 mb-3">Hints</h3>
                  <ul className="space-y-3">
                    {mission.hints.map((hint, i) => (
                      <li key={i} className="bg-blue-900/30 p-3 rounded border border-blue-800/50">
                        <h4 className="font-medium text-white text-sm mb-1">Hint {i + 1}:</h4>
                        <p className="text-blue-200 text-sm">{hint}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Solution column */}
        <div className="w-full lg:w-3/5 xl:w-2/3 flex flex-col">
          <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden flex-1 flex flex-col">
            <div className="p-4 bg-gray-700 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-white">Your Solution</h2>
              <div className="flex items-center">
                {isAutosaving && (
                  <span className="text-gray-400 text-sm mr-3">Autosaving...</span>
                )}
                
                {autosaveSuccess && (
                  <span className="text-green-400 text-sm mr-3">Saved</span>
                )}
              </div>
            </div>
            
            {/* Mission content component */}
            <div className="flex-1 flex flex-col">
              {loading ? (
                <div className="flex-1 bg-gray-900 animate-pulse"></div>
              ) : (
                <MissionContent
                  missionType={mission?.type}
                  language={mission?.language}
                  initialContent={solution}
                  onChange={handleSolutionChange}
                />
              )}
            </div>
          </div>
          
          {/* Controls */}
          <MissionControls
            onReset={handleResetMission}
            onSave={handleSaveSolution}
            onSubmit={handleSubmitSolution}
            loading={loading}
            submitting={submitting}
            dirty={dirty}
          />
          
          {/* Submission result */}
          {result && !result.completed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 p-4 rounded-lg ${
                result.success 
                  ? 'bg-green-900/30 border border-green-800' 
                  : 'bg-red-900/30 border border-red-800'
              }`}
            >
              <h3 className={`font-medium mb-2 ${
                result.success ? 'text-green-300' : 'text-red-300'
              }`}>
                {result.success ? 'Test Results' : 'Submission Failed'}
              </h3>
              
              <p className="text-gray-300 mb-3">{result.message}</p>
              
              {/* Test results */}
              {result.testResults && (
                <div className="space-y-2">
                  {result.testResults.map((test, index) => (
                    <div 
                      key={index}
                      className={`p-2 rounded text-sm ${
                        test.passed
                          ? 'bg-green-900/20 text-green-200'
                          : 'bg-red-900/20 text-red-200'
                      }`}
                    >
                      <div className="flex items-center">
                        {test.passed ? (
                          <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                        )}
                        <span>{test.name}</span>
                      </div>
                      {!test.passed && test.message && (
                        <div className="mt-1 ml-6 text-red-300">{test.message}</div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MissionView;