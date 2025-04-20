import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import GameNavbar from './GameNavbar';
import GameHero from './GameHero';
import GameFeatures from './GameFeatures';
import GameProjects from './GameProjects';
import GameCommunity from './GameCommunity';
import GameEvents from './GameEvents';
import GameJoin from './GameJoin';
import GameFooter from './GameFooter';
import Character from '../components/shared/Character';
import LevelIndicator from '../components/shared/LevelIndicator';
import PointsCounter from '../components/shared/PointsCounter';
import useGameProgress from '../hooks/useGameProgress';

const GameLandingPage = () => {
  const [loading, setLoading] = useState(true);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [points, setPoints] = useState(0);
  const [characterPosition, setCharacterPosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const { gameProgress, earnPoints, unlockAchievement } = useGameProgress();
  const pageRef = useRef(null);
  
  // Game levels correspond to sections
  const levels = ['hero', 'features', 'projects', 'community', 'events', 'join'];
  
  // Transform scroll into game progress
  const levelProgress = useTransform(
    scrollYProgress, 
    [0, 0.2, 0.4, 0.6, 0.8, 1], 
    [0, 1, 2, 3, 4, 5]
  );

  // Handle character movement based on mouse/touch
  useEffect(() => {
    const handleMouseMove = (e) => {
      const bounds = pageRef.current.getBoundingClientRect();
      const x = (e.clientX - bounds.left) / bounds.width;
      const y = (e.clientY - bounds.top) / bounds.height;
      
      setCharacterPosition({ 
        x: Math.max(0, Math.min(0.95, x)),
        y: Math.max(0, Math.min(0.95, y)) 
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Update level based on scroll position
  useEffect(() => {
    const unsubscribe = levelProgress.onChange((latest) => {
      const newLevel = Math.floor(latest);
      if (newLevel !== currentLevel && newLevel >= 0 && newLevel < levels.length) {
        setCurrentLevel(newLevel);
        // Award points for reaching new section
        if (newLevel > currentLevel) {
          const pointsEarned = 100;
          setPoints(prev => prev + pointsEarned);
          earnPoints(pointsEarned, `Reached ${levels[newLevel]} section`);
        }
      }
    });
    
    return () => unsubscribe();
  }, [currentLevel, levelProgress, earnPoints, levels]);

  // Initial game loading sequence
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div 
      ref={pageRef}
      className="relative min-h-screen w-full overflow-hidden bg-black"
    >
      {/* Game grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      {/* Game loading sequence */}
      <AnimatePresence>
        {loading ? (
          <motion.div 
            key="loading"
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white"
            exit={{ 
              opacity: 0,
              scale: 1.5,
              filter: "blur(20px)",
              transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
            }}
          >
            <motion.div 
              className="relative w-40 h-40 mb-8"
              animate={{ 
                rotate: 360,
                borderRadius: ["20%", "50%", "20%"]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "linear" 
              }}
            >
              {/* Pixelated game logo */}
              <div className="absolute inset-0 grid grid-cols-5 grid-rows-5">
                {Array.from({ length: 25 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="bg-gradient-to-br from-purple-500 to-indigo-600"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.05,
                      repeat: Infinity
                    }}
                  />
                ))}
              </div>
            </motion.div>
            
            <motion.h2
              className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 mb-2"
              animate={{
                backgroundPosition: ["0% center", "100% center"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "mirror"
              }}
              style={{
                backgroundSize: "200% 200%",
              }}
            >
              LOADING EXPERIENCE
            </motion.h2>
            
            <div className="w-64 h-4 bg-gray-800 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 3, ease: "easeInOut" }}
                style={{ originX: 0 }}
              />
            </div>
            
            <motion.p 
              className="mt-4 text-sm font-mono text-gray-400"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Press any key to skip...
            </motion.p>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Game character that follows cursor */}
      <Character position={characterPosition} level={currentLevel} />
      
      {/* Game UI overlay */}
      <div className="fixed top-4 right-4 z-40 flex items-center space-x-4">
        <LevelIndicator level={currentLevel} maxLevel={levels.length-1} />
        <PointsCounter points={points} />
      </div>
      
      {/* Game sections */}
      <GameNavbar currentLevel={currentLevel} />
      
      <div className="game-sections relative z-10">
        <GameHero 
          isActive={currentLevel === 0} 
          onInteraction={() => earnPoints(20, 'Hero interaction')}
        />
        <GameFeatures 
          isActive={currentLevel === 1} 
          onUnlock={(feature) => unlockAchievement(`Unlocked ${feature}`)}
        />
        <GameProjects 
          isActive={currentLevel === 2}
          onCollect={() => setPoints(prev => prev + 50)}
        />
        <GameCommunity 
          isActive={currentLevel === 3} 
          onConnect={() => earnPoints(30, 'Community connection')}
        />
        <GameEvents 
          isActive={currentLevel === 4}
          onRegister={() => unlockAchievement('Event registration')}
        />
        <GameJoin 
          isActive={currentLevel === 5}
          onSignup={() => earnPoints(200, 'Joined community')}
        />
      </div>
      
      <GameFooter />
      
      {/* Achievement notifications */}
      <div className="fixed bottom-4 left-4 z-50">
        <AnimatePresence>
          {gameProgress.achievements.slice(-1).map((achievement, index) => (
            <motion.div
              key={achievement.id}
              className="bg-gradient-to-r from-indigo-900/80 to-purple-900/80 backdrop-blur-lg text-white px-4 py-2 rounded-lg border border-indigo-500/50 mb-2 flex items-center"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center mr-2">🏆</div>
              <div>
                <div className="text-xs text-indigo-300">Achievement Unlocked!</div>
                <div className="font-bold">{achievement.title}</div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default GameLandingPage;