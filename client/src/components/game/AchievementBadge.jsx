// src/components/game/AchievementBadge.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * Achievement badge component with animation and details modal
 */
const AchievementBadge = ({
  id,
  title,
  description,
  icon,
  rarity = 'common',
  unlocked = false,
  progress = null,
  criteriaType = '',
  criteriaValue = 0,
  currentValue = 0,
  unlockDate = null,
  techType = null,
  className = '',
  size = 'md'
}) => {
  const [showDetails, setShowDetails] = useState(false);
  
  // Rarity styles
  const rarityStyles = {
    common: {
      bg: 'bg-gradient-to-br from-gray-500 to-gray-700',
      border: 'border-gray-500',
      glow: 'shadow-gray-500/20',
      text: 'text-gray-300'
    },
    uncommon: {
      bg: 'bg-gradient-to-br from-green-500 to-green-700',
      border: 'border-green-500',
      glow: 'shadow-green-500/30',
      text: 'text-green-300'
    },
    rare: {
      bg: 'bg-gradient-to-br from-blue-500 to-blue-700',
      border: 'border-blue-500',
      glow: 'shadow-blue-500/30',
      text: 'text-blue-300'
    },
    epic: {
      bg: 'bg-gradient-to-br from-purple-500 to-purple-700',
      border: 'border-purple-500',
      glow: 'shadow-purple-500/30',
      text: 'text-purple-300'
    },
    legendary: {
      bg: 'bg-gradient-to-br from-yellow-400 to-amber-700',
      border: 'border-yellow-400',
      glow: 'shadow-yellow-400/30',
      text: 'text-yellow-300'
    }
  };
  
  // Size styles
  const sizeStyles = {
    sm: {
      badge: 'w-12 h-12',
      icon: 'w-6 h-6'
    },
    md: {
      badge: 'w-16 h-16',
      icon: 'w-8 h-8'
    },
    lg: {
      badge: 'w-24 h-24',
      icon: 'w-12 h-12'
    }
  };
  
  // Default icon based on tech type
  const getDefaultIcon = () => {
    const techIcons = {
      fullStack: 'https://cdn-icons-png.flaticon.com/512/2721/2721626.png',
      ai: 'https://cdn-icons-png.flaticon.com/512/2103/2103832.png',
      android: 'https://cdn-icons-png.flaticon.com/512/682/682459.png',
      cybersecurity: 'https://cdn-icons-png.flaticon.com/512/2716/2716652.png',
      devops: 'https://cdn-icons-png.flaticon.com/512/2150/2150438.png',
      algorithms: 'https://cdn-icons-png.flaticon.com/512/2784/2784567.png'
    };
    
    return techType && techIcons[techType] 
      ? techIcons[techType]
      : 'https://cdn-icons-png.flaticon.com/512/2598/2598181.png';
  };
  
  // Format criteria in user-friendly text
  const formatCriteria = () => {
    const criteriaLabels = {
      totalXP: `Earn ${criteriaValue} total XP`,
      techXP: `Earn ${criteriaValue} ${techType || 'tech'} XP`,
      missionCount: `Complete ${criteriaValue} missions`,
      level: `Reach level ${criteriaValue}`,
      planetsMastered: `Master ${criteriaValue} planets`
    };
    
    return criteriaLabels[criteriaType] || 'Complete special criteria';
  };
  
  // Calculate progress percentage
  const progressPercentage = progress !== null 
    ? progress 
    : (currentValue && criteriaValue ? Math.min(100, (currentValue / criteriaValue) * 100) : null);
  
  // Use the specified icon or fall back to a default based on tech type
  const badgeIcon = icon || getDefaultIcon();
  
  // Format unlock date
  const formattedDate = unlockDate 
    ? new Date(unlockDate).toLocaleDateString() 
    : null;
    
  const style = rarityStyles[rarity] || rarityStyles.common;
  const sizes = sizeStyles[size] || sizeStyles.md;
  
  return (
    <>
      <motion.div
        className={`relative ${className}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowDetails(true)}
      >
        {/* Achievement badge */}
        <div 
          className={`
            ${sizes.badge} p-1 rounded-full border-2 cursor-pointer
            ${unlocked 
              ? `${style.border} ${style.bg} shadow-lg ${style.glow}` 
              : 'bg-gray-800/70 border-gray-700 grayscale opacity-50'
            }
          `}
        >
          <div className="rounded-full bg-gray-900/50 w-full h-full flex items-center justify-center overflow-hidden">
            <img 
              src={badgeIcon} 
              alt={title}
              className={`${sizes.icon} ${!unlocked ? 'opacity-50' : ''}`} 
            />
          </div>
        </div>
        
        {/* Progress ring */}
        {!unlocked && progressPercentage !== null && (
          <svg 
            className="absolute inset-0 w-full h-full -rotate-90"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="47"
              fill="none"
              stroke="currentColor"
              strokeWidth="6"
              className="text-gray-700"
            />
            <circle
              cx="50"
              cy="50"
              r="47"
              fill="none"
              stroke="currentColor"
              strokeWidth="6"
              strokeDasharray="295"
              strokeDashoffset={295 - (295 * (progressPercentage / 100))}
              className="text-blue-500"
              strokeLinecap="round"
            />
          </svg>
        )}
      </motion.div>
      
      {/* Details Modal */}
      {showDetails && (
        <div 
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={() => setShowDetails(false)}
        >
          <motion.div 
            className="bg-gray-800 rounded-xl max-w-md w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            {/* Header with badge */}
            <div className={`p-6 flex items-center ${style.bg}`}>
              <div className={`
                w-20 h-20 rounded-full border-4 ${style.border} bg-gray-900/50
                flex items-center justify-center mr-4
              `}>
                <img 
                  src={badgeIcon} 
                  alt={title}
                  className="w-12 h-12" 
                />
              </div>
              
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white">{title}</h3>
                <div className="flex items-center">
                  <span className={`text-sm font-medium capitalize ${style.text}`}>
                    {rarity}
                  </span>
                  {unlocked && formattedDate && (
                    <span className="text-xs text-gray-300 ml-2">
                      Unlocked on {formattedDate}
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            {/* Achievement details */}
            <div className="p-6">
              <p className="text-gray-300">
                {description}
              </p>
              
              <div className="mt-4 p-3 bg-gray-700/50 rounded-lg">
                <div className="text-sm text-gray-300">
                  <strong className="text-white">Criteria:</strong> {formatCriteria()}
                </div>
                
                {/* Progress bar for locked achievements */}
                {!unlocked && progressPercentage !== null && (
                  <div className="mt-2">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>Progress</span>
                      <span>
                        {currentValue}/{criteriaValue} ({Math.round(progressPercentage)}%)
                      </span>
                    </div>
                    <div className="h-2 bg-gray-600 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500"
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                
                {/* Unlocked status */}
                {unlocked && (
                  <div className="mt-2 flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-green-300 text-sm">Achievement unlocked!</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Close button */}
            <div className="border-t border-gray-700 p-4 flex justify-end">
              <button
                onClick={() => setShowDetails(false)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

AchievementBadge.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  icon: PropTypes.string,
  rarity: PropTypes.oneOf(['common', 'uncommon', 'rare', 'epic', 'legendary']),
  unlocked: PropTypes.bool,
  progress: PropTypes.number,
  criteriaType: PropTypes.string,
  criteriaValue: PropTypes.number,
  currentValue: PropTypes.number,
  unlockDate: PropTypes.string,
  techType: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg'])
};

export default AchievementBadge;