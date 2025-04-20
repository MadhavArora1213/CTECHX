import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BookLayout = ({ children, currentPage, totalPages }) => {
  const [pageDirection, setPageDirection] = useState('forward');

  // Variants for page transitions
  const pageVariants = {
    enter: (direction) => ({
      x: direction === 'forward' ? 500 : -500,
      opacity: 0,
      rotateY: direction === 'forward' ? -20 : 20,
    }),
    center: {
      x: 0,
      opacity: 1,
      rotateY: 0,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    },
    exit: (direction) => ({
      x: direction === 'forward' ? -500 : 500,
      opacity: 0,
      rotateY: direction === 'forward' ? 20 : -20,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    })
  };

  return (
    <div className="book-layout relative">
      {/* Book binding and shadow effects */}
      <div className="absolute left-0 top-10 bottom-10 w-8 bg-gradient-to-r from-gray-900 to-gray-800 rounded-l-lg shadow-inner z-10"></div>
      
      {/* Book pages container */}
      <div className="relative bg-gray-800 rounded-lg overflow-hidden shadow-2xl border border-gray-700 min-h-[600px] perspective-1000">
        <div className="book-page-container">
          <AnimatePresence initial={false} custom={pageDirection} mode="wait">
            <motion.div
              key={currentPage}
              custom={pageDirection}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute top-0 left-0 w-full h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Page number indicator */}
        <div className="absolute bottom-4 right-4 text-gray-400 text-sm">
          Page {currentPage} of {totalPages}
        </div>
      </div>
    </div>
  );
};

export default BookLayout;
