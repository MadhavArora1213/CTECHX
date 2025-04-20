import React from 'react';
import { motion } from 'framer-motion';

const Character = ({ position, level }) => {
  // Character appearance changes based on level
  const characterSprites = [
    "👾", // Hero level
    "🧙", // Features level
    "🦸", // Projects level
    "🤖", // Community level
    "👽", // Events level
    "🎮", // Join level
  ];

  return (
    <motion.div
      className="fixed z-50 pointer-events-none select-none"
      style={{
        left: `${position.x * 100}%`,
        top: `${position.y * 100}%`
      }}
      animate={{
        x: `-50%`,
        y: `-50%`,
        scale: [0.9, 1.1, 0.9],
        rotate: position.x > 0.5 ? 10 : -10
      }}
      transition={{
        x: { type: "spring", stiffness: 500, damping: 50 },
        y: { type: "spring", stiffness: 500, damping: 50 },
        scale: { 
          duration: 2, 
          repeat: Infinity,
          repeatType: "mirror" 
        },
        rotate: { 
          duration: 0.5
        }
      }}
    >
      <div className="text-5xl drop-shadow-[0_0_8px_rgba(138,43,226,0.8)]">
        {characterSprites[level] || characterSprites[0]}
      </div>
      
      {/* Character shadow */}
      <motion.div
        className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-black/30 rounded-full blur-sm"
        animate={{
          width: [24, 32, 24],
          opacity: [0.4, 0.2, 0.4]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "mirror"
        }}
      />
    </motion.div>
  );
};

export default Character;