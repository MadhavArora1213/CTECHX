// src/pages/game/GameHub.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useGame from '../../hooks/useGame';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSkeleton from '../../components/ui/LoadingSkeleton';
import PlanetCard from '../../components/game/PlanetCard';
import GameEventsList from '../../components/game/GameEventsList';
import { FaRocket, FaStar, FaMedal, FaCalendarAlt, FaExclamationCircle } from 'react-icons/fa';

const GameHub = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { 
    playerData, 
    unlockedPlanets, 
    planets,
    gameEvents, 
    loading, 
    error, 
    achievements 
  } = useGame();
  
  const [selectedFilter, setSelectedFilter] = useState('all');
  
  // Calculate player stats once instead of every render
  const stats = useMemo(() => {
    if (!playerData) return {};
    
    const completedMissions = gameEvents.filter(event => event.type === 'mission-complete').length;
    const totalAchievements = achievements.length;
    const totalPlanets = unlockedPlanets.length;
    const xpToNextLevel = playerData.maxXp - playerData.xp;
    
    return {
      completedMissions,
      totalAchievements,
      totalPlanets,
      xpToNextLevel
    };
  }, [playerData, gameEvents, achievements, unlockedPlanets]);
  
  // Filter displayed planets
  const filteredPlanets = useMemo(() => {
    if (selectedFilter === 'all') {
      return unlockedPlanets;
    } else if (selectedFilter === 'active') {
      return unlockedPlanets.filter(planet => 
        planet.progress > 0 && planet.progress < 100
      );
    } else if (selectedFilter === 'completed') {
      return unlockedPlanets.filter(planet => planet.progress === 100);
    } else if (selectedFilter === 'new') {
      return unlockedPlanets.filter(planet => planet.progress === 0);
    }
    
    return unlockedPlanets;
  }, [unlockedPlanets, selectedFilter]);
  
  // When a user navigates to a planet
  const handlePlanetClick = (planetId) => {
    navigate(`/student/${user.id}/gaming/planet/${planetId}`);
  };
  
  // Loading skeletons for planets
  const renderPlanetSkeletons = () => (
    <>
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-gray-800/50 rounded-xl h-64 animate-pulse"></div>
      ))}
    </>
  );
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-900/30 border border-red-800 rounded-lg p-6 flex items-center">
          <FaExclamationCircle className="text-red-500 text-3xl mr-4" />
          <div>
            <h1 className="text-xl font-bold text-white mb-2">Error Loading Game Data</h1>
            <p className="text-red-200">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-700 hover:bg-red-600 text-white rounded"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          {loading ? (
            <div className="h-10 w-60 bg-gray-800 animate-pulse rounded"></div>
          ) : (
            <>Welcome, Explorer {playerData?.username || ''}</>
          )}
        </h1>
        
        <p className="text-gray-400 text-lg">
          {loading ? (
            <span className="block h-6 w-96 bg-gray-800 animate-pulse rounded mt-2"></span>
          ) : (
            <>Continue your journey through the Tech Odyssey universe!</>
          )}
        </p>
      </div>
      
      {/* Player stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* XP and Level */}
        <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 rounded-xl p-5 border border-indigo-800/50">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-gray-400 text-sm mb-1 uppercase">Current Level</h2>
              {loading ? (
                <div className="h-8 w-20 bg-indigo-800/50 animate-pulse rounded"></div>
              ) : (
                <p className="text-3xl font-bold text-white">{playerData?.level}</p>
              )}
            </div>
            <div className="p-2 bg-indigo-800/50 rounded-lg">
              <FaStar className="text-yellow-400 text-xl" />
            </div>
          </div>
          
          {!loading && (
            <>
              <div className="flex justify-between text-sm mt-4 mb-1">
                <span className="text-indigo-300">{playerData?.xp} XP</span>
                <span className="text-gray-400">{playerData?.maxXp} XP</span>
              </div>
              <div className="w-full bg-gray-800/50 rounded-full h-2 overflow-hidden">
                <motion.div 
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${(playerData?.xp / playerData?.maxXp) * 100}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
              <p className="text-xs text-gray-400 mt-2">
                {stats.xpToNextLevel} XP until next level
              </p>
            </>
          )}
        </div>
        
        {/* Completed Missions */}
        <div className="bg-gradient-to-br from-blue-900/50 to-sky-900/50 rounded-xl p-5 border border-blue-800/50">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-gray-400 text-sm mb-1 uppercase">Missions</h2>
              {loading ? (
                <div className="h-8 w-20 bg-blue-800/50 animate-pulse rounded"></div>
              ) : (
                <p className="text-3xl font-bold text-white">{stats.completedMissions}</p>
              )}
            </div>
            <div className="p-2 bg-blue-800/50 rounded-lg">
              <FaRocket className="text-blue-400 text-xl" />
            </div>
          </div>
          {!loading && (
            <p className="text-sm text-gray-400 mt-4">
              Missions completed across all planets
            </p>
          )}
        </div>
        
        {/* Achievements */}
        <div className="bg-gradient-to-br from-amber-900/50 to-yellow-900/50 rounded-xl p-5 border border-amber-800/50">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-gray-400 text-sm mb-1 uppercase">Achievements</h2>
              {loading ? (
                <div className="h-8 w-20 bg-amber-800/50 animate-pulse rounded"></div>
              ) : (
                <p className="text-3xl font-bold text-white">{stats.totalAchievements}</p>
              )}
            </div>
            <div className="p-2 bg-amber-800/50 rounded-lg">
              <FaMedal className="text-yellow-400 text-xl" />
            </div>
          </div>
          {!loading && (
            <Link to={`/student/${user.id}/gaming/achievements`} className="text-sm text-amber-400 hover:text-amber-300 mt-4 inline-block">
              View all achievements →
            </Link>
          )}
        </div>
        
        {/* Planets */}
        <div className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 rounded-xl p-5 border border-green-800/50">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-gray-400 text-sm mb-1 uppercase">Planets</h2>
              {loading ? (
                <div className="h-8 w-20 bg-green-800/50 animate-pulse rounded"></div>
              ) : (
                <p className="text-3xl font-bold text-white">{stats.totalPlanets}/{planets.length}</p>
              )}
            </div>
            <div className="p-2 bg-green-800/50 rounded-lg">
              <FaCalendarAlt className="text-green-400 text-xl" />
            </div>
          </div>
          {!loading && stats.totalPlanets < planets.length && (
            <p className="text-sm text-gray-400 mt-4">
              {planets.length - stats.totalPlanets} planets left to unlock
            </p>
          )}
          {!loading && stats.totalPlanets === planets.length && (
            <p className="text-sm text-green-400 mt-4">
              All planets unlocked!
            </p>
          )}
        </div>
      </div>
      
      {/* Planets section */}
      <section className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-4 sm:mb-0">Your Planets</h2>
          
          {/* Planet filters */}
          <div className="flex space-x-2 overflow-x-auto pb-2 w-full sm:w-auto">
            <button
              className={`px-3 py-1 rounded-full text-sm whitespace-nowrap
                ${selectedFilter === 'all' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
              onClick={() => setSelectedFilter('all')}
            >
              All Planets
            </button>
            <button
              className={`px-3 py-1 rounded-full text-sm whitespace-nowrap
                ${selectedFilter === 'active' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
              onClick={() => setSelectedFilter('active')}
            >
              In Progress
            </button>
            <button
              className={`px-3 py-1 rounded-full text-sm whitespace-nowrap
                ${selectedFilter === 'completed' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
              onClick={() => setSelectedFilter('completed')}
            >
              Completed
            </button>
            <button
              className={`px-3 py-1 rounded-full text-sm whitespace-nowrap
                ${selectedFilter === 'new' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
              onClick={() => setSelectedFilter('new')}
            >
              New
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading ? renderPlanetSkeletons() : (
            filteredPlanets.length === 0 ? (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-400 text-lg">No planets match your current filter.</p>
                <button 
                  onClick={() => setSelectedFilter('all')}
                  className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded"
                >
                  Show All Planets
                </button>
              </div>
            ) : (
              filteredPlanets.map((planet) => (
                <PlanetCard
                  key={planet.id}
                  planet={planet}
                  onClick={() => handlePlanetClick(planet.id)}
                />
              ))
            )
          )}
        </div>
        
        {/* Locked planets preview */}
        {!loading && selectedFilter === 'all' && unlockedPlanets.length < planets.length && (
          <>
            <h3 className="text-xl font-semibold text-gray-300 mt-8 mb-4">Locked Planets</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {planets
                .filter(planet => !unlockedPlanets.some(p => p.id === planet.id))
                .map(planet => (
                  <div 
                    key={planet.id}
                    className="bg-gray-800/30 rounded-xl p-5 relative border border-gray-700/50 opacity-60"
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-gray-900/80 rounded-lg px-4 py-2 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2-2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-300">Locked</span>
                      </div>
                    </div>
                    
                    <h3 className="text-gray-500 font-bold text-xl mb-2">{planet.name}</h3>
                    <p className="text-gray-600 line-clamp-2 text-sm">
                      {planet.description}
                    </p>
                    
                    {planet.unlockRequirement && (
                      <div className="mt-4 pt-3 border-t border-gray-700/50">
                        <h4 className="text-xs text-gray-500 uppercase">To unlock</h4>
                        <p className="text-gray-500 text-sm">{planet.unlockRequirement}</p>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </>
        )}
      </section>
      
      {/* Recent activity section */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Recent Activity</h2>
        <GameEventsList 
          events={gameEvents} 
          loading={loading} 
          limit={5} 
          className="bg-gray-800 rounded-xl p-5 border border-gray-700/50"
        />
        
        {!loading && gameEvents.length > 5 && (
          <div className="text-center mt-4">
            <button className="text-indigo-400 hover:text-indigo-300">
              View more activity
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default GameHub;