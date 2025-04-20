import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FaLock, FaMapMarkerAlt, FaExclamationCircle, FaInfoCircle } from 'react-icons/fa';

const LocationMap = ({ planet, loading }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  // Simulate map loading
  useEffect(() => {
    if (!loading && planet) {
      const timer = setTimeout(() => {
        setMapLoaded(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [loading, planet]);

  if (loading || !planet) {
    return (
      <div className="bg-gray-800 rounded-xl p-6 animate-pulse">
        <div className="h-8 w-48 bg-gray-700 rounded mb-6"></div>
        <div className="h-64 bg-gray-700 rounded-lg flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  // Format planet description
  const formatDescription = (desc) => {
    if (!desc) return 'No description available';
    return desc.length > 150 ? `${desc.substring(0, 150)}...` : desc;
  };

  // Generate locations based on planet data
  const locations = planet.locations || [
    {
      id: 'central',
      name: 'Central Hub',
      type: 'base',
      unlocked: true,
      coordinates: { x: 50, y: 50 },
      description: 'Main base of operations on this planet'
    },
    {
      id: 'north',
      name: 'Northern District',
      type: 'challenge',
      unlocked: planet.completedMissions > 1,
      coordinates: { x: 50, y: 15 },
      description: 'Advanced coding challenges in a snowy environment'
    },
    {
      id: 'east',
      name: 'Eastern Labs',
      type: 'puzzle',
      unlocked: planet.completedMissions > 3,
      coordinates: { x: 85, y: 50 },
      description: 'Complex algorithm puzzles with high reward'
    },
    {
      id: 'west',
      name: 'Western Outpost',
      type: 'tutorial',
      unlocked: true,
      coordinates: { x: 15, y: 50 },
      description: 'Beginner-friendly tutorials and practice zones'
    },
    {
      id: 'south',
      name: 'Southern Highlands',
      type: 'boss',
      unlocked: planet.completedMissions > 5,
      coordinates: { x: 50, y: 85 },
      description: 'Final challenge zone with the toughest tests'
    }
  ];

  // Get location marker color based on type
  const getMarkerColor = (type) => {
    switch (type) {
      case 'base': return 'bg-blue-500';
      case 'challenge': return 'bg-purple-500';
      case 'puzzle': return 'bg-green-500';
      case 'tutorial': return 'bg-yellow-500';
      case 'boss': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  // Handle location click
  const handleLocationClick = (location) => {
    if (location.unlocked) {
      setSelectedLocation(location);
    }
  };

  // Navigate to location page
  const navigateToLocation = (locationId) => {
    navigate(`/student/${user?.id}/gaming/planet/${planet.id}/location/${locationId}`);
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
      {/* Header with planet info button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">{planet.name}</h2>
        <button 
          onClick={() => setShowInfo(!showInfo)}
          className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
        >
          <FaInfoCircle className="text-blue-400" />
        </button>
      </div>

      {/* Planet info panel */}
      <AnimatePresence>
        {showInfo && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-gray-700 rounded-lg p-4 mb-4 overflow-hidden"
          >
            <div className="flex space-x-4">
              <div className="flex-shrink-0">
                <img 
                  src={planet.image || 'https://via.placeholder.com/80'} 
                  alt={planet.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-medium text-white">{planet.name}</h3>
                <p className="text-gray-400 text-sm mb-2">{planet.techType} specialization • Level {planet.difficulty}</p>
                <p className="text-gray-300 text-sm">{planet.description}</p>
                
                <div className="mt-2 flex items-center space-x-4 text-xs">
                  <div>
                    <span className="text-gray-400">Missions:</span> 
                    <span className="text-white ml-1">{planet.completedMissions}/{planet.missionCount}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">XP Earned:</span> 
                    <span className="text-white ml-1">{planet.xpEarned}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Map container */}
      <div className="relative bg-gray-900 rounded-lg overflow-hidden" style={{ height: '400px' }}>
        {/* Map background */}
        <div className={`absolute inset-0 ${mapLoaded ? '' : 'opacity-0'} transition-opacity duration-1000`}>
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${planet.mapBackground || `https://cdn.pixabay.com/photo/2017/09/08/20/29/planet-2730452_1280.jpg`})`,
              filter: 'brightness(0.7)'
            }}
          />
          
          {/* Grid overlay */}
          <div className="absolute inset-0" 
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px), radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '30px 30px',
              backgroundPosition: '0 0, 15px 15px'
            }}
          />

          {/* Planet atmosphere effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/30" />
        </div>

        {/* Loading indicator */}
        {!mapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white text-center">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p>Loading planet map...</p>
            </div>
          </div>
        )}

        {/* Location markers */}
        {mapLoaded && locations.map((location) => (
          <button
            key={location.id}
            onClick={() => handleLocationClick(location)}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${!location.unlocked ? 'opacity-50' : ''}`}
            style={{ 
              left: `${location.coordinates.x}%`, 
              top: `${location.coordinates.y}%`,
              zIndex: selectedLocation?.id === location.id ? 30 : 10
            }}
          >
            {/* Pulse animation for unlocked locations */}
            {location.unlocked && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className={`absolute w-12 h-12 rounded-full ${getMarkerColor(location.type)} opacity-0 animate-ping-slow`}></span>
              </div>
            )}
            
            {/* Marker */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getMarkerColor(location.type)}`}>
              {location.unlocked ? (
                <FaMapMarkerAlt className="text-white" />
              ) : (
                <FaLock className="text-white text-sm" />
              )}
            </div>
            
            {/* Location name */}
            <div className="mt-1 bg-gray-800 rounded-md px-2 py-0.5 text-xs text-white whitespace-nowrap">
              {location.name}
            </div>
          </button>
        ))}

        {/* Selected location details */}
        {selectedLocation && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-0 left-0 right-0 bg-gray-800/90 backdrop-blur-sm p-4 border-t border-gray-700"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-white mb-1">{selectedLocation.name}</h3>
                <p className="text-sm text-gray-300 mb-2">{formatDescription(selectedLocation.description)}</p>
                <div className="flex items-center">
                  <span className={`inline-block w-2 h-2 rounded-full ${getMarkerColor(selectedLocation.type)} mr-2`}></span>
                  <span className="text-xs text-gray-400 capitalize">{selectedLocation.type}</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedLocation(null)}
                  className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 text-sm text-white transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => navigateToLocation(selectedLocation.id)}
                  className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-500 text-sm text-white transition-colors"
                >
                  Explore
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Map controls */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <button className="w-8 h-8 rounded bg-gray-800/80 hover:bg-gray-700/80 flex items-center justify-center text-white transition-colors">
            +
          </button>
          <button className="w-8 h-8 rounded bg-gray-800/80 hover:bg-gray-700/80 flex items-center justify-center text-white transition-colors">
            -
          </button>
        </div>
      </div>

      {/* Map legend */}
      <div className="mt-4 flex flex-wrap gap-4">
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
          <span className="text-xs text-gray-300">Base</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 rounded-full bg-purple-500 mr-2"></span>
          <span className="text-xs text-gray-300">Challenge</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-2"></span>
          <span className="text-xs text-gray-300">Puzzle</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>
          <span className="text-xs text-gray-300">Tutorial</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 rounded-full bg-red-500 mr-2"></span>
          <span className="text-xs text-gray-300">Boss</span>
        </div>
        <div className="flex items-center ml-auto">
          <FaLock className="text-gray-500 mr-1 text-xs" />
          <span className="text-xs text-gray-300">Locked Area</span>
        </div>
      </div>
    </div>
  );
};

// Add custom animation for the location pulse
const style = document.createElement('style');
style.textContent = `
  @keyframes ping-slow {
    75%, 100% {
      transform: scale(2);
      opacity: 0;
    }
  }
  .animate-ping-slow {
    animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
  }
`;
document.head.appendChild(style);

export default LocationMap;