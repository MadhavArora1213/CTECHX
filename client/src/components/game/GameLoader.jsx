// src/components/game/GameLoader.jsx
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

/**
 * Game loader with animations and progress display
 */
const GameLoader = ({
  progress = 0,  // 0-100
  message = null,
  tips = [],
  minDisplayTime = 2000,
  onFinished = () => {},
  showTips = true,
}) => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [canFinish, setCanFinish] = useState(false);
  
  // Auto-rotate tips
  useEffect(() => {
    if (!showTips || tips.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentTipIndex(prevIndex => (prevIndex + 1) % tips.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [tips, showTips]);
  
  // Handle minimum display time
  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => {
        setCanFinish(true);
      }, minDisplayTime);
      
      return () => clearTimeout(timer);
    }
  }, [progress, minDisplayTime]);
  
  // Call finish when both progress is complete and minimum time elapsed
  useEffect(() => {
    if (progress >= 100 && canFinish) {
      onFinished();
    }
  }, [progress, canFinish, onFinished]);
  
  // Get a different color for each progress stage
  const getProgressColor = () => {
    if (progress < 30) return 'from-blue-500 to-indigo-600';
    if (progress < 60) return 'from-indigo-500 to-purple-600';
    if (progress < 90) return 'from-purple-500 to-pink-600';
    return 'from-pink-500 to-red-500';
  };
  
  // Get current tip if tips are enabled
  const currentTip = showTips && tips.length > 0 ? tips[currentTipIndex] : null;
  
  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center bg-gray-900 z-50 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
      
      {/* Tech Odyssey Logo */}
      <motion.div
        className="text-center mb-12"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-2">
          Tech Odyssey
        </h1>
        <p className="text-xl text-gray-400">Rise of the Polyglot Hero</p>
      </motion.div>
      
      {/* Main loader content */}
      <div className="w-80 md:w-96 px-4">
        {/* Spaceship icon that moves with progress */}
        <div className="relative h-10 mb-6">
          <motion.div
            className="absolute"
            animate={{
              x: `${progress}%`,
              rotate: [0, 5, 0, -5, 0],
            }}
            transition={{
              x: { type: 'spring', stiffness: 60 },
              rotate: {
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut"
              }
            }}
            style={{ left: '-20px' }}
          >
            <img 
              src="https://cdn-icons-png.flaticon.com/512/3688/3688306.png" 
              alt="Spaceship" 
              className="w-10 h-10" 
            />
          </motion.div>
        </div>
        
        {/* Progress bar */}
        <div className="h-3 w-full bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className={`h-full bg-gradient-to-r ${getProgressColor()}`}
            style={{ width: `${progress}%` }}
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ type: 'spring', stiffness: 50, damping: 10 }}
          />
        </div>
        
        {/* Progress percentage */}
        <div className="flex justify-between mt-2">
          <span className="text-gray-400 text-sm">Loading game assets</span>
          <span className="text-white font-medium">{Math.round(progress)}%</span>
        </div>
        
        {/* Custom message if provided */}
        {message && (
          <motion.div
            className="mt-4 text-center text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key={message}
          >
            {message}
          </motion.div>
        )}
      </div>
      
      {/* Tip display */}
      {currentTip && (
        <motion.div
          className="absolute bottom-10 w-full max-w-md px-6 py-4 bg-gray-800/60 backdrop-blur rounded-lg text-center mx-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          key={currentTipIndex}
        >
          <span className="text-yellow-500 block mb-1 text-sm font-medium">TIP:</span>
          <p className="text-gray-200">{currentTip}</p>
        </motion.div>
      )}
      
      {/* "Press any key" when loading is complete */}
      {progress >= 100 && (
        <motion.div
          className="absolute bottom-4 left-0 right-0 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <p className="text-indigo-400 text-lg">Click anywhere to continue</p>
        </motion.div>
      )}
    </motion.div>
  );
};

GameLoader.propTypes = {
  progress: PropTypes.number,
  message: PropTypes.string,
  tips: PropTypes.arrayOf(PropTypes.string),
  minDisplayTime: PropTypes.number,
  onFinished: PropTypes.func,
  showTips: PropTypes.bool,
};

export default GameLoader;