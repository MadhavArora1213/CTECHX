// src/components/game/MissionCard.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaLock, FaCheckCircle, FaStar, FaCode, FaPuzzlePiece, FaQuestionCircle, FaTasks } from 'react-icons/fa';

/**
 * Mission card component for displaying game missions with details and actions
 */
const MissionCard = ({
  id,
  title,
  description,
  planetId,
  difficulty = 1,
  xpReward = 100,
  type = 'code',
  techType = 'fullStack',
  completed = false,
  locked = false,
  lockedReason = '',
  timeEstimate = '',
  isActive = false,
  progress = null,
  thumbnail = '',
  tags = [],
  onStart = () => {},
  onContinue = () => {},
  className = '',
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();
  
  // Mission type config with icons and colors
  const typeConfig = {
    code: {
      icon: FaCode,
      name: 'Coding',
      color: 'text-cyan-400',
      bg: 'bg-cyan-900/20',
    },
    puzzle: {
      icon: FaPuzzlePiece,
      name: 'Puzzle',
      color: 'text-purple-400',
      bg: 'bg-purple-900/20',
    },
    quiz: {
      icon: FaQuestionCircle,
      name: 'Quiz',
      color: 'text-yellow-400',
      bg: 'bg-yellow-900/20',
    },
    dragdrop: {
      icon: FaTasks,
      name: 'Build',
      color: 'text-green-400',
      bg: 'bg-green-900/20',
    },
  };
  
  // Tech type styles mapping
  const techTypeStyles = {
    fullStack: 'border-blue-600/50 from-blue-900/30 to-blue-800/10',
    ai: 'border-purple-600/50 from-purple-900/30 to-purple-800/10',
    android: 'border-green-600/50 from-green-900/30 to-green-800/10',
    cybersecurity: 'border-red-600/50 from-red-900/30 to-red-800/10',
    devops: 'border-yellow-600/50 from-yellow-900/30 to-yellow-800/10',
    algorithms: 'border-cyan-600/50 from-cyan-900/30 to-cyan-800/10',
  };
  
  // Default thumbnails based on planet
  const defaultThumbnails = {
    codeforge: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&q=75&fit=crop&w=600',
    neuron: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&q=75&fit=crop&w=600',
    droidcore: 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?auto=format&q=75&fit=crop&w=600',
    cryptia: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&q=75&fit=crop&w=600',
    devopsprime: 'https://images.unsplash.com/photo-1595617795501-9661aafda72a?auto=format&q=75&fit=crop&w=600',
    algomatrix: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&q=75&fit=crop&w=600',
  };

  // Format difficulty to stars
  const difficultyStars = Array(5)
    .fill(0)
    .map((_, i) => (
      <FaStar 
        key={i} 
        size={12} 
        className={i < difficulty ? 'text-yellow-400' : 'text-gray-600'} 
      />
    ));
  
  // Handler for mission start/continue
  const handleMissionAction = (e) => {
    e.stopPropagation();
    
    if (locked) {
      return;
    }
    
    if (completed) {
      navigate(`/student/${localStorage.getItem('userId')}/gaming/planet/${planetId}/mission/${id}`);
      return;
    }
    
    if (isActive) {
      onContinue(id);
    } else {
      onStart(id);
    }
  };
  
  // Get type config or default
  const currentTypeConfig = typeConfig[type] || typeConfig.code;
  const TypeIcon = currentTypeConfig.icon;
  
  // Get tech style or default
  const techStyle = techTypeStyles[techType] || techTypeStyles.fullStack;
  
  return (
    <>
      <motion.div
        className={`
          border rounded-lg overflow-hidden transition-all
          ${techStyle}
          ${completed ? 'bg-gradient-to-br from-gray-800/80 to-gray-900' : 'bg-gradient-to-br from-gray-800 to-gray-900'}
          ${isActive ? 'ring-2 ring-indigo-500' : ''}
          ${locked ? 'grayscale opacity-80' : ''}
          ${className}
        `}
        whileHover={!locked ? { y: -5, scale: 1.02 } : {}}
        transition={{ duration: 0.2 }}
        onClick={() => !locked && setShowDetails(true)}
      >
        {/* Mission image */}
        <div className="relative w-full h-32">
          <img 
            src={thumbnail || defaultThumbnails[planetId] || 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&q=75&fit=crop&w=600'}
            alt={title}
            className={`w-full h-full object-cover ${completed ? 'opacity-60' : ''}`}
          />
          
          {/* Status overlays */}
          {locked && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <FaLock size={24} className="text-white/80" />
            </div>
          )}
          
          {completed && !locked && (
            <div className="absolute top-2 right-2 bg-green-600/90 w-8 h-8 rounded-full flex items-center justify-center">
              <FaCheckCircle size={16} className="text-white" />
            </div>
          )}
          
          {/* Mission type badge */}
          <div className={`
            absolute bottom-2 left-2 px-2 py-1 rounded-md
            flex items-center ${currentTypeConfig.bg}
          `}>
            <TypeIcon size={12} className={currentTypeConfig.color} />
            <span className="ml-1 text-xs font-medium text-white">
              {currentTypeConfig.name}
            </span>
          </div>
          
          {/* XP reward badge */}
          <div className="absolute bottom-2 right-2 px-2 py-1 bg-indigo-900/70 rounded-md flex items-center">
            <span className="text-xs font-medium text-white">
              {xpReward} XP
            </span>
          </div>
        </div>
        
        {/* Mission info */}
        <div className="p-4">
          <h3 className="font-bold text-white text-lg leading-tight">
            {title}
          </h3>
          
          <div className="flex justify-between items-center mt-2 mb-3">
            <div className="flex items-center">
              {difficultyStars}
            </div>
            
            {timeEstimate && (
              <span className="text-xs text-gray-400">
                ~{timeEstimate}
              </span>
            )}
          </div>
          
          {/* Progress bar (if in progress) */}
          {progress !== null && !completed && !locked && (
            <div className="mt-2 mb-2">
              <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-500" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="flex justify-end mt-0.5">
                <span className="text-xs text-gray-400">
                  {progress}% complete
                </span>
              </div>
            </div>
          )}
          
          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {tags.slice(0, 2).map((tag) => (
                <span 
                  key={tag} 
                  className="px-2 py-0.5 bg-gray-700/80 rounded-full text-xs text-gray-300"
                >
                  {tag}
                </span>
              ))}
              {tags.length > 2 && (
                <span className="px-2 py-0.5 bg-gray-700/80 rounded-full text-xs text-gray-300">
                  +{tags.length - 2} more
                </span>
              )}
            </div>
          )}
        </div>
        
        {/* Action button */}
        <div className="border-t border-gray-700/50 p-3">
          <button
            className={`
              w-full py-2 rounded-md text-sm font-medium
              ${locked ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 
                completed ? 'bg-green-700/50 hover:bg-green-700 text-white' : 
                isActive ? 'bg-indigo-600 hover:bg-indigo-500 text-white' :
                'bg-indigo-700/70 hover:bg-indigo-600 text-white'}
            `}
            onClick={handleMissionAction}
            disabled={locked}
          >
            {locked ? 'Locked' : 
              completed ? 'Replay Mission' : 
              isActive ? 'Continue' : 'Start Mission'}
          </button>
        </div>
      </motion.div>
      
      {/* Mission details modal */}
      {showDetails && (
        <div 
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={() => setShowDetails(false)}
        >
          <motion.div 
            className="bg-gray-900 rounded-xl overflow-hidden max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            {/* Header image */}
            <div className="relative w-full h-48">
              <img 
                src={thumbnail || defaultThumbnails[planetId] || 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&q=75&fit=crop&w=600'}
                alt={title}
                className="w-full h-full object-cover"
              />
              
              {/* Status badge */}
              {completed ? (
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-green-600 text-white text-sm font-medium">
                  Completed
                </div>
              ) : isActive ? (
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-indigo-600 text-white text-sm font-medium">
                  In Progress
                </div>
              ) : null}

              {/* Mission type badge */}
              <div className={`
                absolute bottom-4 left-4 px-3 py-1.5 rounded-md
                flex items-center ${currentTypeConfig.bg}
              `}>
                <TypeIcon size={14} className={currentTypeConfig.color} />
                <span className="ml-2 text-sm font-medium text-white">
                  {currentTypeConfig.name} Mission
                </span>
              </div>
            </div>
            
            {/* Mission content */}
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-1">
                {title}
              </h2>
              
              <div className="flex flex-wrap gap-3 mb-4">
                <div className="flex items-center">
                  <span className="text-gray-400 text-sm mr-2">Difficulty:</span>
                  <div className="flex">{difficultyStars}</div>
                </div>
                
                <div>
                  <span className="text-gray-400 text-sm mr-2">XP Reward:</span>
                  <span className="text-indigo-400 font-medium">{xpReward} XP</span>
                </div>
                
                {timeEstimate && (
                  <div>
                    <span className="text-gray-400 text-sm mr-2">Est. Time:</span>
                    <span className="text-white">{timeEstimate}</span>
                  </div>
                )}
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                {description || "Embark on this mission to test your skills and earn rewards. Complete the challenges to progress through the Tech Odyssey universe."}
              </p>
              
              {/* Tags */}
              {tags.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Skills & Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="px-2.5 py-1 bg-gray-800 rounded-full text-xs text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Progress if mission is active */}
              {isActive && progress !== null && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-white mb-2">Current Progress</h4>
                  <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-500" 
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-end mt-1">
                    <span className="text-sm text-gray-400">
                      {progress}% complete
                    </span>
                  </div>
                </div>
              )}
              
              {/* Locked reason */}
              {locked && lockedReason && (
                <div className="mb-6 p-3 bg-red-900/20 border border-red-800/30 rounded-lg flex items-start">
                  <FaLock className="text-red-500 mt-0.5 mr-2" />
                  <p className="text-red-300 text-sm">{lockedReason}</p>
                </div>
              )}
            </div>
            
            {/* Action buttons */}
            <div className="border-t border-gray-800 p-4 flex justify-end space-x-3">
              <button
                onClick={() => setShowDetails(false)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md"
              >
                Close
              </button>
              
              {!locked && (
                <button
                  onClick={handleMissionAction}
                  className={`
                    px-4 py-2 rounded-md
                    ${completed ? 'bg-green-600 hover:bg-green-500' : 
                      isActive ? 'bg-indigo-600 hover:bg-indigo-500' : 
                      'bg-indigo-600 hover:bg-indigo-500'}
                    text-white
                  `}
                >
                  {completed ? 'Replay Mission' : 
                    isActive ? 'Continue Mission' : 'Start Mission'}
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

MissionCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  planetId: PropTypes.string.isRequired,
  difficulty: PropTypes.number,
  xpReward: PropTypes.number,
  type: PropTypes.oneOf(['code', 'puzzle', 'quiz', 'dragdrop']),
  techType: PropTypes.string,
  completed: PropTypes.bool,
  locked: PropTypes.bool,
  lockedReason: PropTypes.string,
  timeEstimate: PropTypes.string,
  isActive: PropTypes.bool,
  progress: PropTypes.number,
  thumbnail: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  onStart: PropTypes.func,
  onContinue: PropTypes.func,
  className: PropTypes.string,
};

export default MissionCard;