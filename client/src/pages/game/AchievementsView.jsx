// src/pages/game/AchievementsView.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import useGame from '../../hooks/useGame';
import { FaTrophy, FaSearch, FaFilter, FaStar, FaLock, FaCheck, FaMedal, FaRocket } from 'react-icons/fa';
import { IoMdPlanet } from 'react-icons/io';
import { GiArmorUpgrade, GiSkills } from 'react-icons/gi';

const AchievementsView = () => {
  const { user } = useAuth();
  const { achievements, loading, error } = useGame();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOrder, setSortOrder] = useState('default'); // default, newest, oldest, completion
  const [showFilters, setShowFilters] = useState(false);
  
  // Achievement categories
  const categories = useMemo(() => [
    { id: 'all', name: 'All Achievements', icon: FaTrophy },
    { id: 'learning', name: 'Learning', icon: GiSkills },
    { id: 'exploration', name: 'Exploration', icon: IoMdPlanet },
    { id: 'mastery', name: 'Mastery', icon: FaMedal },
    { id: 'social', name: 'Social', icon: FaRocket },
    { id: 'milestone', name: 'Milestones', icon: GiArmorUpgrade }
  ], []);
  
  // Mocked achievement data (replace with actual data from your game hook)
  const mockAchievements = useMemo(() => [
    {
      id: 'first-mission',
      title: 'First Steps',
      description: 'Complete your first mission',
      category: 'milestone',
      xpReward: 50,
      dateUnlocked: '2023-10-15T10:30:00Z',
      icon: '🚀',
      unlocked: true,
      progress: 100,
      rarity: 'common', // common, uncommon, rare, epic, legendary
    },
    {
      id: 'codeforge-explorer',
      title: 'CodeForge Explorer',
      description: 'Complete 10 missions on Planet CodeForge',
      category: 'exploration',
      xpReward: 150,
      icon: '🌐',
      unlocked: true,
      progress: 100,
      rarity: 'uncommon',
    },
    {
      id: 'api-master',
      title: 'API Master',
      description: 'Complete all API-related missions',
      category: 'mastery',
      xpReward: 300,
      icon: '⚙️',
      unlocked: false,
      progress: 70,
      rarity: 'rare',
    },
    {
      id: 'js-guru',
      title: 'JavaScript Guru',
      description: 'Master all JavaScript challenges',
      category: 'learning',
      xpReward: 500,
      icon: '📜',
      unlocked: false,
      progress: 45,
      rarity: 'epic',
    },
    {
      id: 'team-player',
      title: 'Team Player',
      description: 'Collaborate with 5 other students on projects',
      category: 'social',
      xpReward: 200,
      icon: '👥',
      unlocked: true,
      progress: 100,
      rarity: 'uncommon',
    },
    {
      id: 'neuron-pioneer',
      title: 'Neuron Pioneer',
      description: 'Be among the first 100 students to reach Planet Neuron',
      category: 'exploration',
      xpReward: 350,
      icon: '🧠',
      unlocked: true,
      progress: 100,
      rarity: 'rare',
    },
    {
      id: 'perfect-code',
      title: 'Perfect Code',
      description: 'Complete a mission with a perfect score',
      category: 'mastery',
      xpReward: 150,
      icon: '✨',
      unlocked: true,
      progress: 100,
      rarity: 'uncommon',
    },
    {
      id: 'algo-wizard',
      title: 'Algorithm Wizard',
      description: 'Solve 20 algorithm challenges',
      category: 'learning',
      xpReward: 400,
      icon: '🧙',
      unlocked: false,
      progress: 65,
      rarity: 'epic',
    },
    {
      id: 'db-champion',
      title: 'Database Champion',
      description: 'Master all database challenges',
      category: 'learning',
      xpReward: 350,
      icon: '💾',
      unlocked: false,
      progress: 30,
      rarity: 'rare',
    },
    {
      id: 'legendary-coder',
      title: 'Legendary Coder',
      description: 'Complete all missions across all planets',
      category: 'milestone',
      xpReward: 1000,
      icon: '👑',
      unlocked: false,
      progress: 15,
      rarity: 'legendary',
    }
  ], []);
  
  // Calculate achievement statistics
  const stats = useMemo(() => {
    const total = mockAchievements.length;
    const unlocked = mockAchievements.filter(a => a.unlocked).length;
    const percent = total > 0 ? Math.round((unlocked / total) * 100) : 0;
    const totalXP = mockAchievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.xpReward, 0);
    
    return { total, unlocked, percent, totalXP };
  }, [mockAchievements]);
  
  // Filter achievements based on search and category
  const filteredAchievements = useMemo(() => {
    return mockAchievements
      .filter(achievement => {
        const matchesSearch = 
          achievement.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
          achievement.description.toLowerCase().includes(searchTerm.toLowerCase());
          
        const matchesCategory = selectedCategory === 'all' || achievement.category === selectedCategory;
        
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        switch (sortOrder) {
          case 'newest':
            return new Date(b.dateUnlocked || 0) - new Date(a.dateUnlocked || 0);
          case 'oldest':
            return new Date(a.dateUnlocked || 0) - new Date(b.dateUnlocked || 0);
          case 'completion':
            return b.progress - a.progress;
          default:
            // Default sorting: Unlocked first, then by rarity
            if (a.unlocked !== b.unlocked) return a.unlocked ? -1 : 1;
            
            const rarityOrder = { common: 0, uncommon: 1, rare: 2, epic: 3, legendary: 4 };
            return rarityOrder[b.rarity] - rarityOrder[a.rarity];
        }
      });
  }, [mockAchievements, searchTerm, selectedCategory, sortOrder]);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.05,
      }
    }
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };
  
  // Get color based on rarity
  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'bg-gray-500';
      case 'uncommon': return 'bg-green-500';
      case 'rare': return 'bg-blue-500';
      case 'epic': return 'bg-purple-500';
      case 'legendary': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };
  
  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-200px)]">
        <div className="w-16 h-16 border-t-4 border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }
  
  // Error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="bg-red-900/30 border border-red-800 rounded-lg p-6 text-center">
          <p className="text-red-300 text-lg">Error loading achievements. Please try again later.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Achievements</h1>
        <p className="text-gray-400">
          Track your progress and unlock rewards as you master new skills.
        </p>
      </header>
      
      {/* Achievement Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <h3 className="text-sm text-gray-400 mb-1">Total Achievements</h3>
          <div className="flex items-baseline">
            <span className="text-2xl font-bold text-white">{stats.total}</span>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <h3 className="text-sm text-gray-400 mb-1">Unlocked</h3>
          <div className="flex items-baseline">
            <span className="text-2xl font-bold text-white">{stats.unlocked}</span>
            <span className="text-gray-400 ml-2">({stats.percent}%)</span>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <h3 className="text-sm text-gray-400 mb-1">XP Earned</h3>
          <div className="flex items-baseline">
            <span className="text-2xl font-bold text-white">{stats.totalXP}</span>
            <FaStar className="ml-2 text-yellow-500" />
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <h3 className="text-sm text-gray-400 mb-1">Next Milestone</h3>
          <div className="flex items-baseline">
            <span className="text-lg font-bold text-white truncate">Legendary Coder</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
            <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '15%' }}></div>
          </div>
        </div>
      </div>
      
      {/* Search and Filters */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 mb-6">
        <div className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-grow">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search achievements..."
                className="bg-gray-700 w-full pl-10 pr-4 py-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Sort options */}
            <div className="flex-shrink-0">
              <select
                className="bg-gray-700 px-4 py-2 rounded-md text-white appearance-none w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="default">Default Sort</option>
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="completion">Completion %</option>
              </select>
            </div>
            
            {/* Filter toggle button (mobile) */}
            <button 
              className="md:hidden bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FaFilter className="mr-2" />
              Filters
            </button>
          </div>
        </div>
        
        {/* Category filters - always visible on desktop, toggleable on mobile */}
        <div className={`border-t border-gray-700 ${showFilters ? 'block' : 'hidden md:block'}`}>
          <div className="p-4 overflow-x-auto">
            <div className="flex space-x-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`px-3 py-1 rounded-full whitespace-nowrap flex items-center text-sm ${
                    selectedCategory === category.id 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <category.icon className="mr-1" />
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Achievement Cards */}
      {filteredAchievements.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredAchievements.map((achievement) => (
            <motion.div
              key={achievement.id}
              className={`bg-gray-800 rounded-lg border ${achievement.unlocked ? 'border-gray-700' : 'border-gray-900'} overflow-hidden`}
              variants={cardVariants}
            >
              <div className="p-4">
                <div className="flex items-start">
                  {/* Achievement icon */}
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl ${getRarityColor(achievement.rarity)} mr-4`}>
                    {achievement.unlocked ? (
                      <span>{achievement.icon}</span>
                    ) : (
                      <FaLock />
                    )}
                  </div>
                  
                  {/* Achievement details */}
                  <div className="flex-grow">
                    <h3 className={`font-bold ${achievement.unlocked ? 'text-white' : 'text-gray-500'}`}>
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">
                      {achievement.description}
                    </p>
                    
                    {/* Progress bar for in-progress achievements */}
                    {achievement.progress < 100 && (
                      <div className="mt-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-400">Progress</span>
                          <span className="text-gray-400">{achievement.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${achievement.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                    
                    {/* Rewards */}
                    <div className="mt-2 flex items-center">
                      <span className="text-xs text-gray-400 mr-1">Reward:</span>
                      <span className="text-xs text-yellow-400 flex items-center">
                        {achievement.xpReward} XP
                        <FaStar className="ml-1" />
                      </span>
                    </div>
                  </div>
                  
                  {/* Unlock status */}
                  {achievement.unlocked && (
                    <div className="flex-shrink-0 bg-green-900/30 p-1 rounded-full">
                      <FaCheck className="text-green-500" />
                    </div>
                  )}
                </div>
                
                {/* Date unlocked */}
                {achievement.unlocked && achievement.dateUnlocked && (
                  <div className="mt-2 text-right">
                    <span className="text-xs text-gray-500">
                      Unlocked: {new Date(achievement.dateUnlocked).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="bg-gray-800 rounded-lg p-8 text-center">
          <FaTrophy className="mx-auto text-4xl text-gray-600 mb-4" />
          <h3 className="text-xl font-medium text-white mb-2">No achievements found</h3>
          <p className="text-gray-400">Try adjusting your search criteria or explore more planets to unlock achievements.</p>
        </div>
      )}
    </div>
  );
};

export default AchievementsView;