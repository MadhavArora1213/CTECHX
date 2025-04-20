// client/src/components/game/PlanetCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * Interactive planet card with details and navigation
 */
const PlanetCard = ({
  id,
  name,
  description,
  techType,
  difficulty = 1,
  image,
  unlocked = false,
  missionCount = 0,
  completedMissions = 0,
  xpEarned = 0,
  onClick,
  userId,
  className = ''
}) => {
  // Tech type icons and colors
  const techTypeData = {
    fullStack: {
      icon: 'https://cdn-icons-png.flaticon.com/512/2721/2721626.png',
      color: 'indigo',
      name: 'Full Stack'
    },
    ai: {
      icon: 'https://cdn-icons-png.flaticon.com/512/2103/2103832.png',
      color: 'purple',
      name: 'Artificial Intelligence'
    },
    android: {
      icon: 'https://cdn-icons-png.flaticon.com/512/682/682459.png',
      color: 'green',
      name: 'Android Development'
    },
    cybersecurity: {
      icon: 'https://cdn-icons-png.flaticon.com/512/2716/2716652.png',
      color: 'red',
      name: 'Cybersecurity'
    },
    devops: {
      icon: 'https://cdn-icons-png.flaticon.com/512/2150/2150438.png',
      color: 'blue',
      name: 'DevOps'
    },
    algorithms: {
      icon: 'https://cdn-icons-png.flaticon.com/512/2784/2784567.png',
      color: 'yellow',
      name: 'Algorithms'
    }
  };
  
  // Get tech type info with fallback
  const tech = techTypeData[techType] || {
    icon: 'https://cdn-icons-png.flaticon.com/512/2920/2920349.png',
    color: 'gray',
    name: 'Unknown Tech'
  };
  
  // Generate difficulty stars
  const renderDifficulty = () => {
    return Array.from({ length: 5 }).map((_, index) => (
      <span 
        key={`diff-${index}`}
        className={`text-sm ${index < difficulty ? 'text-yellow-400' : 'text-gray-600'}`}
      >
        ★
      </span>
    ));
  };
  
  // Format planet image with fallback
  const planetImage = image || `https://cdn.pixabay.com/photo/2016/08/02/22/23/planet-1565913_1280.jpg`;
  
  return (
    <motion.div 
      className={`bg-gray-800 rounded-xl overflow-hidden ${className} ${!unlocked ? 'opacity-70' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={unlocked ? { y: -5, transition: { duration: 0.2 } } : {}}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        {/* Planet image */}
        <img 
          src={planetImage} 
          alt={name} 
          className="w-full h-48 object-cover"
        />
        
        {/* Locked overlay */}
        {!unlocked && (
          <div className="absolute inset-0 bg-gray-900/70 flex items-center justify-center">
            <div className="text-center">
              <img 
                src="https://cdn-icons-png.flaticon.com/512/2089/2089734.png"
                alt="Locked"
                className="w-12 h-12 mx-auto mb-2 opacity-80"
              />
              <p className="text-white font-medium text-sm">Planet Locked</p>
              <p className="text-gray-400 text-xs mt-1">Reach a higher level to unlock</p>
            </div>
          </div>
        )}
        
        {/* Tech icon */}
        <div className={`absolute top-2 left-2 bg-${tech.color}-600/90 p-1.5 rounded-md`}>
          <img src={tech.icon} alt={tech.name} className="w-6 h-6" />
        </div>
        
        {/* Difficulty */}
        <div className="absolute top-2 right-2 bg-black/50 px-2 py-1 rounded-md">
          {renderDifficulty()}
        </div>
        
        {/* Planet name */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <h3 className="text-xl font-bold text-white">{name}</h3>
          <p className="text-sm text-gray-300">{tech.name}</p>
        </div>
      </div>
      
      {/* Planet details */}
      <div className="px-4 py-3">
        <p className="text-gray-300 text-sm line-clamp-2 h-10">
          {description}
        </p>
        
        {unlocked && (
          <div className="mt-3 space-y-2">
            {/* Missions progress */}
            <div>
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Mission Progress</span>
                <span>{completedMissions}/{missionCount}</span>
              </div>
              <div className="h-1.5 bg-gray-700 rounded-full">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                  style={{ width: `${missionCount ? (completedMissions / missionCount) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
            
            {/* XP earned */}
            <div className="flex items-center">
              <img 
                src="https://cdn-icons-png.flaticon.com/512/2780/2780137.png"
                alt="XP"
                className="w-4 h-4 mr-2"
              />
              <span className="text-xs text-gray-300">{xpEarned} XP earned</span>
            </div>
          </div>
        )}
      </div>
      
      {/* Card actions */}
      <div className="px-4 py-3 border-t border-gray-700 flex justify-between">
        {unlocked ? (
          <>
            <span className="text-xs text-gray-400 flex items-center">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1"></div>
              Available
            </span>
            
            {onClick ? (
              <button
                onClick={() => onClick(id)}
                className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-md"
              >
                Explore
              </button>
            ) : (
              <Link
                to={`/student/${userId}/gaming/planet/${id}`}
                className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-md inline-block"
              >
                Explore
              </Link>
            )}
          </>
        ) : (
          <span className="text-xs text-gray-500">Planet locked</span>
        )}
      </div>
    </motion.div>
  );
};

PlanetCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  techType: PropTypes.string.isRequired,
  difficulty: PropTypes.number,
  image: PropTypes.string,
  unlocked: PropTypes.bool,
  missionCount: PropTypes.number,
  completedMissions: PropTypes.number,
  xpEarned: PropTypes.number,
  onClick: PropTypes.func,
  userId: PropTypes.string,
  className: PropTypes.string
};

export default PlanetCard;