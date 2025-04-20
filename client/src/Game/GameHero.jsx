import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';

const GameHero = ({ isActive, onInteraction }) => {
  const [collectedItems, setCollectedItems] = useState([]);
  const [hoverButton, setHoverButton] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Transform for 3D effect
  const rotateX = useTransform(mouseY, [-100, 100], [10, -10]);
  const rotateY = useTransform(mouseX, [-100, 100], [-10, 10]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };
  
  const collectItem = (id) => {
    if (!collectedItems.includes(id)) {
      setCollectedItems(prev => [...prev, id]);
      onInteraction();
    }
  };

  // Items to collect in this game level
  const collectibles = [
    { id: 'coin1', emoji: '🪙', position: { top: '20%', left: '15%' } },
    { id: 'coin2', emoji: '🪙', position: { top: '60%', left: '75%' } },
    { id: 'gem', emoji: '💎', position: { top: '30%', left: '80%' } },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      {/* Digital city background */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/40 via-purple-900/40 to-black/60 z-0" />
      
      {/* Cyberpunk-inspired grid floor */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[40vh] perspective-1000"
        style={{
          background: `linear-gradient(to top, rgba(138,43,226,0.5), transparent)`,
          backgroundSize: `20px 20px`,
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          transform: 'rotateX(60deg)',
          transformOrigin: 'bottom',
        }}
      />
      
      {/* Floating collectible items */}
      {collectibles.map(item => (
        <AnimatePresence key={item.id}>
          {!collectedItems.includes(item.id) && (
            <motion.div
              className="absolute text-3xl cursor-pointer z-10"
              style={item.position}
              animate={{ 
                y: [0, -10, 0], 
                rotate: [0, 10, 0, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                repeatType: "loop" 
              }}
              onClick={() => collectItem(item.id)}
              exit={{ 
                scale: [1, 1.5, 0],
                y: -50,
                opacity: 0,
                transition: { duration: 0.5 } 
              }}
              whileHover={{ scale: 1.3 }}
            >
              {item.emoji}
            </motion.div>
          )}
        </AnimatePresence>
      ))}
      
      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col md:flex-row items-center">
          {/* Left side content */}
          <motion.div 
            className="w-full md:w-1/2 text-center md:text-left mb-12 md:mb-0"
            initial={{ x: -100, opacity: 0 }}
            animate={{ 
              x: 0, 
              opacity: 1,
              transition: { 
                type: "spring",
                stiffness: 100,
                delay: 0.2 
              } 
            }}
          >
            <motion.div
              className="inline-block px-4 py-1 rounded-full text-sm bg-indigo-900/60 backdrop-blur-sm mb-6 border border-indigo-700/50"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, delay: 0.4 }}
            >
              <span className="text-indigo-300 font-mono flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                LEVEL 1: BEGIN YOUR JOURNEY
              </span>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-6xl font-black mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 via-indigo-500 to-purple-500">
                Code. Create.
              </span>
              <br />
              <span className="text-white">Level Up.</span>
            </motion.h1>
            
            <motion.p 
              className="text-gray-300 text-lg mb-8 max-w-lg mx-auto md:mx-0"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Join our coding community and transform your skills into superpowers. 
              Collect achievements, unlock new abilities, and build your tech future.
            </motion.p>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <motion.button 
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg shadow-lg shadow-indigo-800/50 relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onHoverStart={() => setHoverButton(true)}
                onHoverEnd={() => setHoverButton(false)}
                onClick={onInteraction}
              >
                <span className="relative z-10">START GAME</span>
                
                {/* Button particle effects */}
                <AnimatePresence>
                  {hoverButton && (
                    <>
                      {[...Array(8)].map((_, i) => (
                        <motion.span
                          key={i}
                          className="absolute w-1 h-1 bg-white rounded-full pointer-events-none"
                          initial={{ 
                            x: 0, 
                            y: 0,
                            opacity: 1
                          }}
                          animate={{ 
                            x: (Math.random() - 0.5) * 100, 
                            y: (Math.random() - 0.5) * 100,
                            opacity: 0
                          }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.8 }}
                          style={{
                            top: '50%',
                            left: '50%'
                          }}
                        />
                      ))}
                    </>
                  )}
                </AnimatePresence>
                
                {/* Button gradient border */}
                <motion.span 
                  className="absolute inset-0 rounded-xl"
                  style={{ 
                    background: 'linear-gradient(90deg, #4F46E5, #7E22CE, #4F46E5)',
                    backgroundSize: '200% 100%',
                    opacity: 0.5,
                    filter: 'blur(8px)',
                    transform: 'scale(1.05)',
                    zIndex: 0
                  }}
                  animate={{
                    backgroundPosition: ['0% center', '100% center', '0% center'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "linear"
                  }}
                />
              </motion.button>
            </motion.div>
          </motion.div>
          
          {/* Right side 3D game card */}
          <div className="w-full md:w-1/2 flex justify-center">
            <motion.div 
              className="w-80 h-96 perspective-1000"
              onMouseMove={handleMouseMove}
              onMouseLeave={() => {
                mouseX.set(0);
                mouseY.set(0);
              }}
              style={{ perspective: 1000 }}
            >
              <motion.div
                className="w-full h-full rounded-2xl shadow-2xl relative overflow-hidden"
                style={{
                  rotateX: rotateX,
                  rotateY: rotateY,
                  transformStyle: "preserve-3d"
                }}
              >
                {/* Card content */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
                  {/* Digital circuit lines */}
                  <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-1/3 left-0 right-0 h-[1px] bg-cyan-400"></div>
                    <div className="absolute top-2/3 left-0 right-0 h-[1px] bg-cyan-400"></div>
                    <div className="absolute left-1/3 top-0 bottom-0 w-[1px] bg-cyan-400"></div>
                    <div className="absolute left-2/3 top-0 bottom-0 w-[1px] bg-cyan-400"></div>
                    
                    {/* Animated pulse dots */}
                    {[0, 1, 2].map((row) => (
                      [0, 1, 2].map((col) => (
                        <motion.div
                          key={`${row}-${col}`}
                          className="absolute w-2 h-2 bg-cyan-400 rounded-full"
                          style={{
                            left: `${(col + 1) * 25}%`,
                            top: `${(row + 1) * 25}%`,
                          }}
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.7, 1, 0.7]
                          }}
                          transition={{
                            duration: 2,
                            delay: col * 0.3 + row * 0.7,
                            repeat: Infinity
                          }}
                        />
                      ))
                    ))}
                  </div>
                  
                  {/* Card content */}
                  <div className="absolute inset-0 p-6 flex flex-col">
                    <div className="flex justify-between">
                      <div className="text-xs text-cyan-300 font-mono">P1X3L_DEV</div>
                      <div className="text-xs text-cyan-300 font-mono">LV.1</div>
                    </div>
                    
                    <div className="flex-grow flex items-center justify-center">
                      <motion.div
                        animate={{
                          rotate: [0, 360],
                          scale: [0.8, 1, 0.8]
                        }}
                        transition={{
                          rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                          scale: { duration: 3, repeat: Infinity, repeatType: "reverse" }
                        }}
                      >
                        <div className="w-32 h-32 rounded-full border-4 border-dashed border-indigo-400 flex items-center justify-center">
                          <div className="text-5xl">👩‍💻</div>
                        </div>
                      </motion.div>
                    </div>
                    
                    <div className="mt-auto">
                      <h3 className="text-xl font-bold text-white mb-1">Developer Card</h3>
                      <p className="text-xs text-gray-300 mb-2">Collect skills to level up</p>
                      
                      <div className="w-full bg-gray-800/50 h-2 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                          initial={{ width: "10%" }}
                          animate={{ 
                            width: `${30 + (collectedItems.length * 20)}%`,
                          }}
                          transition={{ type: "spring", stiffness: 100 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Card reflection effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-transparent to-white"
                  style={{ opacity: 0.1 }}
                  animate={{
                    opacity: [0.1, 0.15, 0.1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "mirror"
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white"
        animate={{
          y: [0, 10, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "loop"
        }}
      >
        <p className="text-sm text-gray-400 mb-2">Scroll to continue</p>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </motion.div>
    </section>
  );
};

export default GameHero;