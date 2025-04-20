// src/components/missions/common/MissionComplete.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import confetti from 'canvas-confetti';
import { FaStar, FaTrophy, FaCheck, FaLightbulb, FaMedal, FaRocket } from 'react-icons/fa';

/**
 * Mission completion screen with score, rewards, and celebration effects
 */
const MissionComplete = ({
  score = 100,
  maxScore = 100,
  xpEarned = 0,
  onComplete = () => {},
  newAchievements = [],
  newItems = [],
  title = 'Mission Complete!',
  message = 'Great job! You\'ve successfully completed this mission.',
  tips = [],
  planetId = 'codeforge'
}) => {
  const [showDetails, setShowDetails] = useState(false);
  
  // Calculate stars based on score percentage
  const scorePercent = (score / maxScore) * 100;
  const stars = scorePercent >= 90 ? 3 : scorePercent >= 70 ? 2 : 1;
  
  // Apply confetti effect on mount
  useEffect(() => {
    // Launch confetti
    const launchConfetti = () => {
      const count = 200;
      const defaults = {
        origin: { y: 0.7 },
        shapes: ['star', 'circle'],
        ticks: 200
      };
      
      const particleColors = ['#9c5fff', '#55ddff', '#ff9a44'];
      
      confetti({
        ...defaults,
        particleCount: count * 0.35,
        scalar: 1.2,
        colors: particleColors,
        spread: 80
      });
      
      setTimeout(() => {
        confetti({
          ...defaults,
          particleCount: count * 0.25,
          scalar: 0.8,
          colors: particleColors,
          spread: 65
        });
      }, 250);
      
      setTimeout(() => {
        confetti({
          ...defaults,
          particleCount: count * 0.2,
          scalar: 1.5,
          colors: particleColors,
          spread: 70
        });
      }, 500);
    };
    
    // Launch confetti with slight delay
    setTimeout(launchConfetti, 500);
    
    // Auto-expand details after a delay
    setTimeout(() => {
      setShowDetails(true);
    }, 2000);
    
    // Add keydown listener for Enter key
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        onComplete();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete]);
  
  // Planet-specific background gradients
  const planetBackgrounds = {
    codeforge: 'from-blue-900/50 to-indigo-900/50',
    neuron: 'from-purple-900/50 to-fuchsia-900/50',
    droidcore: 'from-green-900/50 to-emerald-900/50',
    cryptia: 'from-red-900/50 to-rose-900/50',
    devopsprime: 'from-yellow-900/50 to-amber-900/50',
    algomatrix: 'from-cyan-900/50 to-sky-900/50',
  };
  
  const bgGradient = planetBackgrounds[planetId] || planetBackgrounds.codeforge;
  
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-gray-900/90 p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className={`bg-gray-800 rounded-2xl overflow-hidden shadow-2xl max-w-2xl w-full border border-indigo-500/30`}
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ 
          type: 'spring', 
          stiffness: 300, 
          damping: 20,
          delay: 0.1
        }}
      >
        {/* Success header */}
        <div className={`bg-gradient-to-r ${bgGradient} border-b border-indigo-500/20 p-8 text-center relative overflow-hidden`}>
          {/* Celebration star particles */}
          <div className="absolute inset-0">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-yellow-400"
                initial={{
                  x: Math.random() * 100 - 50,
                  y: Math.random() * 100 - 50,
                  scale: 0,
                  opacity: 0
                }}
                animate={{
                  x: Math.random() * 300 - 150,
                  y: Math.random() * 300 - 150,
                  scale: Math.random() * 0.5 + 0.1,
                  opacity: [0, 1, 0],
                  rotate: Math.random() * 360
                }}
                transition={{
                  duration: Math.random() * 10 + 5,
                  repeat: Infinity,
                  delay: Math.random() * 5
                }}
              >
                ✦
              </motion.div>
            ))}
          </div>
          
          {/* Trophy icon */}
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-yellow-600/30 border border-yellow-500/50 mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
            transition={{ 
              scale: { type: 'spring', stiffness: 400, damping: 10, delay: 0.2 },
              rotate: { duration: 0.5, delay: 0.7 }
            }}
          >
            <FaTrophy className="text-4xl text-yellow-500" />
          </motion.div>
          
          <motion.h2
            className="text-3xl font-bold text-white mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {title}
          </motion.h2>
          
          <motion.p
            className="text-gray-300 max-w-lg mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {message}
          </motion.p>
          
          {/* Star rating */}
          <motion.div
            className="flex justify-center mt-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: 'spring' }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={i < stars ? {
                  scale: [1, 1.5, 1],
                  rotate: [0, 10, -10, 0],
                } : {}}
                transition={{
                  delay: 0.8 + i * 0.2,
                  duration: 0.5
                }}
                className="relative mx-2"
              >
                <FaStar 
                  size={40} 
                  className={i < stars ? 'text-yellow-500' : 'text-gray-700'} 
                />
                {i < stars && (
                  <motion.div
                    className="absolute inset-0 text-yellow-400"
                    animate={{
                      opacity: [0, 0.8, 0],
                      scale: [1, 2, 2]
                    }}
                    transition={{
                      delay: 0.8 + i * 0.2,
                      duration: 0.7,
                    }}
                  >
                    <FaStar size={40} />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        {/* Score and rewards */}
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            {/* Score */}
            <div className="mb-4 md:mb-0">
              <h3 className="text-gray-400 text-sm mb-1">Your Score</h3>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-white">{score}</span>
                <span className="text-gray-400 ml-1">/ {maxScore}</span>
              </div>
            </div>
            
            {/* XP gained */}
            <div>
              <h3 className="text-gray-400 text-sm mb-1">XP Earned</h3>
              <div className="flex items-center">
                <FaStar className="text-yellow-500 mr-2" />
                <span className="text-3xl font-bold text-white">{xpEarned || score}</span>
              </div>
            </div>
          </div>
          
          {/* Details section */}
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: showDetails ? 'auto' : 0,
              opacity: showDetails ? 1 : 0
            }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden"
          >
            {/* Tips for improvement */}
            {tips.length > 0 && (
              <div className="mb-6">
                <h3 className="flex items-center text-blue-400 font-medium mb-3">
                  <FaLightbulb className="mr-2" /> Learning Tips
                </h3>
                <ul className="space-y-2">
                  {tips.map((tip, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2 + index * 0.1 }}
                    >
                      <FaCheck className="text-green-500 mt-1 mr-2" />
                      <span className="text-gray-300">{tip}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* New achievements */}
            {newAchievements.length > 0 && (
              <div className="mb-6">
                <h3 className="flex items-center text-yellow-400 font-medium mb-3">
                  <FaMedal className="mr-2" /> Achievements Unlocked
                </h3>
                <div className="space-y-3">
                  {newAchievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      className="bg-gray-700/50 border border-gray-600 rounded-lg p-3 flex"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.5 + index * 0.15 }}
                    >
                      <div className="w-12 h-12 rounded-full bg-yellow-900/50 border border-yellow-700 flex items-center justify-center mr-3">
                        {achievement.icon || <FaTrophy className="text-yellow-500" />}
                      </div>
                      <div>
                        <h4 className="font-medium text-white">{achievement.title}</h4>
                        <p className="text-sm text-gray-400">{achievement.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
            
            {/* New items */}
            {newItems.length > 0 && (
              <div className="mb-6">
                <h3 className="flex items-center text-purple-400 font-medium mb-3">
                  <FaRocket className="mr-2" /> Items Acquired
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {newItems.map((item, index) => (
                    <motion.div
                      key={index}
                      className="bg-gray-700/50 border border-gray-600 rounded-lg p-3 flex"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.8 + index * 0.1 }}
                    >
                      <div className="w-10 h-10 rounded bg-indigo-900/50 border border-indigo-700 flex items-center justify-center mr-3">
                        <img 
                          src={item.icon || 'https://img.icons8.com/fluency/96/000000/treasure-chest.png'} 
                          alt={item.name}
                          className="w-6 h-6"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-white">{item.name}</h4>
                        <p className="text-xs text-gray-400">{item.type}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
          
          {/* Toggle details button */}
          <button
            className="text-gray-400 hover:text-white text-sm flex items-center mx-auto mt-2"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? 'Hide details' : 'Show details'}
            <span className={`ml-1 transition-transform ${showDetails ? 'rotate-180' : ''}`}>▼</span>
          </button>
        </div>
        
        {/* Action button */}
        <div className="border-t border-gray-700 p-4 flex justify-center">
          <motion.button
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg"
            onClick={onComplete}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            Continue Your Journey
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

MissionComplete.propTypes = {
  score: PropTypes.number,
  maxScore: PropTypes.number,
  xpEarned: PropTypes.number,
  onComplete: PropTypes.func,
  newAchievements: PropTypes.array,
  newItems: PropTypes.array,
  title: PropTypes.string,
  message: PropTypes.string,
  tips: PropTypes.array,
  planetId: PropTypes.string
};

export default MissionComplete;