import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateGamerTag, techSkills } from '../components/shared/GameAssets';

const GameJoin = ({ isActive, onSignup }) => {
  const [formStep, setFormStep] = useState(0);
  const [avatar, setAvatar] = useState(0);
  const [username, setUsername] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [characterClass, setCharacterClass] = useState('');
  const maxSkills = 3;
  
  // Auto-generate username on mount
  useEffect(() => {
    setUsername(generateGamerTag());
  }, []);
  
  const avatarImages = [
    "https://cdn-icons-png.flaticon.com/512/4333/4333609.png",
    "https://cdn-icons-png.flaticon.com/512/4333/4333649.png",
    "https://cdn-icons-png.flaticon.com/512/4140/4140048.png", 
    "https://cdn-icons-png.flaticon.com/512/4140/4140047.png",
    "https://cdn-icons-png.flaticon.com/512/2922/2922688.png",
    "https://cdn-icons-png.flaticon.com/512/4322/4322992.png"
  ];
  
  const characterClasses = [
    { id: 'developer', name: 'Full-Stack Developer', icon: '⚔️', bonus: '+10% coding speed', color: 'from-blue-600 to-indigo-700' },
    { id: 'designer', name: 'UI/UX Mage', icon: '🎨', bonus: '+15% creativity', color: 'from-pink-600 to-rose-700' },
    { id: 'datascientist', name: 'Data Oracle', icon: '📊', bonus: '+20% analytics', color: 'from-green-600 to-emerald-700' },
    { id: 'devops', name: 'DevOps Engineer', icon: '🛠️', bonus: '+25% deployment', color: 'from-orange-600 to-amber-700' }
  ];

  const handleSkillToggle = (skillId) => {
    if (selectedSkills.includes(skillId)) {
      setSelectedSkills(selectedSkills.filter(id => id !== skillId));
    } else if (selectedSkills.length < maxSkills) {
      setSelectedSkills([...selectedSkills, skillId]);
    }
  };
  
  const handleNextStep = () => {
    if (formStep < 3) {
      setFormStep(formStep + 1);
    } else {
      handleSubmit();
    }
  };
  
  const handlePrevStep = () => {
    if (formStep > 0) {
      setFormStep(formStep - 1);
    }
  };
  
  const handleSubmit = () => {
    setSubmitted(true);
    onSignup();
    
    // Trigger confetti effect 
    const confettiEffect = () => {
      // This would usually use a confetti library like canvas-confetti
      // For this example, we'll create a simple visual effect
      const container = document.createElement('div');
      container.style.position = 'fixed';
      container.style.inset = '0';
      container.style.pointerEvents = 'none';
      container.style.zIndex = '100';
      document.body.appendChild(container);
      
      for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.width = `${Math.random() * 10 + 5}px`;
        confetti.style.height = `${Math.random() * 10 + 5}px`;
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confetti.style.borderRadius = '50%';
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.top = '-20px';
        container.appendChild(confetti);
        
        // Animate falling confetti
        const duration = Math.random() * 3 + 2;
        confetti.animate(
          [
            { transform: 'translateY(0) rotate(0)', opacity: 1 },
            { transform: `translateY(${window.innerHeight}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
          ],
          {
            duration: duration * 1000,
            easing: 'cubic-bezier(.2,.8,.8,1)'
          }
        );
        
        setTimeout(() => {
          confetti.remove();
        }, duration * 1000);
      }
      
      setTimeout(() => {
        container.remove();
      }, 5000);
    };
    
    confettiEffect();
  };

  return (
    <section className="min-h-screen py-20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-indigo-900/20 to-violet-900/20 z-0" />
      <div 
        className="absolute inset-0 opacity-20 z-0"
        style={{
          backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')",
        }}
      />
      
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-md"
            style={{
              width: Math.random() * 6 + 2,
              height: Math.random() * 6 + 2,
              background: `rgba(${Math.random() * 100 + 100}, ${Math.random() * 100 + 100}, 255, 0.7)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              opacity: [0.5, 1, 0.5],
              rotate: [0, 360, 0],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Section content */}
      <div className="container mx-auto px-4 z-10 relative">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-block px-4 py-1 rounded-full text-sm bg-indigo-900/60 backdrop-blur-sm mb-6 border border-indigo-700/50"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="text-indigo-300 font-mono flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              LEVEL 6: CHARACTER CREATION
            </span>
          </motion.div>
          
          <motion.h2
            className="text-4xl md:text-5xl font-black mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-400 via-indigo-400 to-violet-500">
              Join the Developer League
            </span>
          </motion.h2>
          
          <motion.p
            className="text-gray-300 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            Create your coding avatar, select your tech stack, and begin your journey with our community of developers.
          </motion.p>
        </motion.div>

        {/* Character creation card */}
        <div className="flex justify-center">
          <motion.div
            className="w-full max-w-2xl rounded-2xl backdrop-blur-md bg-gradient-to-br from-indigo-900/50 to-violet-900/50 border border-indigo-500/30 overflow-hidden shadow-xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
            viewport={{ once: true }}
          >
            {/* Form header with progress */}
            <div className="px-6 py-4 border-b border-indigo-500/20">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">Character Creation</h3>
                <div className="flex items-center space-x-1">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className={`w-8 h-1 rounded-full ${
                        i <= formStep ? 'bg-indigo-500' : 'bg-gray-600'
                      }`}
                      animate={i === formStep ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 0.5, repeat: i === formStep ? Infinity : 0, repeatType: "reverse" }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Form content */}
            <div className="px-8 py-6">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.div
                    key={`step-${formStep}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {formStep === 0 && (
                      <>
                        <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                          <img 
                            src="https://cdn-icons-png.flaticon.com/512/1674/1674291.png"
                            alt="Choose Avatar"
                            className="w-5 h-5 mr-2"
                          /> 
                          Choose Your Avatar
                        </h4>
                        <div className="grid grid-cols-3 gap-4 mb-6">
                          {avatarImages.map((src, i) => (
                            <motion.div
                              key={i}
                              className={`relative p-2 rounded-lg cursor-pointer ${
                                avatar === i ? 'bg-indigo-600/30 ring-2 ring-indigo-500' : 'bg-gray-800/30 hover:bg-indigo-900/20'
                              }`}
                              onClick={() => setAvatar(i)}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <img src={src} alt={`Avatar ${i+1}`} className="w-full h-auto" />
                              {avatar === i && (
                                <motion.div 
                                  className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ type: "spring", stiffness: 300 }}
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                </motion.div>
                              )}
                            </motion.div>
                          ))}
                        </div>
                      </>
                    )}

                    {formStep === 1 && (
                      <>
                        <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                          <img 
                            src="https://cdn-icons-png.flaticon.com/512/1791/1791355.png"
                            alt="Username"
                            className="w-5 h-5 mr-2"
                          /> 
                          Choose Your Gamer Tag
                        </h4>
                        <div className="mb-6">
                          <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-3 bg-gray-900/50 border border-indigo-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter username"
                          />
                          <div className="mt-2 flex justify-between">
                            <span className="text-xs text-gray-400">Make it memorable!</span>
                            <motion.button
                              className="text-xs text-indigo-400 hover:text-indigo-300"
                              onClick={() => setUsername(generateGamerTag())}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Generate Random
                            </motion.button>
                          </div>
                        </div>

                        <div className="p-4 rounded-lg bg-gray-800/50 border border-gray-700 mb-4">
                          <div className="flex items-center">
                            <img 
                              src={avatarImages[avatar]} 
                              alt="Selected Avatar" 
                              className="w-16 h-16 mr-3"
                            />
                            <div>
                              <h5 className="text-lg font-bold text-white">{username}</h5>
                              <p className="text-xs text-gray-400">Level 1 Coder</p>
                              <div className="mt-1 w-full bg-gray-700 h-1.5 rounded-full">
                                <div className="h-full bg-indigo-500 rounded-full w-[5%]"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {formStep === 2 && (
                      <>
                        <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                          <img 
                            src="https://cdn-icons-png.flaticon.com/512/2689/2689419.png"
                            alt="Class"
                            className="w-5 h-5 mr-2"
                          /> 
                          Select Your Class
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                          {characterClasses.map((cls) => (
                            <motion.div
                              key={cls.id}
                              className={`relative p-4 rounded-lg cursor-pointer ${
                                characterClass === cls.id 
                                ? 'bg-indigo-600/30 ring-2 ring-indigo-500' 
                                : 'bg-gray-800/30 hover:bg-indigo-900/20'
                              }`}
                              onClick={() => setCharacterClass(cls.id)}
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div className="flex items-center">
                                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${cls.color} flex items-center justify-center text-xl`}>
                                  {cls.icon}
                                </div>
                                <div className="ml-3">
                                  <h5 className="text-white font-medium">{cls.name}</h5>
                                  <p className="text-xs text-indigo-300">{cls.bonus}</p>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </>
                    )}

                    {formStep === 3 && (
                      <>
                        <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                          <img 
                            src="https://cdn-icons-png.flaticon.com/512/3406/3406886.png"
                            alt="Skills"
                            className="w-5 h-5 mr-2"
                          /> 
                          Select Your Skills ({selectedSkills.length}/{maxSkills})
                        </h4>
                        <div className="grid grid-cols-3 gap-3 mb-6">
                          {techSkills.map((skill) => (
                            <motion.div
                              key={skill.id}
                              className={`relative p-3 rounded-lg cursor-pointer flex flex-col items-center ${
                                selectedSkills.includes(skill.id) 
                                ? 'bg-indigo-600/30 ring-2 ring-indigo-500' 
                                : (selectedSkills.length >= maxSkills 
                                  ? 'bg-gray-800/30 opacity-50 cursor-not-allowed' 
                                  : 'bg-gray-800/30 hover:bg-indigo-900/20')
                              }`}
                              onClick={() => handleSkillToggle(skill.id)}
                              whileHover={{ 
                                scale: selectedSkills.length >= maxSkills && !selectedSkills.includes(skill.id) ? 1 : 1.05 
                              }}
                              whileTap={{ 
                                scale: selectedSkills.length >= maxSkills && !selectedSkills.includes(skill.id) ? 1 : 0.98 
                              }}
                            >
                              <span className="text-2xl mb-1">{skill.icon}</span>
                              <div className="text-sm font-medium text-white">{skill.name}</div>
                              <div className="text-xs" style={{ color: skill.color }}>+{skill.points}pts</div>
                            </motion.div>
                          ))}
                        </div>
                      </>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="py-4 flex flex-col items-center"
                  >
                    <motion.img 
                      src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
                      alt="Success"
                      className="w-24 h-24 mb-6"
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{ duration: 1 }}
                    />
                    
                    <h3 className="text-2xl font-bold text-green-400 mb-2">Character Created!</h3>
                    <p className="text-gray-300 mb-8 text-center">Welcome to the community, {username}. Your journey begins now!</p>
                    
                    <div className="p-6 bg-indigo-900/30 rounded-lg border border-indigo-500/30 w-full">
                      <div className="flex items-start mb-4">
                        <img 
                          src={avatarImages[avatar]} 
                          alt="Selected Avatar" 
                          className="w-16 h-16 mr-4"
                        />
                        <div>
                          <h4 className="text-white font-bold text-lg">{username}</h4>
                          <p className="text-sm text-indigo-300">
                            Level 1 {characterClasses.find(c => c.id === characterClass)?.name || 'Developer'}
                          </p>
                          <div className="mt-1 flex">
                            {selectedSkills.map(skillId => {
                              const skill = techSkills.find(s => s.id === skillId);
                              return skill ? (
                                <div 
                                  key={skill.id} 
                                  className="mr-1 text-lg"
                                  title={skill.name}
                                >
                                  {skill.icon}
                                </div>
                              ) : null;
                            })}
                          </div>
                        </div>
                      </div>
                      
                      <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                          initial={{ width: "0%" }}
                          animate={{ width: "5%" }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                      <div className="mt-1 flex justify-between text-xs">
                        <span className="text-gray-400">XP: 0/100</span>
                        <span className="text-indigo-300">Beginner Rank</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Form navigation */}
            {!submitted && (
              <div className="px-6 py-4 border-t border-indigo-500/20 flex justify-between">
                <motion.button
                  className={`px-4 py-2 rounded-lg ${
                    formStep === 0 
                    ? 'bg-gray-700/50 text-gray-400 cursor-not-allowed' 
                    : 'bg-gray-700 hover:bg-gray-600 text-white'
                  }`}
                  onClick={handlePrevStep}
                  disabled={formStep === 0}
                  whileHover={{ scale: formStep === 0 ? 1 : 1.05 }}
                  whileTap={{ scale: formStep === 0 ? 1 : 0.95 }}
                >
                  Back
                </motion.button>
                <motion.button
                  className={`px-6 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white ${
                    (formStep === 3 && selectedSkills.length === 0) || 
                    (formStep === 2 && !characterClass) ||
                    (formStep === 1 && !username.trim()) 
                    ? 'opacity-70 cursor-not-allowed' 
                    : ''
                  }`}
                  onClick={handleNextStep}
                  disabled={(formStep === 3 && selectedSkills.length === 0) || 
                           (formStep === 2 && !characterClass) ||
                           (formStep === 1 && !username.trim())}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {formStep === 3 ? 'Create Character' : 'Next'}
                </motion.button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GameJoin;