import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InteractiveButtons from '../components/shared/InteractiveButtons';

const GameNavbar = ({ currentLevel }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Nav sections
  const navSections = [
    { name: 'Home', icon: '🏠', level: 0 },
    { name: 'Features', icon: '⚙️', level: 1 },
    { name: 'Projects', icon: '🛠️', level: 2 },
    { name: 'Community', icon: '👥', level: 3 },
    { name: 'Events', icon: '📅', level: 4 },
    { name: 'Join', icon: '🎮', level: 5 }
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-2 bg-black/80 backdrop-blur-lg' : 'py-4 bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white text-2xl font-bold mr-2">
              G
            </div>
            <div className="text-white font-bold text-xl tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                Game
              </span>
              <span>Dev</span>
            </div>
          </motion.div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            {navSections.map((section, index) => (
              <motion.a
                key={section.name}
                href={`#${section.name.toLowerCase()}`}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all relative ${
                  currentLevel === section.level 
                    ? 'text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center space-x-1">
                  <span>{section.icon}</span>
                  <span>{section.name}</span>
                </div>
                
                {currentLevel === section.level && (
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500"
                    layoutId="navIndicator"
                  />
                )}
              </motion.a>
            ))}
          </div>
          
          {/* Play Button */}
          <InteractiveButtons.PlayButton 
            onClick={() => console.log('Start game!')}
            label="PLAY"
          />
          
          {/* Mobile menu button */}
          <motion.button
            className="md:hidden p-2 rounded-lg bg-indigo-900/50 text-white"
            whileTap={{ scale: 0.95 }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </motion.button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden absolute top-full left-0 right-0 bg-black/90 backdrop-blur-lg border-t border-indigo-900/50"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-2">
              {navSections.map((section) => (
                <motion.a
                  key={section.name}
                  href={`#${section.name.toLowerCase()}`}
                  className={`block py-3 px-4 text-center rounded-lg my-1 ${
                    currentLevel === section.level 
                      ? 'bg-indigo-900/30 text-white' 
                      : 'text-gray-400'
                  }`}
                  onClick={() => setMenuOpen(false)}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-2">
                    <span>{section.icon}</span>
                    <span>{section.name}</span>
                    {currentLevel === section.level && (
                      <span className="text-xs bg-indigo-500 text-white px-1.5 rounded-full">
                        ACTIVE
                      </span>
                    )}
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default GameNavbar;