import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateGamerTag, loadingTips, gameSoundEffects } from './GameAssets';

const GameLoading = ({ onComplete, minDuration = 4000 }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing...');
  const [tips, setTips] = useState([]);
  const [activeTip, setActiveTip] = useState(0);
  const [showSkipButton, setShowSkipButton] = useState(false);
  const [glitchEffect, setGlitchEffect] = useState(false);
  const [gamerTag] = useState(generateGamerTag());
  
  // Loading progress simulation
  useEffect(() => {
    // Set up initial tips
    setTips(loadingTips);
    
    // Start progress animation
    const startTime = Date.now();
    
    // Show skip button after 1.5 seconds
    const skipTimer = setTimeout(() => {
      setShowSkipButton(true);
    }, 1500);
    
    // Create random glitch effects
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setGlitchEffect(true);
        setTimeout(() => setGlitchEffect(false), 200);
      }
    }, 2000);
    
    // Progress interval
    const interval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const calculatedProgress = Math.min(100, (elapsedTime / minDuration) * 100);
      setLoadingProgress(calculatedProgress);
      
      // Update loading text based on progress
      if (calculatedProgress < 10) {
        setLoadingText('Initializing game engine...');
      } else if (calculatedProgress < 30) {
        setLoadingText('Loading assets...');
      } else if (calculatedProgress < 50) {
        setLoadingText('Rendering game world...');
      } else if (calculatedProgress < 70) {
        setLoadingText('Connecting to server...');
      } else if (calculatedProgress < 90) {
        setLoadingText('Finalizing setup...');
      } else {
        setLoadingText('Ready to launch!');
      }
      
      // Complete loading when progress reaches 100
      if (calculatedProgress >= 100) {
        clearInterval(interval);
        clearInterval(glitchInterval);
        clearTimeout(skipTimer);
        
        // Add a small delay for visual effect
        setTimeout(() => {
          onComplete();
        }, 500);
      }
    }, 100); // Update every 100ms
    
    // Clean up on unmount
    return () => {
      clearInterval(interval);
      clearInterval(glitchInterval);
      clearTimeout(skipTimer);
    };
  }, [minDuration, onComplete]);
  
  // Load and cycle through tips
  useEffect(() => {
    // Only start cycling once we have tips
    if (tips.length === 0) return;
    
    // Change tip every 4 seconds
    const tipInterval = setInterval(() => {
      setActiveTip(prev => (prev + 1) % tips.length);
    }, 4000);
    
    return () => clearInterval(tipInterval);
  }, [tips]);
  
  const handleSkip = () => {
    // Play click sound from assets
    const audio = new Audio(gameSoundEffects.buttonClick);
    audio.volume = 0.3;
    audio.play().catch(e => console.log('Audio play prevented:', e));
    
    // Set progress to 100 to trigger completion
    setLoadingProgress(100);
  };
  
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-900 overflow-hidden">
      {/* Cyberpunk/gaming grid background */}
      <div className="absolute inset-0 bg-black overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: `url(https://cdn.pixabay.com/photo/2018/03/16/03/34/network-3230393_1280.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.15
        }}></div>
        
        {/* Animated grid overlay */}
        <div className="absolute inset-0" style={{
          background: `linear-gradient(to top, rgba(0,0,0,0.8), transparent)`,
          backgroundSize: `40px 40px`,
          backgroundImage: `
            linear-gradient(to right, rgba(103, 232, 249, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(103, 232, 249, 0.1) 1px, transparent 1px)
          `,
          backgroundPosition: '0 0',
          animation: 'gridMove 15s linear infinite',
          transform: 'perspective(500px) rotateX(60deg)',
          transformOrigin: 'center bottom',
          height: '80%'
        }}></div>
      </div>
      
      {/* Glitch effect overlay */}
      <AnimatePresence>
        {glitchEffect && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-cyan-500/10 z-10"
          />
        )}
      </AnimatePresence>
      
      {/* Central loading content */}
      <div className="container max-w-3xl mx-auto px-4 z-20">
        {/* Game logo */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", duration: 1 }}
          className="flex justify-center mb-12"
        >
          <div className="relative">
            <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 tracking-tight">
              CTECHX
            </div>
            <div className="absolute -top-1 -left-1 text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 tracking-tight opacity-50 blur-[1px]">
              CTECHX
            </div>
            <motion.div
              className="absolute -bottom-2 text-xs font-mono text-cyan-500 tracking-wider"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              NEXT-GEN LEARNING
            </motion.div>
          </div>
        </motion.div>
        
        {/* Player ID */}
        <div className="flex justify-between items-center mb-8">
          <div className="px-3 py-1 bg-gray-800/80 rounded-md flex items-center">
            <div className="w-2 h-2 rounded-full bg-cyan-400 mr-2 animate-pulse"></div>
            <span className="text-xs text-gray-400 font-mono">SESSION_ID:</span>
            <span className="ml-2 text-xs text-cyan-400 font-mono">{gamerTag}</span>
          </div>
          
          <div className="px-3 py-1 bg-gray-800/80 rounded-md">
            <span className="text-xs text-gray-400 font-mono">
              v1.0.
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                _
              </motion.span>
            </span>
          </div>
        </div>
        
        {/* Loading bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-mono text-gray-400">{loadingText}</div>
            <div className="text-sm font-mono text-cyan-400">{Math.round(loadingProgress)}%</div>
          </div>
          
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden relative">
            {/* Loading bar sections */}
            <div className="absolute inset-0 flex">
              {Array.from({ length: 10 }).map((_, i) => (
                <div 
                  key={i} 
                  className="h-full flex-1 border-r border-r-gray-900 last:border-r-0"
                ></div>
              ))}
            </div>
            
            {/* Progress fill */}
            <motion.div 
              className="h-full bg-gradient-to-r from-indigo-600 via-cyan-400 to-indigo-600 rounded-full"
              style={{ width: `${loadingProgress}%`, backgroundSize: '200% 100%' }}
              animate={{
                backgroundPosition: ['0% center', '100% center']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "mirror"
              }}
            >
              {/* Loading bar shine effect */}
              <div className="w-full h-full relative">
                <motion.div 
                  className="absolute h-full w-10 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                  animate={{ x: [-40, 400] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatDelay: 0.5
                  }}
                />
              </div>
            </motion.div>
          </div>
          
          {/* Loading chunks visualization */}
          <div className="mt-2 flex gap-1">
            {Array.from({ length: 10 }).map((_, i) => (
              <motion.div 
                key={i}
                className="h-1 flex-1 rounded-full"
                animate={{ 
                  backgroundColor: loadingProgress >= (i + 1) * 10 
                    ? 'rgb(139 92 246)' // Purple for loaded sections
                    : 'rgb(55 65 81)' // Gray for unloaded
                }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            ))}
          </div>
        </div>
        
        {/* Tips carousel */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700 mb-8">
          <div className="flex items-center mb-2">
            <div className="w-4 h-4 rounded-full bg-indigo-500/80 flex items-center justify-center">
              <span className="text-xs">💡</span>
            </div>
            <div className="ml-2 text-xs font-semibold text-gray-300">PLAYER TIP:</div>
          </div>
          
          <div className="h-12 overflow-hidden relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTip}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-sm text-gray-400"
              >
                {tips[activeTip]}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        
        {/* Skip button */}
        <AnimatePresence>
          {showSkipButton && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="text-center"
            >
              <button
                onClick={handleSkip}
                className="px-4 py-2 rounded-md bg-gray-800/70 hover:bg-gray-700/70 text-gray-300 text-sm font-medium transition-colors duration-200"
              >
                Press any key or click to skip
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Resource loading indicator */}
      <div className="fixed bottom-4 left-4 text-xs font-mono text-gray-500 flex flex-col">
        <motion.div 
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          downloading resources...
        </motion.div>
        
        {loadingProgress > 30 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-1"
          >
            initializing game engine...
          </motion.div>
        )}
        
        {loadingProgress > 60 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-1"
          >
            connecting to server...
          </motion.div>
        )}
        
        {loadingProgress > 80 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-1 text-green-500"
          >
            connection established
          </motion.div>
        )}
      </div>
      
      {/* Animated particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="fixed w-1 h-1 bg-indigo-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}
      
      {/* Global loading animation styles */}
      <style jsx="true" global="true">{`
        @keyframes gridMove {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 0 40px;
          }
        }
      `}</style>
    </div>
  );
};

export default GameLoading;