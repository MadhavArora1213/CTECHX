// src/pages/game/PlanetView.jsx
import React, { useState, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useMission from '../../hooks/useMission';
import useGame from '../../hooks/useGame';
import { useAuth } from '../../contexts/AuthContext';
import MissionCard from '../../components/game/MissionCard';
import LocationMap from '../../components/game/LocationMap';
import LoadingSkeleton from '../../components/ui/LoadingSkeleton.jsx';
import { 
  FaExclamationCircle, FaRocket, FaLock, FaCheckCircle, 
  FaSearch, FaFilter, FaSortAmountDown 
} from 'react-icons/fa';

// Mission card animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: i => ({ 
    opacity: 1, 
    y: 0,
    transition: { 
      delay: i * 0.1,
      duration: 0.5
    } 
  })
};

const PlanetView = () => {
  const { planetId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const { getPlanet } = useGame();
  const { 
    availableMissions, 
    activeMissions, 
    completedMissions, 
    loading, 
    error, 
    fetchPlanetMissions,
    startMission
  } = useMission(null, planetId);
  
  // Local state
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortOrder, setSortOrder] = useState('default');
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState('available');
  
  // Get planet data
  const planet = useMemo(() => getPlanet(planetId), [getPlanet, planetId]);
  
  // Filtered and sorted missions
  const filteredMissions = useMemo(() => {
    let missions = [];
    
    // Select missions based on active tab
    if (activeTab === 'available') missions = availableMissions;
    else if (activeTab === 'active') missions = activeMissions;
    else if (activeTab === 'completed') missions = completedMissions;
    
    // Filter by search term
    if (searchTerm) {
      missions = missions.filter(mission => 
        mission.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mission.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by mission type
    if (filterType !== 'all') {
      missions = missions.filter(mission => mission.type === filterType);
    }
    
    // Sort missions
    if (sortOrder === 'xp-high') {
      missions = [...missions].sort((a, b) => b.xpReward - a.xpReward);
    } else if (sortOrder === 'xp-low') {
      missions = [...missions].sort((a, b) => a.xpReward - b.xpReward);
    } else if (sortOrder === 'difficulty') {
      // Assuming difficulty is a numeric value 1-5
      missions = [...missions].sort((a, b) => a.difficulty - b.difficulty);
    } else if (sortOrder === 'newest') {
      missions = [...missions].sort((a, b) => 
        new Date(b.releaseDate) - new Date(a.releaseDate)
      );
    }
    
    return missions;
  }, [
    activeTab, 
    availableMissions, 
    activeMissions, 
    completedMissions, 
    searchTerm, 
    filterType, 
    sortOrder
  ]);
  
  // Handle mission click
  const handleMissionClick = useCallback(async (mission) => {
    // If mission is already active or completed, go to mission page
    if (activeTab === 'active' || activeTab === 'completed') {
      navigate(`/student/${user.id}/gaming/planet/${planetId}/mission/${mission.id}`);
      return;
    }
    
    // If available mission, start it first
    const started = await startMission(mission.id);
    if (started) {
      navigate(`/student/${user.id}/gaming/planet/${planetId}/mission/${mission.id}`);
    }
  }, [activeTab, navigate, planetId, startMission, user?.id]);
  
  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setFilterType('all');
    setSortOrder('default');
  };
  
  // Render missions as cards or empty state
  const renderMissions = () => {
    if (filteredMissions.length === 0) {
      return (
        <motion.div 
          className="bg-gray-800/50 rounded-lg p-8 text-center col-span-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-700/50 mb-4">
            {activeTab === 'available' ? (
              <FaRocket className="text-gray-400 text-xl" />
            ) : activeTab === 'active' ? (
              <FaRocket className="text-blue-400 text-xl" />
            ) : (
              <FaCheckCircle className="text-green-400 text-xl" />
            )}
          </div>
          
          <h3 className="text-xl font-medium text-white mb-2">
            {activeTab === 'available' ? 'No available missions' : 
             activeTab === 'active' ? 'No missions in progress' : 
             'No completed missions'}
          </h3>
          
          <p className="text-gray-400 mb-4">
            {activeTab === 'available' ? 
              'Check back later for new missions on this planet!' : 
              activeTab === 'active' ? 
              'Start some missions to see them here!' : 
              'Complete missions to track your progress!'
            }
          </p>
          
          {searchTerm || filterType !== 'all' || sortOrder !== 'default' ? (
            <button 
              onClick={clearFilters}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg"
            >
              Clear Filters
            </button>
          ) : activeTab !== 'available' && availableMissions.length > 0 ? (
            <button 
              onClick={() => setActiveTab('available')}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg"
            >
              View Available Missions
            </button>
          ) : null}
        </motion.div>
      );
    }
    
    return filteredMissions.map((mission, index) => (
      <motion.div 
        key={mission.id}
        custom={index}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <MissionCard
          mission={mission}
          status={activeTab}
          onClick={() => handleMissionClick(mission)}
        />
      </motion.div>
    ));
  };
  
  // Render loading skeletons
  const renderSkeletons = () => (
    <>
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-gray-800/50 rounded-lg h-48 animate-pulse"></div>
      ))}
    </>
  );
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-900/30 border border-red-800 rounded-lg p-6 flex items-center">
          <FaExclamationCircle className="text-red-500 text-3xl mr-4" />
          <div>
            <h1 className="text-xl font-bold text-white mb-2">Error Loading Planet Data</h1>
            <p className="text-red-200">{error}</p>
            <button 
              onClick={() => fetchPlanetMissions(planetId)}
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
    <div className="container mx-auto px-4 pb-8">
      {/* Planet exploration section */}
      <section className="mb-8">
        <LocationMap planet={planet} loading={loading} />
      </section>
      
      {/* Missions section */}
      <section>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 space-y-4 lg:space-y-0">
          <div>
            <h2 className="text-2xl font-bold text-white">Planet Missions</h2>
            <p className="text-gray-400">Complete missions to earn XP and unlock new areas</p>
          </div>
          
          {/* Mobile mission tabs */}
          <div className="flex overflow-x-auto hide-scrollbar -mx-4 px-4 pb-2 lg:hidden">
            <button
              onClick={() => setActiveTab('available')}
              className={`px-4 py-2 mr-2 rounded-lg text-sm whitespace-nowrap flex items-center
                ${activeTab === 'available' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
            >
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
              Available ({availableMissions.length})
            </button>
            <button
              onClick={() => setActiveTab('active')}
              className={`px-4 py-2 mr-2 rounded-lg text-sm whitespace-nowrap flex items-center
                ${activeTab === 'active' 
                  ? 'bg-yellow-600 text-white' 
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
            >
              <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
              In Progress ({activeMissions.length})
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap flex items-center
                ${activeTab === 'completed' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
            >
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
              Completed ({completedMissions.length})
            </button>
          </div>
          
          {/* Desktop mission tabs */}
          <div className="hidden lg:flex bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('available')}
              className={`px-4 py-2 rounded-md text-sm
                ${activeTab === 'available' 
                  ? 'bg-gray-700 text-white' 
                  : 'text-gray-400 hover:text-gray-300'}`}
            >
              Available ({availableMissions.length})
            </button>
            <button
              onClick={() => setActiveTab('active')}
              className={`px-4 py-2 rounded-md text-sm
                ${activeTab === 'active' 
                  ? 'bg-gray-700 text-white' 
                  : 'text-gray-400 hover:text-gray-300'}`}
            >
              In Progress ({activeMissions.length})
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-4 py-2 rounded-md text-sm
                ${activeTab === 'completed' 
                  ? 'bg-gray-700 text-white' 
                  : 'text-gray-400 hover:text-gray-300'}`}
            >
              Completed ({completedMissions.length})
            </button>
          </div>
        </div>
        
        {/* Search and filters */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            {/* Search input */}
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search missions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-800 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-500" />
              
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-3 text-gray-500 hover:text-white"
                >
                  &times;
                </button>
              )}
            </div>
            
            {/* Filters button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="bg-gray-800 rounded-lg px-4 py-2 flex items-center text-gray-300 hover:bg-gray-700"
            >
              <FaFilter className="mr-2" /> 
              Filters {filterType !== 'all' && <span className="ml-1 w-2 h-2 bg-blue-500 rounded-full"></span>}
            </button>
            
            {/* Sort dropdown */}
            <div className="relative">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="appearance-none bg-gray-800 rounded-lg pl-10 pr-8 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none cursor-pointer"
              >
                <option value="default">Sort: Default</option>
                <option value="xp-high">XP: High to Low</option>
                <option value="xp-low">XP: Low to High</option>
                <option value="difficulty">Difficulty</option>
                <option value="newest">Newest First</option>
              </select>
              <FaSortAmountDown className="absolute left-3 top-3 text-gray-500" />
              <div className="absolute right-3 top-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Expanded filters */}
          {showFilters && (
            <motion.div 
              className="mt-4 bg-gray-800 rounded-lg p-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFilterType('all')}
                  className={`px-3 py-1 rounded-full text-sm
                    ${filterType === 'all' 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                >
                  All Types
                </button>
                <button
                  onClick={() => setFilterType('coding')}
                  className={`px-3 py-1 rounded-full text-sm
                    ${filterType === 'coding' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                >
                  Coding
                </button>
                <button
                  onClick={() => setFilterType('puzzle')}
                  className={`px-3 py-1 rounded-full text-sm
                    ${filterType === 'puzzle' 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                >
                  Puzzle
                </button>
                <button
                  onClick={() => setFilterType('quiz')}
                  className={`px-3 py-1 rounded-full text-sm
                    ${filterType === 'quiz' 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                >
                  Quiz
                </button>
                <button
                  onClick={() => setFilterType('deployment')}
                  className={`px-3 py-1 rounded-full text-sm
                    ${filterType === 'deployment' 
                      ? 'bg-orange-600 text-white' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                >
                  Deployment
                </button>
              </div>
              
              <div className="flex justify-end mt-4">
                <button 
                  onClick={clearFilters}
                  className="text-sm text-gray-400 hover:text-white"
                >
                  Clear all filters
                </button>
              </div>
            </motion.div>
          )}
        </div>
        
        {/* Mission cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? renderSkeletons() : renderMissions()}
        </div>
      </section>
    </div>
  );
};

// Add custom CSS to hide scrollbars but allow scrolling
const style = document.createElement('style');
style.textContent = `
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
`;
document.head.appendChild(style);

export default PlanetView;