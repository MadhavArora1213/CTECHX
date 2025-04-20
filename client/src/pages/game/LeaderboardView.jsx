import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { FaTrophy, FaMedal, FaChartLine, FaRocket, FaLaptopCode, FaUserAstronaut, FaArrowUp, FaArrowDown, FaEquals, FaFilter, FaCalendarAlt } from 'react-icons/fa';
import { RiNumber1, RiNumber2, RiNumber3 } from 'react-icons/ri';

const LeaderboardView = () => {
  const { user } = useAuth();
  const [leaderboardType, setLeaderboardType] = useState('xp');
  const [timeRange, setTimeRange] = useState('allTime');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  
  // Mock user data for leaderboards
  const mockUsers = useMemo(() => [
    {
      id: 'user1',
      username: 'CodeNinja',
      avatar: '👨‍💻',
      level: 28,
      xp: 14250,
      missions: 87,
      achievements: 42,
      challenges: 23,
      planet: 'Algomatrix',
      rank: 1,
      rankChange: 0,  // 0 = no change, positive = gain, negative = loss
    },
    {
      id: 'user2',
      username: 'AlgoQueen',
      avatar: '👩‍💻',
      level: 26,
      xp: 13100,
      missions: 78,
      achievements: 38,
      challenges: 25,
      planet: 'Cryptia',
      rank: 2,
      rankChange: 1,
    },
    {
      id: 'user3',
      username: 'DevWizard',
      avatar: '🧙‍♂️',
      level: 25,
      xp: 12800,
      missions: 84,
      achievements: 35,
      challenges: 19,
      planet: 'DevOpsPrime',
      rank: 3,
      rankChange: -1,
    },
    {
      id: 'user4',
      username: 'ByteMaster',
      avatar: '🤖',
      level: 24,
      xp: 12200,
      missions: 75,
      achievements: 36,
      challenges: 22,
      planet: 'CodeForge',
      rank: 4,
      rankChange: 2,
    },
    {
      id: 'currentUser', // This would match your actual user ID
      username: 'YourUsername',
      avatar: '😎',
      level: 20,
      xp: 9800,
      missions: 62,
      achievements: 28,
      challenges: 15,
      planet: 'Neuron',
      rank: 5,
      rankChange: -1,
    },
    {
      id: 'user6',
      username: 'LogicLegend',
      avatar: '🦸‍♀️',
      level: 19,
      xp: 9400,
      missions: 59,
      achievements: 26,
      challenges: 16,
      planet: 'CodeForge',
      rank: 6,
      rankChange: 0,
    },
    {
      id: 'user7',
      username: 'QuantumCoder',
      avatar: '🔬',
      level: 18,
      xp: 9000,
      missions: 55,
      achievements: 25,
      challenges: 14,
      planet: 'CodeForge',
      rank: 7,
      rankChange: 3,
    },
    {
      id: 'user8',
      username: 'CyberExplorer',
      avatar: '🚀',
      level: 17,
      xp: 8500,
      missions: 52,
      achievements: 23,
      challenges: 12,
      planet: 'CodeForge',
      rank: 8,
      rankChange: -2,
    },
    {
      id: 'user9',
      username: 'SyntaxSurfer',
      avatar: '🏄‍♂️',
      level: 16,
      xp: 8200,
      missions: 50,
      achievements: 21,
      challenges: 11,
      planet: 'CodeForge',
      rank: 9,
      rankChange: 0,
    },
    {
      id: 'user10',
      username: 'DataDiva',
      avatar: '💃',
      level: 15,
      xp: 7800,
      missions: 48,
      achievements: 20,
      challenges: 10,
      planet: 'CodeForge',
      rank: 10,
      rankChange: 5,
    },
  ], []);
  
  // Leaderboard tabs
  const leaderboardTabs = [
    { id: 'xp', name: 'XP', icon: FaTrophy },
    { id: 'missions', name: 'Missions', icon: FaRocket },
    { id: 'achievements', name: 'Achievements', icon: FaMedal },
    { id: 'challenges', name: 'Challenges', icon: FaLaptopCode },
  ];
  
  // Time range filters
  const timeRanges = [
    { id: 'weekly', name: 'This Week' },
    { id: 'monthly', name: 'This Month' },
    { id: 'allTime', name: 'All Time' },
  ];
  
  // Load leaderboard data
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call
    const fetchLeaderboard = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await axios.get(`/api/leaderboards/${leaderboardType}?timeRange=${timeRange}`);
        
        // Simulate successful data load after delay
        setTimeout(() => {
          setLoading(false);
        }, 800);
        
      } catch (err) {
        console.error('Error fetching leaderboard data:', err);
        setError('Failed to load leaderboard. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchLeaderboard();
  }, [leaderboardType, timeRange]);
  
  // Find current user in the leaderboard
  const currentUserRank = useMemo(() => {
    return mockUsers.find(u => u.id === 'currentUser');
  }, [mockUsers]);
  
  // Get sorted leaderboard data based on type
  const leaderboardData = useMemo(() => {
    return [...mockUsers].sort((a, b) => {
      switch (leaderboardType) {
        case 'xp':
          return b.xp - a.xp;
        case 'missions':
          return b.missions - a.missions;
        case 'achievements':
          return b.achievements - a.achievements;
        case 'challenges':
          return b.challenges - a.challenges;
        default:
          return b.xp - a.xp;
      }
    });
  }, [mockUsers, leaderboardType]);
  
  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.05
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };
  
  // Get medal component based on rank
  const getRankMedal = (rank) => {
    switch (rank) {
      case 1:
        return <RiNumber1 className="text-yellow-400 text-xl" />;
      case 2:
        return <RiNumber2 className="text-gray-400 text-xl" />;
      case 3:
        return <RiNumber3 className="text-amber-700 text-xl" />;
      default:
        return <span className="text-gray-400 font-mono w-5 text-center">{rank}</span>;
    }
  };
  
  // Get rank change icon
  const getRankChangeIcon = (change) => {
    if (change > 0) {
      return <FaArrowUp className="text-green-400 ml-1" />;
    } else if (change < 0) {
      return <FaArrowDown className="text-red-400 ml-1" />;
    } else {
      return <FaEquals className="text-gray-500 ml-1" />;
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
          <p className="text-red-300 text-lg">{error}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Leaderboards</h1>
        <p className="text-gray-400">
          Compete with other students to reach the top of the rankings.
        </p>
      </header>
      
      {/* Current User Rank Card */}
      <div className="bg-blue-900/20 border border-blue-800 rounded-lg mb-6">
        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-center">
            <div className="flex items-center mb-4 sm:mb-0">
              <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center text-3xl border-2 border-blue-500">
                {currentUserRank?.avatar || '👤'}
              </div>
              <div className="ml-4 text-center sm:text-left">
                <p className="text-gray-400">Your Rank</p>
                <p className="text-3xl font-bold text-white flex items-center">
                  #{currentUserRank?.rank || '?'} 
                  <span className="ml-2 text-sm flex items-center">
                    {currentUserRank && getRankChangeIcon(currentUserRank.rankChange)}
                    <span className={`ml-1 ${
                      currentUserRank?.rankChange > 0
                        ? 'text-green-400'
                        : currentUserRank?.rankChange < 0
                          ? 'text-red-400'
                          : 'text-gray-500'
                    }`}>
                      {currentUserRank?.rankChange > 0 && '+'}
                      {currentUserRank?.rankChange !== 0 && Math.abs(currentUserRank?.rankChange)}
                    </span>
                  </span>
                </p>
              </div>
            </div>
            
            <div className="flex-grow grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 sm:mt-0 sm:ml-8">
              <div>
                <p className="text-sm text-gray-400 mb-1">Level</p>
                <p className="text-xl font-bold text-white">{currentUserRank?.level || 0}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">XP</p>
                <p className="text-xl font-bold text-white">{currentUserRank?.xp.toLocaleString() || 0}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Missions</p>
                <p className="text-xl font-bold text-white">{currentUserRank?.missions || 0}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Achievements</p>
                <p className="text-xl font-bold text-white">{currentUserRank?.achievements || 0}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Leaderboard Tabs & Filters */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 mb-6">
        <div className="p-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            {/* Leaderboard type tabs */}
            <div className="flex overflow-x-auto hide-scrollbar mb-4 sm:mb-0">
              {leaderboardTabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`px-4 py-2 rounded-md flex items-center whitespace-nowrap mr-2 ${
                    leaderboardType === tab.id 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                  onClick={() => setLeaderboardType(tab.id)}
                >
                  <tab.icon className="mr-2" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </div>
            
            {/* Mobile filter toggle */}
            <button 
              className="sm:hidden bg-gray-700 text-gray-300 px-4 py-2 rounded-md flex items-center"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FaFilter className="mr-2" />
              Filter
            </button>
            
            {/* Time range filter - hidden on mobile until toggled */}
            <div className={`flex flex-wrap mt-4 sm:mt-0 ${showFilters ? 'block' : 'hidden sm:flex'}`}>
              <div className="flex items-center mr-2 text-gray-400">
                <FaCalendarAlt className="mr-1" />
                <span className="text-sm">Time Range:</span>
              </div>
              {timeRanges.map((range) => (
                <button
                  key={range.id}
                  className={`ml-2 px-3 py-1 rounded text-sm ${
                    timeRange === range.id 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                  onClick={() => setTimeRange(range.id)}
                >
                  {range.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Leaderboard Table */}
      <motion.div
        className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Table header */}
        <div className="grid grid-cols-12 bg-gray-700 py-3 px-4 text-sm font-semibold text-gray-300">
          <div className="col-span-1 flex justify-center">#</div>
          <div className="col-span-5 sm:col-span-4">Student</div>
          <div className="col-span-2 text-center hidden sm:block">Level</div>
          <div className="col-span-4 text-right sm:text-center">
            {leaderboardType === 'xp' && 'XP'}
            {leaderboardType === 'missions' && 'Missions'}
            {leaderboardType === 'achievements' && 'Achievements'}
            {leaderboardType === 'challenges' && 'Challenges'}
          </div>
          <div className="col-span-2 text-right hidden sm:block">Planet</div>
        </div>
        
        {/* Table rows */}
        <div>
          {leaderboardData.map((user, index) => (
            <motion.div
              key={user.id}
              className={`grid grid-cols-12 py-3 px-4 border-b border-gray-700 last:border-0 items-center ${
                user.id === 'currentUser' ? 'bg-blue-900/20' : index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-800/50'
              }`}
              variants={itemVariants}
            >
              {/* Rank */}
              <div className="col-span-1 flex justify-center items-center">
                {getRankMedal(index + 1)}
              </div>
              
              {/* User */}
              <div className="col-span-5 sm:col-span-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-xl border border-gray-600">
                    {user.avatar}
                  </div>
                  <div className="ml-3 truncate">
                    <p className={`font-medium ${user.id === 'currentUser' ? 'text-blue-300' : 'text-white'}`}>
                      {user.username}
                    </p>
                    <div className="flex items-center text-xs text-gray-500">
                      <span className="hidden sm:inline">Rank change: </span>
                      <span className={
                        user.rankChange > 0
                          ? 'text-green-400'
                          : user.rankChange < 0
                            ? 'text-red-400'
                            : 'text-gray-500'
                      }>
                        {user.rankChange > 0 && '+'}
                        {user.rankChange !== 0 ? Math.abs(user.rankChange) : '-'}
                      </span>
                      {getRankChangeIcon(user.rankChange)}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Level */}
              <div className="col-span-2 text-center hidden sm:block">
                <span className="inline-flex items-center px-2 py-1 rounded bg-gray-700/50 text-blue-300">
                  <FaChartLine className="mr-1 text-xs" />
                  {user.level}
                </span>
              </div>
              
              {/* Score based on leaderboard type */}
              <div className="col-span-4 text-right sm:text-center">
                <span className="font-medium text-white">
                  {leaderboardType === 'xp' && user.xp.toLocaleString()}
                  {leaderboardType === 'missions' && user.missions}
                  {leaderboardType === 'achievements' && user.achievements}
                  {leaderboardType === 'challenges' && user.challenges}
                </span>
              </div>
              
              {/* Planet */}
              <div className="col-span-2 text-right hidden sm:block">
                <span className="text-gray-400">{user.planet}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* Bottom note */}
      <p className="text-center text-gray-500 text-sm mt-6">
        Leaderboards are updated every 24 hours. Keep completing missions to improve your rank!
      </p>
    </div>
  );
};

// Add custom CSS to hide scrollbars but allow scrolling
const style = document.createElement('style');
style.textContent = `
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
`;
document.head.appendChild(style);

export default LeaderboardView;