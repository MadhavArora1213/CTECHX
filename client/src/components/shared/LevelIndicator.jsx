import React from 'react';
import { motion } from 'framer-motion';

const LevelIndicator = ({ level, maxLevel }) => {
  return (
    <div className="relative bg-gray-900/70 backdrop-blur-sm rounded-full px-3 py-1 border border-indigo-500/30">
      <div className="flex items-center space-x-1">
        <div className="text-xs font-bold text-indigo-300">LEVEL</div>
        <motion.div 
          className="text-md font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500"
          key={level}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {level + 1}
        </motion.div>
        <div className="text-xs text-gray-400">/ {maxLevel + 1}</div>
      </div>
      
      {/* Level progress bar */}
      <div className="w-full h-1 bg-gray-800 rounded-full mt-1 overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500"
          initial={{ width: `${(level / maxLevel) * 100}%` }}
          animate={{ width: `${((level + 1) / (maxLevel + 1)) * 100}%` }}
          transition={{ type: "spring", stiffness: 100 }}
        />
      </div>
    </div>
  );
};

export default LevelIndicator;