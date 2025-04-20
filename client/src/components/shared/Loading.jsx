import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Loading = () => {
  const [activeQuadrant, setActiveQuadrant] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [loadingPhase, setLoadingPhase] = useState(0);
  const [showEgg, setShowEgg] = useState(false);
  
  // Acid-dream internet slang
  const crypticMessages = [
    "DECODING REALITY...",
    "MANIFESTING DIMENSION...",
    "BUFFERING CONSCIOUSNESS...",
    "DOWNLOADING VIBES...",
    "CONSTRUCTING REALITY MATRIX"
  ];
  
  // Progress through loading phases
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveQuadrant(prev => (prev + 1) % 4);
      
      if (Math.random() > 0.7) {
        setShowEgg(true);
        setTimeout(() => setShowEgg(false), 400);
      }
    }, 800);
    
    const phaseInterval = setInterval(() => {
      setLoadingPhase(prev => (prev < 4 ? prev + 1 : prev));
    }, 500);
    
    return () => {
      clearInterval(interval);
      clearInterval(phaseInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50 overflow-hidden">
      {/* Hyperspace background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(circle at center, #120022 0%, #000000 100%)',
          transform: 'scale(1.2)',
        }}/>
        
        {/* Star field - reduced count for mobile */}
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`, // More consistent sizing
              height: `${Math.random() * 3 + 1}px`,
              opacity: Math.random() * 0.8 + 0.2,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      
      {/* Split dimension layout - responsive grid */}
      <div className="grid grid-cols-2 grid-rows-2 w-full h-full absolute">
        {[0, 1, 2, 3].map((quadrant) => (
          <motion.div
            key={quadrant}
            className={`relative overflow-hidden`}
            animate={{
              backgroundColor: activeQuadrant === quadrant 
                ? ['rgba(255,0,255,0.1)', 'rgba(0,255,255,0.1)', 'rgba(255,255,0,0.1)'] 
                : 'rgba(0,0,0,0)'
            }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="absolute inset-0 opacity-50"
              style={{
                backgroundImage: 
                  quadrant === 0 ? 'linear-gradient(45deg, #ff00ff 0%, transparent 70%)' :
                  quadrant === 1 ? 'linear-gradient(135deg, #00ffff 0%, transparent 70%)' :
                  quadrant === 2 ? 'linear-gradient(225deg, #ffff00 0%, transparent 70%)' :
                  'linear-gradient(315deg, #ff00aa 0%, transparent 70%)',
              }}
              animate={{ opacity: activeQuadrant === quadrant ? 0.3 : 0.05 }}
              transition={{ duration: 0.5 }}
            />
            
            {/* Each quadrant content - responsive text size and positioning */}
            {quadrant === activeQuadrant && (
              <motion.div 
                className="absolute text-base sm:text-lg md:text-xl font-extrabold"
                style={{
                  left: quadrant % 2 === 0 ? '10%' : 'auto', // Less left padding on mobile
                  right: quadrant % 2 === 1 ? '10%' : 'auto', // Less right padding on mobile
                  top: quadrant < 2 ? '40%' : 'auto',
                  bottom: quadrant >= 2 ? '40%' : 'auto',
                  fontFamily: 'monospace',
                  mixBlendMode: 'difference'
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 2, opacity: 0 }}
              >
                <div className="flex items-center">
                  <div className={`text-${
                    quadrant === 0 ? 'fuchsia-400' :
                    quadrant === 1 ? 'cyan-400' :
                    quadrant === 2 ? 'yellow-300' :
                    'rose-400'
                  } whitespace-nowrap`}> {/* prevent text wrapping */}
                    {crypticMessages[loadingPhase % crypticMessages.length]}
                  </div>
                  <div className="ml-2 animate-pulse">⚡</div>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
      
      {/* Central portal - responsive sizing */}
      <div className="relative z-10 pointer-events-auto">
        <div
          className="absolute -inset-20 sm:-inset-32 md:-inset-40 rounded-full opacity-10" // Responsive inset
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%)',
          }}
        />
        
        <motion.div
          className="relative z-10"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {/* Responsive SVG size */}
          <svg 
            width="100%" 
            height="100%" 
            viewBox="0 0 100 100" 
            className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72"
          >
            <defs>
              <linearGradient id="portalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff00ea" />
                <stop offset="50%" stopColor="#00fffb" />
                <stop offset="100%" stopColor="#ffe600" />
              </linearGradient>
            </defs>
            <motion.path
              d="M50,10 
                 A40,40 0 1,0 90,50
                 A40,40 0 1,0 50,10
                 Z"
              stroke="url(#portalGradient)"
              strokeWidth="1"
              fill="none"
              strokeDasharray="3,5"
              animate={{
                strokeDashoffset: [0, -100],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.path
              d="M50,15 
                 A35,35 0 1,0 85,50
                 A35,35 0 1,0 50,15
                 Z"
              stroke="url(#portalGradient)"
              strokeWidth="1"
              fill="none"
              strokeDasharray="5,5"
              animate={{
                strokeDashoffset: [0, 100],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.path
              d="M50,20 
                 A30,30 0 1,0 80,50
                 A30,30 0 1,0 50,20
                 Z"
              stroke="url(#portalGradient)"
              strokeWidth="1"
              fill="none"
              strokeDasharray="2,4"
              animate={{
                strokeDashoffset: [0, -60],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </svg>
        </motion.div>
        
        {/* Hyperpop central loader - responsive sizing */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <motion.div
            className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 flex items-center justify-center" // Responsive sizing
            initial={false}
            animate={{ 
              scale: hovered ? 1.15 : 1 
            }}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
          >
            {/* Glitch effect */}
            {showEgg && (
              <motion.div
                className="absolute inset-0 bg-white mix-blend-difference"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.8, 0] }}
                transition={{ duration: 0.3 }}
              />
            )}
            
            {/* Inner portal */}
            <motion.div 
              className="absolute w-full h-full rounded-full"
              style={{
                background: 'linear-gradient(135deg, rgba(255,0,255,0.3), rgba(0,255,255,0.3))',
                backdropFilter: 'blur(5px)',
                boxShadow: '0 0 20px rgba(255,0,255,0.5)',
              }}
              animate={{ 
                boxShadow: [
                  '0 0 20px rgba(255,0,255,0.5)',
                  '0 0 30px rgba(0,255,255,0.5)',
                  '0 0 20px rgba(255,255,0,0.5)',
                  '0 0 20px rgba(255,0,255,0.5)'
                ],
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Central logo morph - responsive sizing */}
            <motion.div 
              className="absolute"
              animate={{ 
                rotate: hovered ? [0, 90, 180, 270, 360] : 0
              }}
              transition={{
                duration: 2,
                ease: "easeInOut"
              }}
            >
              <motion.div
                className="text-3xl sm:text-4xl md:text-5xl drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]"
                animate={{
                  scale: [0.8, 1.2, 0.8],
                  rotateY: [0, 180, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {loadingPhase < 3 ? "⌛" : loadingPhase < 4 ? "⏳" : "✓"}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Central binary stream - responsive adaptation */}
      <div className="fixed inset-x-0 h-px top-1/2 bg-transparent max-w-full overflow-hidden">
        <div className="absolute inset-0 flex justify-around">
          {Array.from({ length: 30 }).map((_, i) => ( // Reduced count for mobile performance
            <motion.div
              key={i}
              className={`text-xs font-mono ${i % 2 === 0 ? 'text-fuchsia-500' : 'text-cyan-400'}`}
              initial={{ y: Math.random() > 0.5 ? -20 : 20, opacity: 0 }}
              animate={{ 
                y: Math.random() > 0.5 ? 20 : -20, 
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1 + Math.random(),
                repeat: Infinity,
                delay: i * 0.05,
              }}
            >
              {Math.random() > 0.5 ? '1' : '0'}
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Loading percentage - responsive width */}
      <motion.div 
        className="fixed bottom-6 sm:bottom-8 md:bottom-10 left-0 right-0 text-center px-4" // Added padding and responsive positioning
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center">
          <div className="text-xs uppercase tracking-widest mb-1 font-mono text-white/60">
            Loading Experience
          </div>
          <div className="relative w-48 sm:w-56 md:w-64 h-1.5 bg-white/20 rounded-full overflow-hidden"> {/* Responsive width */}
            <motion.div 
              className="absolute h-full bg-gradient-to-r from-fuchsia-500 via-cyan-500 to-yellow-500"
              style={{ originX: 0 }}
              animate={{ scaleX: loadingPhase * 0.25 }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <motion.div 
            className="text-xs mt-2 font-bold text-white"
            key={loadingPhase}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {loadingPhase * 25}%
          </motion.div>
        </div>
      </motion.div>
      
      {/* Floating elements - hide some on smaller screens for better performance */}
      {Array.from({ length: 7 }).map((_, i) => {
        const shapes = ['△', '○', '□', '◇', '⬟', '▣', '⬡'];
        return (
          <motion.div
            key={i}
            className={`fixed text-xl sm:text-2xl font-bold text-white/70 mix-blend-difference ${i > 4 ? 'hidden sm:block' : ''}`} // Hide some on mobile
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              y: [0, -20, 0, 20, 0], // Reduced movement range for smaller screens
              x: [0, 15, 0, -15, 0],
              rotate: [0, 180, 360],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 5 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {shapes[i]}
          </motion.div>
        );
      })}
      
      {/* Optional: Add device-specific messaging */}
      <div className="absolute top-4 left-4 text-xs text-white/30 font-mono hidden sm:block">
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          system.responsive = true
        </motion.div>
      </div>
    </div>
  );
};

export default Loading;