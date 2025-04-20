import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PointsCounter = ({ points }) => {
  return (
    <motion.div
      className="bg-gray-900/70 backdrop-blur-sm rounded-full px-3 py-1 border border-indigo-500/30 flex items-center space-x-2"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, delay: 0.5 }}
    >
      <div className="w-5 h-5 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-xs font-black text-white">✦</div>
      
      <AnimatePresence mode="popLayout">
        <motion.div
          key={points}
          className="text-md font-bold text-yellow-400"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10, position: 'absolute' }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {points}
        </motion.div>
      </AnimatePresence>
      
      <div className="text-xs text-gray-400">PTS</div>
    </motion.div>
  );
};

export default PointsCounter;