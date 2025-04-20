// src/components/game/SpaceshipNavigator.jsx
import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * Animated spaceship navigator between planets
 */
const SpaceshipNavigator = ({ 
  currentPlanet = null, 
  targetPlanet = null,
  onArrival = () => {},
  speed = 'normal', // slow, normal, fast
  autoStart = false,
  className = ''
}) => {
  const [isNavigating, setIsNavigating] = useState(false);
  const [distance, setDistance] = useState(0);
  const [progress, setProgress] = useState(0);
  const controls = useAnimation();
  
  // Speed calculations
  const speeds = {
    slow: 15000, // 15 seconds
    normal: 8000, // 8 seconds
    fast: 4000 // 4 seconds
  };
  
  const travelDuration = speeds[speed] || speeds.normal;
  
  // Calculate a fake distance between planets
  useEffect(() => {
    if (currentPlanet && targetPlanet && currentPlanet !== targetPlanet) {
      // Generate a somewhat random but consistent distance based on planet ids
      const distVal = (currentPlanet.charCodeAt(0) + targetPlanet.charCodeAt(0)) % 100;
      setDistance(distVal + 50); // Between 50-150 million km
    } else {
      setDistance(0);
    }
  }, [currentPlanet, targetPlanet]);
  
  // Auto-start navigation if enabled
  useEffect(() => {
    if (autoStart && currentPlanet && targetPlanet && !isNavigating) {
      startNavigation();
    }
  }, [autoStart, currentPlanet, targetPlanet]);
  
  // Start the navigation animation
  const startNavigation = () => {
    if (!currentPlanet || !targetPlanet || isNavigating) return;
    
    setIsNavigating(true);
    setProgress(0);
    
    // Spaceship animation
    controls.start({
      x: ['0%', '100%'],
      y: [0, -20, 20, -10, 0],
      rotate: [0, -2, 3, -2, 0],
      transition: {
        x: { duration: travelDuration / 1000, ease: "easeInOut" },
        y: {
          repeat: Infinity,
          duration: 2.5,
          ease: "easeInOut",
          repeatType: "mirror"
        },
        rotate: {
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut",
          repeatType: "mirror"
        }
      }
    });
    
    // Progress update
    let startTime = Date.now();
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min(100, (elapsed / travelDuration) * 100);
      setProgress(currentProgress);
      
      if (currentProgress < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        // We've arrived!
        setTimeout(() => {
          setIsNavigating(false);
          onArrival(targetPlanet);
        }, 500);
      }
    };
    
    requestAnimationFrame(updateProgress);
  };
  
  // Format the distance for display
  const formatDistance = (dist) => {
    if (dist < 100) {
      return `${dist.toFixed(1)} million km`;
    }
    return `${Math.round(dist)} million km`;
  };
  
  return (
    <div className={`bg-gray-900 rounded-xl overflow-hidden ${className}`}>
      <div className="p-4 bg-gradient-to-r from-gray-800 to-gray-900">
        <h3 className="text-lg font-semibold text-white">
          Interplanetary Navigation
        </h3>
        {!isNavigating ? (
          <div>
            {currentPlanet && targetPlanet ? (
              <div className="flex items-center justify-between mt-2">
                <div className="text-gray-300 text-sm">
                  From <span className="text-indigo-400">{currentPlanet}</span> to <span className="text-purple-400">{targetPlanet}</span>
                </div>
                <div className="text-gray-400 text-sm">
                  {formatDistance(distance)}
                </div>
              </div>
            ) : (
              <p className="text-gray-400 text-sm mt-1">
                Select destination to navigate
              </p>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-between mt-2">
            <div className="text-gray-300 text-sm">
              Traveling to <span className="text-purple-400">{targetPlanet}</span>
            </div>
            <div className="text-cyan-400 text-sm">
              {Math.round(progress)}% complete
            </div>
          </div>
        )}
      </div>
      
      {/* Navigation display */}
      <div className="relative h-24 bg-gray-950 overflow-hidden">
        {/* Star field background */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.7 + 0.3
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{
                duration: Math.random() * 2 + 1,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          ))}
          
          {/* Faster stars during navigation */}
          {isNavigating && [...Array(30)].map((_, i) => (
            <motion.div
              key={`warp-${i}`}
              className="absolute h-px bg-cyan-500"
              style={{
                top: `${Math.random() * 100}%`,
                left: '100%',
                width: `${Math.random() * 30 + 10}px`
              }}
              animate={{
                left: ['-30px'],
                opacity: [0, 0.8, 0]
              }}
              transition={{
                duration: Math.random() * 0.5 + 0.2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>
        
        {/* Start and end points */}
        <div className="absolute top-1/2 left-4 transform -translate-y-1/2 w-4 h-4 rounded-full bg-indigo-500 shadow-lg shadow-indigo-500/50" />
        <div className="absolute top-1/2 right-4 transform -translate-y-1/2 w-4 h-4 rounded-full bg-purple-600 shadow-lg shadow-purple-500/50" />
        
        {/* Dotted line between planets */}
        <div className="absolute top-1/2 left-8 right-8 transform -translate-y-1/2 border-b border-dashed border-gray-700" />
        
        {/* Spaceship */}
        <motion.div 
          className="absolute top-1/2 transform -translate-y-1/2 left-8"
          animate={controls}
        >
          <img 
            src="https://cdn-icons-png.flaticon.com/512/3306/3306571.png" 
            className="w-10 h-10 drop-shadow-lg"
            alt="Spaceship" 
          />
        </motion.div>
        
        {/* Progress indicator */}
        {isNavigating && (
          <motion.div 
            className="absolute left-0 right-0 bottom-0 h-1 bg-gradient-to-r from-indigo-600 to-purple-600"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.2 }}
          />
        )}
      </div>
      
      {/* Navigation controls */}
      <div className="p-4 flex justify-between">
        <div className="text-sm text-gray-400">
          {isNavigating ? (
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse mr-2"></div>
              <span>Auto-piloting</span>
            </div>
          ) : (
            <span>Ready for launch</span>
          )}
        </div>
        
        <button
          className={`px-4 py-1 rounded-md text-sm font-medium transition-all ${
            !isNavigating && currentPlanet && targetPlanet 
              ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'
          }`}
          disabled={isNavigating || !currentPlanet || !targetPlanet}
          onClick={startNavigation}
        >
          {isNavigating ? 'Navigating...' : 'Launch'}
        </button>
      </div>
    </div>
  );
};

SpaceshipNavigator.propTypes = {
  currentPlanet: PropTypes.string,
  targetPlanet: PropTypes.string,
  onArrival: PropTypes.func,
  speed: PropTypes.oneOf(['slow', 'normal', 'fast']),
  autoStart: PropTypes.bool,
  className: PropTypes.string
};

export default SpaceshipNavigator;