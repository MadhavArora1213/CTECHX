import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { featureCardVariants } from '../animations/gameVariants';
import InteractiveButtons from '../components/shared/InteractiveButtons';


const GameFeatures = ({ isActive, onUnlock }) => {
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [unlockedFeatures, setUnlockedFeatures] = useState([]);
  
  const features = [
    {
      id: 'feature1',
      title: 'Code Challenges',
      icon: '🧩',
      color: 'from-cyan-500 to-blue-600',
      description: 'Level up your skills with daily coding challenges and quests. Earn XP and unlock achievements.',
      stats: ['50+ Challenges', 'Leaderboards', 'Difficulty Levels']
    },
    {
      id: 'feature2',
      title: 'Project Sandbox',
      icon: '🏗️',
      color: 'from-purple-500 to-indigo-600',
      description: 'Build your dream projects in a collaborative environment. Share, fork, and contribute to the community.',
      stats: ['Cloud Hosting', 'Real-time Collaboration', 'Version Control']
    },
    {
      id: 'feature3',
      title: 'Skill Trees',
      icon: '🌳',
      color: 'from-emerald-500 to-green-600',
      description: 'Customize your learning path with interactive skill trees. Track progress and showcase your expertise.',
      stats: ['15+ Skill Paths', 'Visual Progress', 'Certifications']
    },
    {
      id: 'feature4',
      title: 'Tech Arena',
      icon: '⚔️',
      color: 'from-amber-500 to-orange-600',
      description: 'Compete in coding tournaments and hackathons. Win prizes and earn recognition among peers.',
      stats: ['Monthly Tournaments', 'Team Battles', 'Valuable Prizes']
    }
  ];
  
  const unlockFeature = (feature) => {
    if (!unlockedFeatures.includes(feature.id)) {
      setUnlockedFeatures([...unlockedFeatures, feature.id]);
      onUnlock(feature.title);
      
      // Show confetti animation here
    }
  };

  return (
    <section id="features" className="py-24 min-h-screen relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-indigo-900/30 via-purple-900/20 to-black/20"></div>
      <div className="absolute inset-0 z-0 bg-[url('/grid-pattern.svg')] bg-[length:50px_50px] opacity-10"></div>
      
      {/* Background circuit lines */}
      {[1, 2, 3].map((i) => (
        <motion.div 
          key={`circuit-${i}`}
          className="absolute bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent h-px"
          style={{
            top: `${25 * i}%`,
            left: 0,
            right: 0,
          }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scaleX: [0.8, 1, 0.8]
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      ))}
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-3 py-1 text-sm font-mono font-semibold bg-indigo-900/50 text-indigo-300 rounded-full mb-4 backdrop-blur-sm border border-indigo-800/50">
            <span className="mr-2 inline-block w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></span>
            LEVEL 2: DISCOVER ABILITIES
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-cyan-400 to-indigo-500">
              Unlock Special Powers
            </span>
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Each feature is a new ability waiting to be unlocked. Choose your path and customize your coding adventure.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const isUnlocked = unlockedFeatures.includes(feature.id);
            
            return (
              <motion.div
                key={feature.id}
                className={`bg-gray-900/60 backdrop-blur-sm rounded-xl overflow-hidden border ${
                  isUnlocked ? 'border-indigo-500' : 'border-gray-800'
                } hover:border-indigo-500/70 transition-all relative group`}
                variants={featureCardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                custom={index}
                whileHover="hover"
                onClick={() => setSelectedFeature(feature)}
              >
                {/* Card glow effect */}
                {isUnlocked && (
                  <motion.div 
                    className="absolute inset-0 -z-10 opacity-20 blur-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    transition={{ duration: 1 }}
                    style={{ 
                      background: `radial-gradient(circle, rgba(99, 102, 241, 0.8) 0%, rgba(99, 102, 241, 0) 70%)`
                    }}
                  />
                )}
                
                {/* Lock overlay for non-unlocked features */}
                {!isUnlocked && (
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-20 group-hover:opacity-0 transition-opacity">
                    <div className="text-4xl">🔒</div>
                  </div>
                )}
                
                {/* Feature header */}
                <div className={`h-24 bg-gradient-to-r ${feature.color} flex items-center justify-center p-6 relative overflow-hidden`}>
                  <div className="text-4xl mb-2">{feature.icon}</div>
                  
                  {/* Circuit pattern overlay */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 right-0 h-px bg-white/30"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-white/30"></div>
                    <div className="absolute left-1/3 top-0 bottom-0 w-px bg-white/30"></div>
                    <div className="absolute left-2/3 top-0 bottom-0 w-px bg-white/30"></div>
                  </div>
                </div>
                
                {/* Feature content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{feature.description}</p>
                  
                  {/* Feature stats */}
                  <div className="space-y-1 mb-4">
                    {feature.stats.map((stat, i) => (
                      <div 
                        key={i} 
                        className="flex items-center text-xs text-gray-300"
                      >
                        <span className="mr-2 inline-block w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                        {stat}
                      </div>
                    ))}
                  </div>
                  
                  {/* Feature action button */}
                  <div className="mt-auto">
                    {isUnlocked ? (
                      <InteractiveButtons.BasicButton 
                        label="Activated" 
                        iconBefore="✓" 
                        color="indigo" 
                        fullWidth
                      />
                    ) : (
                      <InteractiveButtons.PixelButton 
                        label="Unlock" 
                        onClick={(e) => {
                          e.stopPropagation();
                          unlockFeature(feature);
                        }} 
                        fullWidth
                      />
                    )}
                  </div>
                </div>
                
                {/* Status indicator */}
                <div className="absolute top-2 right-2 z-30">
                  {isUnlocked ? (
                    <motion.div 
                      className="px-2 py-0.5 bg-green-900/80 text-green-400 rounded-full text-xs font-mono"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring" }}
                    >
                      UNLOCKED
                    </motion.div>
                  ) : (
                    <div className="px-2 py-0.5 bg-gray-900/80 text-gray-400 rounded-full text-xs font-mono">
                      LOCKED
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      
      {/* Feature detail modal */}
      <AnimatePresence>
        {selectedFeature && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedFeature(null)}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
            <motion.div
              className="bg-gray-900 rounded-2xl p-6 max-w-lg w-full border border-indigo-500/30 relative z-10"
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${selectedFeature.color} flex items-center justify-center text-xl mr-3`}>
                    {selectedFeature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">{selectedFeature.title}</h3>
                </div>
                <button 
                  className="text-gray-400 hover:text-white"
                  onClick={() => setSelectedFeature(null)}
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4 mb-6">
                <p className="text-gray-300">{selectedFeature.description}</p>
                
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-indigo-400 mb-2 uppercase">Feature Stats</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {selectedFeature.stats.map((stat, i) => (
                      <div key={i} className="bg-gray-800 rounded-lg p-3 text-center">
                        <div className="text-sm text-gray-300">{stat}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {unlockedFeatures.includes(selectedFeature.id) ? (
                  <div className="bg-green-900/20 border border-green-800/30 rounded-lg p-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-900/50 rounded-full flex items-center justify-center mr-3">
                        <span className="text-green-300">✓</span>
                      </div>
                      <div>
                        <h4 className="text-green-300 font-medium">Feature Unlocked</h4>
                        <p className="text-green-400/70 text-sm">You have access to all capabilities</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center mr-3">
                        <span className="text-gray-400">🔒</span>
                      </div>
                      <div>
                        <h4 className="text-gray-300 font-medium">Feature Locked</h4>
                        <p className="text-gray-400 text-sm">Unlock to access capabilities</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end space-x-3">
                <InteractiveButtons.OutlineButton 
                  label="Close" 
                  onClick={() => setSelectedFeature(null)}
                />
                
                {!unlockedFeatures.includes(selectedFeature.id) && (
                  <InteractiveButtons.GlowButton 
                    label="Unlock Now" 
                    onClick={() => unlockFeature(selectedFeature)}
                    color="indigo"
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GameFeatures;