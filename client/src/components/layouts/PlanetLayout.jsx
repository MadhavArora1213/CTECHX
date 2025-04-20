// src/layouts/PlanetLayout.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import PropTypes from 'prop-types';
import { FaArrowLeft, FaRocket, FaStar, FaMap, FaCompass, FaInfoCircle, FaQuestionCircle, FaStore } from 'react-icons/fa';

/**
 * Layout component for planet-specific views with responsive design
 */
const PlanetLayout = ({ children }) => {
  const { planetId } = useParams();
  const navigate = useNavigate();
  const [planetData, setPlanetData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('missions');
  const [showInfo, setShowInfo] = useState(false);
  
  // Tabs available on the planet
  const tabs = [
    { id: 'missions', label: 'Missions', icon: FaRocket },
    { id: 'map', label: 'Map', icon: FaMap },
    { id: 'shop', label: 'Shop', icon: FaStore },
    { id: 'help', label: 'Help', icon: FaQuestionCircle }
  ];
  
  // Planet color themes
  const planetThemes = {
    codeforge: {
      primary: 'from-blue-800 to-indigo-900',
      secondary: 'bg-blue-900/30',
      accent: 'border-blue-500',
      text: 'text-blue-400'
    },
    neuron: {
      primary: 'from-purple-800 to-fuchsia-900',
      secondary: 'bg-purple-900/30',
      accent: 'border-purple-500',
      text: 'text-purple-400'
    },
    droidcore: {
      primary: 'from-green-800 to-emerald-900',
      secondary: 'bg-green-900/30',
      accent: 'border-green-500',
      text: 'text-green-400'
    },
    cryptia: {
      primary: 'from-red-800 to-rose-900',
      secondary: 'bg-red-900/30',
      accent: 'border-red-500',
      text: 'text-red-400'
    },
    devopsprime: {
      primary: 'from-amber-800 to-yellow-900',
      secondary: 'bg-amber-900/30',
      accent: 'border-amber-500',
      text: 'text-amber-400'
    },
    algomatrix: {
      primary: 'from-cyan-800 to-sky-900',
      secondary: 'bg-cyan-900/30',
      accent: 'border-cyan-500',
      text: 'text-cyan-400'
    }
  };
  
  // Default theme if planet not found
  const theme = planetThemes[planetId] || planetThemes.codeforge;
  
  // Fetch planet data
  useEffect(() => {
    const fetchPlanetData = async () => {
      try {
        setLoading(true);
        // Replace with actual API call
        // const response = await axios.get(`/api/planets/${planetId}`);
        
        // Mock planet data
        const planetInfo = {
          codeforge: {
            name: 'CodeForge',
            description: 'The foundational planet where frontend and backend technologies merge. Master the basics of web development and building full-stack applications.',
            progress: 45,
            totalMissions: 24,
            completedMissions: 11,
            availableMissions: 5,
            activeLocation: 'Central Hub',
            locations: ['Central Hub', 'Frontend Valley', 'Backend Mountains', 'API Junction'],
            unlockRequirement: 'None - Starting Planet',
            techFocus: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'Express', 'Databases'],
            image: 'https://img.freepik.com/free-vector/gradient-galaxy-background_23-2148983655.jpg'
          },
          neuron: {
            name: 'Neuron',
            description: 'A planet dedicated to artificial intelligence and machine learning. Expand your knowledge in data science and neural networks.',
            progress: 20,
            totalMissions: 30,
            completedMissions: 6,
            availableMissions: 4,
            activeLocation: 'Data Harbor',
            locations: ['Data Harbor', 'Neural Forest', 'Tensor Fields', 'Deep Learning Caverns'],
            unlockRequirement: 'Complete 15 missions on CodeForge',
            techFocus: ['Python', 'TensorFlow', 'PyTorch', 'Data Analysis', 'Neural Networks'],
            image: 'https://img.freepik.com/free-vector/gradient-purple-background-with-abstract-design_23-2149041622.jpg'
          }
        };
        
        // Set planet data based on the URL param
        if (planetInfo[planetId]) {
          setPlanetData(planetInfo[planetId]);
        } else {
          // Redirect if planet doesn't exist
          navigate('/student/gaming');
        }
      } catch (error) {
        console.error('Error fetching planet data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPlanetData();
  }, [planetId, navigate]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="w-12 h-12 rounded-full border-t-4 border-blue-500 animate-spin"></div>
      </div>
    );
  }
  
  if (!planetData) {
    return null;
  }
  
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Planet header with image background */}
      <header className={`relative bg-gradient-to-b ${theme.primary}`}>
        <div className="absolute inset-0 overflow-hidden">
          {/* Planet background image with overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url(${planetData.image})` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
        </div>
        
        {/* Back button and planet info */}
        <div className="relative z-10 px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <div className="flex items-center mb-4 sm:mb-0">
              <button
                onClick={() => navigate('/student/gaming')}
                className="mr-4 bg-black/30 hover:bg-black/40 rounded-full p-2 text-gray-300 hover:text-white transition"
              >
                <FaArrowLeft size={16} />
              </button>
              
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center">
                  {planetData.name}
                  <button 
                    className="ml-2 text-gray-400 hover:text-white"
                    onClick={() => setShowInfo(!showInfo)}
                  >
                    <FaInfoCircle size={16} />
                  </button>
                </h1>
                <p className="text-gray-300 mt-1 max-w-2xl">
                  {planetData.activeLocation}
                </p>
              </div>
            </div>
            
            {/* Mission progress */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-6">
              <div className="bg-black/30 rounded-lg px-3 py-2">
                <div className="flex items-center">
                  <FaRocket className="text-blue-400 mr-2" />
                  <div>
                    <div className="text-sm text-gray-400">Missions</div>
                    <div className="text-white font-medium">{planetData.completedMissions}/{planetData.totalMissions}</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-black/30 rounded-lg px-3 py-2">
                <div className="flex items-center">
                  <FaStar className="text-yellow-400 mr-2" />
                  <div>
                    <div className="text-sm text-gray-400">Progress</div>
                    <div className="text-white font-medium">{planetData.progress}%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="mt-4">
            <div className="h-2 bg-black/30 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
                initial={{ width: '0%' }}
                animate={{ width: `${planetData.progress}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>
          </div>
          
          {/* Planet information panel (collapsible) */}
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: showInfo ? 'auto' : 0, opacity: showInfo ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className={`mt-4 p-4 rounded-lg ${theme.secondary} border ${theme.accent}/30`}>
              <h3 className="font-medium text-white mb-2">About {planetData.name}</h3>
              <p className="text-gray-300 text-sm mb-3">{planetData.description}</p>
              
              {/* Tech focus badges */}
              <div className="mb-3">
                <h4 className="text-xs font-medium text-gray-400 mb-1">Technology Focus:</h4>
                <div className="flex flex-wrap gap-2">
                  {planetData.techFocus.map((tech, i) => (
                    <span 
                      key={i} 
                      className={`text-xs ${theme.text} bg-black/30 rounded-full px-2 py-1`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Unlock requirement */}
              <div>
                <h4 className="text-xs font-medium text-gray-400 mb-1">Unlock Requirement:</h4>
                <p className="text-sm text-white">{planetData.unlockRequirement}</p>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Tab navigation */}
        <div className="relative z-10 px-4 sm:px-6 lg:px-8 pb-0">
          <nav className="flex overflow-x-auto hide-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`flex items-center px-4 py-3 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? `border-blue-500 text-blue-400`
                    : `border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-700`
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon className="mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>
      
      {/* Location selector (scrollable horizontally) */}
      <div className={`bg-gray-800 border-t border-gray-700 shadow-md`}>
        <div className="px-4 py-2 sm:px-6 lg:px-8 overflow-x-auto hide-scrollbar">
          <div className="flex space-x-2">
            <FaCompass className="text-gray-400 mt-2.5 mr-1 flex-shrink-0" />
            {planetData.locations.map((location) => (
              <button
                key={location}
                className={`px-3 py-1 text-sm rounded-full whitespace-nowrap ${
                  location === planetData.activeLocation
                    ? `bg-blue-900/50 text-blue-300 border border-blue-700/50`
                    : `text-gray-400 hover:bg-gray-700/50 hover:text-gray-300`
                }`}
              >
                {location}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Main content area */}
      <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        {/* Show content based on active tab */}
        {activeTab === 'missions' && children}
        
        {activeTab === 'map' && (
          <div className="bg-gray-800 rounded-lg p-6 text-center">
            <FaMap className="mx-auto text-gray-500 text-4xl mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">Planet Map</h3>
            <p className="text-gray-400">Interactive map feature coming soon!</p>
          </div>
        )}
        
        {activeTab === 'shop' && (
          <div className="bg-gray-800 rounded-lg p-6 text-center">
            <FaStore className="mx-auto text-gray-500 text-4xl mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">Planet Shop</h3>
            <p className="text-gray-400">Shop unique items specific to this planet! Coming soon.</p>
          </div>
        )}
        
        {activeTab === 'help' && (
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-medium text-white mb-4">Planet Help</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-blue-400 mb-2">How to Complete Missions</h4>
                <p className="text-gray-300 text-sm">Select any available mission from the missions tab. Follow the instructions and submit your completed work. You'll earn XP and rewards for each completed mission.</p>
              </div>
              
              <div>
                <h4 className="font-medium text-blue-400 mb-2">Unlocking New Areas</h4>
                <p className="text-gray-300 text-sm">Complete missions to gain access to new locations within the planet. Each location offers unique missions and learning opportunities.</p>
              </div>
              
              <div>
                <h4 className="font-medium text-blue-400 mb-2">Mission Types</h4>
                <ul className="list-disc pl-5 text-gray-300 text-sm space-y-1">
                  <li><span className="text-white">Coding Missions</span> - Write and submit code to solve problems</li>
                  <li><span className="text-white">Puzzle Missions</span> - Arrange components to create solutions</li>
                  <li><span className="text-white">Quiz Missions</span> - Test your knowledge with interactive quizzes</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

PlanetLayout.propTypes = {
  children: PropTypes.node.isRequired,
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

export default PlanetLayout;