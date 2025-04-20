import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { techSkills } from '../components/shared/GameAssets';

const GameCommunity = ({ isActive, onConnect }) => {
  const [activeGuild, setActiveGuild] = useState(null);
  const [joinedGuilds, setJoinedGuilds] = useState([]);

  const guilds = [
    {
      id: 'frontend',
      name: 'Frontend Fighters',
      icon: 'https://cdn-icons-png.flaticon.com/512/6295/6295417.png',
      level: 'Level 42',
      members: 256,
      skills: ['html', 'css', 'js', 'react'],
      description: 'Masters of UI combat and pixel-perfect design',
      bgColor: 'from-pink-700/30 to-purple-900/30',
    },
    {
      id: 'backend',
      name: 'Server Sages',
      icon: 'https://cdn-icons-png.flaticon.com/512/1006/1006363.png',
      level: 'Level 38',
      members: 194,
      skills: ['node', 'python'],
      description: 'Keepers of database wisdom and API enchantments',
      bgColor: 'from-emerald-700/30 to-teal-900/30',
    },
    {
      id: 'data',
      name: 'Data Diviners',
      icon: 'https://cdn-icons-png.flaticon.com/512/2821/2821637.png',
      level: 'Level 45',
      members: 178,
      skills: ['ai', 'python'],
      description: 'AI shamans capable of predicting digital futures',
      bgColor: 'from-blue-700/30 to-indigo-900/30',
    },
    {
      id: 'blockchain',
      name: 'Chain Champions',
      icon: 'https://cdn-icons-png.flaticon.com/512/2152/2152349.png',
      level: 'Level 31',
      members: 92,
      skills: ['blockchain'],
      description: 'Forging distributed ledger weapons for the new internet',
      bgColor: 'from-amber-700/30 to-orange-900/30',
    },
  ];

  const handleGuildClick = (guildId) => {
    setActiveGuild(guildId === activeGuild ? null : guildId);
  };

  const joinGuild = (guildId) => {
    if (!joinedGuilds.includes(guildId)) {
      setJoinedGuilds([...joinedGuilds, guildId]);
      onConnect();
    }
  };

  return (
    <section className="min-h-screen py-20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/20 to-gray-900/50 z-0" />
      <div 
        className="absolute inset-0 opacity-20 z-0"
        style={{
          backgroundImage: "url('https://www.transparenttextures.com/patterns/carbon-fibre.png')",
        }}
      />
      
      {/* Decorative particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 10 + 2,
              height: Math.random() * 10 + 2,
              background: `rgba(${Math.random() * 255}, ${Math.random() * 255}, 255, 0.5)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 10,
            }}
          />
        ))}
      </div>

      {/* Section content */}
      <div className="container mx-auto px-4 z-10 relative">
        <motion.div
          className="text-center mb-16"
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
              LEVEL 4: THE GUILD
            </span>
          </motion.div>
          
          <motion.h2
            className="text-4xl md:text-5xl font-black mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 via-purple-400 to-indigo-500">
              Join Your Coding Clan
            </span>
          </motion.h2>
          
          <motion.p
            className="text-gray-300 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            Find your tribe and level up together. Each guild specializes in different tech stacks and offers unique quests and rewards.
          </motion.p>
        </motion.div>

        {/* Guild Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {guilds.map((guild, index) => (
            <motion.div
              key={guild.id}
              className={`relative rounded-xl overflow-hidden backdrop-blur-sm border ${
                joinedGuilds.includes(guild.id) 
                ? 'border-green-500' 
                : activeGuild === guild.id 
                  ? 'border-indigo-500'
                  : 'border-gray-700'
              } transition-all duration-300 cursor-pointer group`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
              viewport={{ once: true }}
              onClick={() => handleGuildClick(guild.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${guild.bgColor} opacity-70`} />
              
              {/* Guild content */}
              <div className="p-6 relative z-10">
                <div className="flex items-center">
                  <motion.img 
                    src={guild.icon} 
                    alt={guild.name}
                    className="w-16 h-16 object-contain mr-4 drop-shadow-glow"
                    whileHover={{ rotate: 10 }}
                  />
                  <div>
                    <h3 className="text-white text-2xl font-bold">{guild.name}</h3>
                    <div className="flex items-center text-xs">
                      <span className="text-cyan-300 mr-3">{guild.level}</span>
                      <span className="text-gray-400 flex items-center">
                        <img 
                          src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png" 
                          alt="Members" 
                          className="w-4 h-4 inline mr-1 opacity-70"
                        />
                        {guild.members}
                      </span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-300 my-4">{guild.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {guild.skills.map(skillId => {
                    const skill = techSkills.find(s => s.id === skillId);
                    return skill ? (
                      <div 
                        key={skill.id} 
                        className="px-2 py-1 rounded-full text-xs bg-black/30 flex items-center"
                        style={{ color: skill.color }}
                      >
                        <span className="mr-1">{skill.icon}</span>
                        {skill.name}
                      </div>
                    ) : null;
                  })}
                </div>
                
                <motion.button 
                  className={`px-4 py-2 rounded-lg text-sm font-bold ${
                    joinedGuilds.includes(guild.id)
                      ? 'bg-green-600 text-white'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  } transition-all`}
                  onClick={(e) => {
                    e.stopPropagation();
                    joinGuild(guild.id);
                  }}
                  disabled={joinedGuilds.includes(guild.id)}
                  whileHover={{ scale: joinedGuilds.includes(guild.id) ? 1 : 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {joinedGuilds.includes(guild.id) ? 'MEMBER' : 'JOIN GUILD'}
                </motion.button>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-white/20"></div>
              <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-white/20"></div>
            </motion.div>
          ))}
        </div>
        
        {/* Guild leaderboard */}
        <motion.div
          className="rounded-xl backdrop-blur-sm border border-gray-700 p-6 bg-indigo-900/20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/2055/2055568.png" 
              alt="Trophy" 
              className="w-6 h-6 mr-2"
            />
            Guild Leaderboard
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-2 px-2 text-gray-400">#</th>
                  <th className="py-2 px-2 text-gray-400">Guild</th>
                  <th className="py-2 px-2 text-gray-400">Members</th>
                  <th className="py-2 px-2 text-gray-400">Quests Completed</th>
                  <th className="py-2 px-2 text-gray-400">Trophy Points</th>
                </tr>
              </thead>
              <tbody>
                {guilds.sort((a, b) => b.members - a.members).map((guild, i) => (
                  <tr 
                    key={guild.id}
                    className={`border-b border-gray-800 ${joinedGuilds.includes(guild.id) ? 'bg-green-900/10' : ''}`}
                  >
                    <td className="py-3 px-2 font-mono">{i + 1}</td>
                    <td className="py-3 px-2">
                      <div className="flex items-center">
                        <img src={guild.icon} alt={guild.name} className="w-8 h-8 mr-2" />
                        <span className="font-semibold text-white">{guild.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-2 font-mono">{guild.members}</td>
                    <td className="py-3 px-2 font-mono">{Math.floor(guild.members * 1.7)}</td>
                    <td className="py-3 px-2 font-mono text-yellow-400">{guild.members * 120}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GameCommunity;