import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GameEvents = ({ isActive, onRegister }) => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [expandedEvent, setExpandedEvent] = useState(null);
  const [registeredEvents, setRegisteredEvents] = useState([]);

  const handleRegister = (eventId) => {
    if (!registeredEvents.includes(eventId)) {
      setRegisteredEvents([...registeredEvents, eventId]);
      onRegister();
    }
  };

  const events = {
    upcoming: [
      {
        id: 'hackathon23',
        title: 'Neural Network Nexus',
        image: 'https://cdn-icons-png.flaticon.com/512/6614/6614677.png',
        date: 'June 15-17, 2025',
        time: '48-Hour Event',
        location: 'Virtual + HQ Arena',
        description: 'Forge AI-powered applications in this prestigious tournament. Top teams win mentorship with industry legends and seed funding.',
        reward: '10,000 XP + Legendary AI Wizard Badge',
        category: 'Competition',
        difficulty: 'Hard',
        teamSize: '2-5 players',
        color: 'from-violet-600 to-indigo-900'
      },
      {
        id: 'workshop01',
        title: 'Web3 Weapons Workshop',
        image: 'https://cdn-icons-png.flaticon.com/512/7017/7017460.png',
        date: 'May 5, 2025',
        time: '14:00 - 16:30',
        location: 'Virtual Event',
        description: 'Master blockchain weaponry and mint your first NFT battle item. Learn smart contract basics from crypto veterans.',
        reward: '500 XP + Junior Blockchain Smith Badge',
        category: 'Workshop',
        difficulty: 'Medium',
        teamSize: 'Solo',
        color: 'from-amber-600 to-orange-900'
      },
      {
        id: 'meetup03',
        title: 'Dev Tavern Gathering',
        image: 'https://cdn-icons-png.flaticon.com/512/3500/3500833.png',
        date: 'April 28, 2025',
        time: '19:00 - 21:30',
        location: 'TechHub Downtown',
        description: 'Share war stories, trade techniques, and forge alliances with fellow code warriors. Networking event with free pizza!',
        reward: '200 XP + Social Networker Badge',
        category: 'Meetup',
        difficulty: 'Easy',
        teamSize: 'Any',
        color: 'from-emerald-600 to-green-900'
      }
    ],
    past: [
      {
        id: 'hackathon22',
        title: 'Quantum Code Quest',
        image: 'https://cdn-icons-png.flaticon.com/512/9386/9386863.png',
        date: 'March 10-12, 2025',
        time: '48-Hour Event',
        location: 'Tech Campus North',
        description: 'Our last quantum computing challenge saw 32 teams build next-gen algorithms. Epic battles of computational wit!',
        reward: '8,000 XP + Quantum Conjurer Badge',
        category: 'Competition',
        difficulty: 'Hard',
        teamSize: '2-4 players',
        color: 'from-cyan-600 to-blue-900'
      },
      {
        id: 'workshop00',
        title: 'Mobile Mage Training',
        image: 'https://cdn-icons-png.flaticon.com/512/2703/2703912.png',
        date: 'February 18, 2025',
        time: '15:00 - 17:00',
        location: 'Virtual Event',
        description: 'Introduction to React Native spell-casting. Attendees crafted their first cross-platform mobile enchantments.',
        reward: '400 XP + App Artificer Badge',
        category: 'Workshop',
        difficulty: 'Medium',
        teamSize: 'Solo',
        color: 'from-rose-600 to-red-900'
      }
    ]
  };

  return (
    <section className="min-h-screen py-20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-violet-900/20 to-gray-900/50 z-0" />
      <div 
        className="absolute inset-0 opacity-20 z-0"
        style={{
          backgroundImage: "url('https://www.transparenttextures.com/patterns/diagmonds.png')",
        }}
      />
      
      {/* Animated event banners in background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-full h-32 opacity-30"
          style={{
            background: "url('https://img.freepik.com/free-vector/seamless-technology-icons_1284-2400.jpg')",
            backgroundSize: "contain",
            top: "10%",
            left: 0,
          }}
          animate={{
            x: [-1000, 2000],
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute w-full h-32 opacity-30"
          style={{
            background: "url('https://img.freepik.com/free-vector/programming-code-icon-made-with-binary-code-coding-hacker-matrix-background-with-digits-1-0_127544-1141.jpg')",
            backgroundSize: "contain",
            top: "60%",
            left: 0,
          }}
          animate={{
            x: [2000, -1000],
          }}
          transition={{
            duration: 50,
            repeat: Infinity,
            ease: "linear",
          }}
        />
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
            className="inline-block px-4 py-1 rounded-full text-sm bg-violet-900/60 backdrop-blur-sm mb-6 border border-violet-700/50"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="text-violet-300 font-mono flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              LEVEL 5: EVENT ARENA
            </span>
          </motion.div>
          
          <motion.h2
            className="text-4xl md:text-5xl font-black mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-violet-400 via-purple-400 to-fuchsia-500">
              Join Epic Coding Tournaments
            </span>
          </motion.h2>
          
          <motion.p
            className="text-gray-300 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            Compete in hackathons, level up at workshops, and forge alliances at tech meetups. Earn unique badges and claim your spot on the leaderboard.
          </motion.p>
        </motion.div>

        {/* Event tabs */}
        <div className="flex justify-center mb-8">
          <motion.div 
            className="inline-flex bg-gray-900/50 backdrop-blur-sm rounded-full p-1 border border-gray-700"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            {['upcoming', 'past'].map(tab => (
              <motion.button
                key={tab}
                className={`px-5 py-2 text-sm font-medium rounded-full ${
                  activeTab === tab 
                    ? 'bg-violet-600 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setActiveTab(tab)}
                whileHover={activeTab !== tab ? { backgroundColor: 'rgba(139, 92, 246, 0.15)' } : {}}
                whileTap={{ scale: 0.97 }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)} Events
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Events grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <AnimatePresence mode="wait">
            {events[activeTab].map((event, index) => (
              <motion.div
                key={event.id}
                className={`relative rounded-xl overflow-hidden backdrop-blur-sm border ${
                  registeredEvents.includes(event.id) 
                  ? 'border-green-500' 
                  : 'border-gray-700/50'
                } transition-all duration-300 cursor-pointer group`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                whileHover={{ scale: expandedEvent === event.id ? 1 : 1.02 }}
                onClick={() => setExpandedEvent(expandedEvent === event.id ? null : event.id)}
              >
                {/* Event background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${event.color} opacity-70`} />
                
                {/* Event header */}
                <div className="p-6 relative z-10">
                  <div className="flex items-start">
                    <motion.img 
                      src={event.image} 
                      alt={event.title}
                      className="w-16 h-16 object-contain mr-4 drop-shadow-lg"
                      whileHover={{ rotate: 10 }}
                    />
                    <div>
                      <h3 className="text-white text-xl font-bold leading-tight">{event.title}</h3>
                      <div className="flex items-center text-xs mt-1">
                        <span className="bg-black/30 rounded-full px-2 py-0.5 text-white mr-2">
                          {event.category}
                        </span>
                        <span className="text-gray-300 flex items-center">
                          <img 
                            src="https://cdn-icons-png.flaticon.com/512/2402/2402479.png" 
                            alt="Calendar" 
                            className="w-3 h-3 inline mr-1 opacity-70"
                          />
                          {event.date}
                        </span>
                      </div>
                    </div>
                    
                    <div className="ml-auto">
                      <div className={`px-2 py-1 rounded-full text-xs ${
                        event.difficulty === 'Easy' ? 'bg-green-900/50 text-green-300' :
                        event.difficulty === 'Medium' ? 'bg-amber-900/50 text-amber-300' :
                        'bg-red-900/50 text-red-300'
                      }`}>
                        {event.difficulty}
                      </div>
                    </div>
                  </div>
                  
                  <motion.div
                    className="mt-4"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ 
                      height: expandedEvent === event.id ? 'auto' : 0,
                      opacity: expandedEvent === event.id ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-gray-200 mb-4">{event.description}</p>
                    
                    <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                      <div className="flex items-center text-gray-300">
                        <img 
                          src="https://cdn-icons-png.flaticon.com/512/151/151917.png" 
                          alt="Location" 
                          className="w-4 h-4 mr-2 opacity-70"
                        />
                        {event.location}
                      </div>
                      <div className="flex items-center text-gray-300">
                        <img 
                          src="https://cdn-icons-png.flaticon.com/512/2088/2088617.png" 
                          alt="Time" 
                          className="w-4 h-4 mr-2 opacity-70"
                        />
                        {event.time}
                      </div>
                      <div className="flex items-center text-gray-300">
                        <img 
                          src="https://cdn-icons-png.flaticon.com/512/615/615075.png" 
                          alt="Team" 
                          className="w-4 h-4 mr-2 opacity-70"
                        />
                        {event.teamSize}
                      </div>
                      <div className="flex items-center text-yellow-300">
                        <img 
                          src="https://cdn-icons-png.flaticon.com/512/3176/3176366.png" 
                          alt="Reward" 
                          className="w-4 h-4 mr-2 opacity-70"
                        />
                        {event.reward.split('+')[0].trim()}
                      </div>
                    </div>
                    
                    {activeTab === 'upcoming' && (
                      <motion.button 
                        className={`px-4 py-2 rounded-lg text-sm font-bold w-full ${
                          registeredEvents.includes(event.id)
                            ? 'bg-green-600 text-white'
                            : 'bg-violet-600 hover:bg-violet-700 text-white'
                        } transition-all`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRegister(event.id);
                        }}
                        disabled={registeredEvents.includes(event.id)}
                        whileHover={{ scale: registeredEvents.includes(event.id) ? 1 : 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {registeredEvents.includes(event.id) ? 'REGISTERED' : 'REGISTER NOW'}
                      </motion.button>
                    )}
                  </motion.div>

                  {expandedEvent !== event.id && (
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center text-xs text-gray-400">
                        <img 
                          src="https://cdn-icons-png.flaticon.com/512/3317/3317604.png" 
                          alt="Team" 
                          className="w-3 h-3 mr-1 opacity-70"
                        />
                        {event.teamSize}
                        <span className="mx-2">•</span>
                        <img 
                          src="https://cdn-icons-png.flaticon.com/512/3176/3176366.png" 
                          alt="Reward" 
                          className="w-3 h-3 mr-1 opacity-70"
                        />
                        {event.reward.split('+')[0].trim()}
                      </div>
                      <div className="text-xs text-indigo-300">Click for details</div>
                    </div>
                  )}
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/20"></div>
                <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/20"></div>

                {registeredEvents.includes(event.id) && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-green-500 text-white text-xs px-3 py-1 rounded-bl-md font-bold">
                      REGISTERED
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {/* Tournament trophy showcase */}
        <motion.div
          className="rounded-xl backdrop-blur-sm border border-gray-700 p-6 bg-purple-900/20 mt-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Trophy Hall</h3>
          
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { name: "Champion Coder", img: "https://cdn-icons-png.flaticon.com/512/2583/2583344.png", detail: "Win a major hackathon"},
              { name: "Knowledge Seeker", img: "https://cdn-icons-png.flaticon.com/512/2912/2912806.png", detail: "Attend 5 workshops"},
              { name: "Networking Ninja", img: "https://cdn-icons-png.flaticon.com/512/3135/3135677.png", detail: "Join 3 meetups"}
            ].map((trophy, i) => (
              <motion.div 
                key={i}
                className="flex flex-col items-center w-44 text-center"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <motion.img
                  src={trophy.img}
                  alt={trophy.name}
                  className="w-24 h-24 mb-4 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                  animate={{
                    y: [0, -5, 0],
                    rotate: [-5, 0, 5, 0, -5]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    delay: i * 1.5
                  }}
                />
                <h4 className="font-bold text-white">{trophy.name}</h4>
                <p className="text-xs text-gray-400 mt-1">{trophy.detail}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GameEvents;