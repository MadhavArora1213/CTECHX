import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import { projectCardVariants } from '../animations/gameVariants';
import InteractiveButtons from '../components/shared/InteractiveButtons';


const GameProjects = ({ isActive, onCollect }) => {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [collectingItem, setCollectingItem] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Project data with game-like attributes
  useEffect(() => {
    setProjects([
      {
        id: 'proj1',
        title: 'Quantum Code',
        category: 'frontend',
        image: 'https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4',
        level: 'Advanced',
        likes: 723,
        collectibles: 3,
        collected: 0,
        techStack: ['React', 'Three.js', 'WebGL'],
        description: 'An immersive 3D visualization tool for quantum computing concepts.',
        status: '92% Complete'
      },
      {
        id: 'proj2',
        title: 'Neural Link',
        category: 'ai',
        image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485',
        level: 'Expert',
        likes: 1089,
        collectibles: 5,
        collected: 0,
        techStack: ['TensorFlow', 'Python', 'CUDA'],
        description: 'AI system that predicts user behavior based on neural patterns.',
        status: '78% Complete'
      },
      {
        id: 'proj3',
        title: 'Cyber Fortress',
        category: 'backend',
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f',
        level: 'Intermediate',
        likes: 412,
        collectibles: 2,
        collected: 0,
        techStack: ['Node.js', 'GraphQL', 'MongoDB'],
        description: 'Secure API gateway with real-time threat monitoring.',
        status: '100% Complete'
      },
      {
        id: 'proj4',
        title: 'Pixel Realm',
        category: 'game',
        image: 'https://images.unsplash.com/photo-1614294149010-950b698f72c0',
        level: 'Beginner',
        likes: 894,
        collectibles: 4,
        collected: 0,
        techStack: ['Unity', 'C#', 'Blender'],
        description: 'Open-world pixel art RPG with procedural generation.',
        status: '65% Complete'
      },
      {
        id: 'proj5',
        title: 'Data Nexus',
        category: 'backend',
        image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3',
        level: 'Advanced',
        likes: 562,
        collectibles: 3,
        collected: 0,
        techStack: ['Go', 'Docker', 'Kubernetes'],
        description: 'High-performance distributed data processing pipeline.',
        status: '87% Complete'
      },
      {
        id: 'proj6',
        title: 'Holo Interface',
        category: 'frontend',
        image: 'https://images.unsplash.com/photo-1633269540827-728e7d35c49b',
        level: 'Intermediate',
        likes: 731,
        collectibles: 2,
        collected: 0,
        techStack: ['Vue.js', 'WebXR', 'GSAP'],
        description: 'Augmented reality UI components for web applications.',
        status: '73% Complete'
      }
    ]);
  }, []);

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);
    
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const collectItem = (projectId) => {
    setCollectingItem(true);
    
    // Update project with collected item
    setProjects(projects.map(project => {
      if (project.id === projectId && project.collected < project.collectibles) {
        const newCollected = project.collected + 1;
        
        // Trigger callback for parent component
        onCollect();
        
        return {
          ...project,
          collected: newCollected
        };
      }
      return project;
    }));
    
    setTimeout(() => {
      setCollectingItem(false);
    }, 1000);
  };

  return (
    <section id="projects" className="py-24 min-h-screen relative overflow-hidden">
      {/* Digital grid background */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-indigo-900/10 to-black/10"></div>
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-[length:40px_40px] opacity-5"></div>
      
      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-indigo-500/30 backdrop-blur-sm"
          style={{
            width: Math.random() * 10 + 5,
            height: Math.random() * 10 + 5,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight
          }}
          animate={{
            x: [null, Math.random() * window.innerWidth],
            y: [null, Math.random() * window.innerHeight],
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            ease: "linear",
            repeat: Infinity,
            repeatType: "mirror"
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
            LEVEL 3: COLLECT ARTIFACTS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500">
              Discover Digital Treasures
            </span>
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Explore projects and collect rare artifacts to boost your developer experience points.
          </p>
        </motion.div>
        
        {/* Project filters */}
        <div className="flex justify-center mb-10 flex-wrap gap-2">
          {['all', 'frontend', 'backend', 'ai', 'game'].map((category) => (
            <motion.button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === category 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-800/60 text-gray-300 hover:bg-gray-700/60'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(category)}
            >
              {category === 'all' ? 'All Projects' : category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </div>
        
        {/* Project grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="bg-gray-900/60 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 hover:border-indigo-500/50 group relative"
                variants={projectCardVariants}
                initial="hidden"
                whileInView="visible"
                exit="exit"
                whileHover="hover"
                viewport={{ once: true, amount: 0.3 }}
                custom={index}
                layoutId={project.id}
                onClick={() => setSelectedProject(project)}
                onMouseMove={handleMouseMove}
              >
                {/* Project image with overlay */}
                <div className="h-48 relative overflow-hidden">
                  <img 
                    src={`${project.image}?w=600&h=300&auto=format&q=80`} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
                  
                  {/* Level badge */}
                  <div className="absolute top-4 left-4 px-2 py-1 bg-black/60 rounded-md text-xs font-mono flex items-center space-x-1">
                    <span className={`
                      w-2 h-2 rounded-full inline-block ${
                        project.level === 'Beginner' ? 'bg-green-500' :
                        project.level === 'Intermediate' ? 'bg-yellow-500' :
                        project.level === 'Advanced' ? 'bg-orange-500' : 
                        'bg-red-500'
                      }
                    `} />
                    <span className="text-white">{project.level}</span>
                  </div>
                  
                  {/* Project likes */}
                  <div className="absolute top-4 right-4 px-2 py-1 bg-black/60 rounded-md text-xs font-mono flex items-center space-x-1">
                    <span className="text-pink-400">❤</span>
                    <span className="text-white">{project.likes}</span>
                  </div>
                  
                  {/* Status bar */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-xs text-white mb-1 flex justify-between">
                      <span>Completion</span>
                      <span>{project.status}</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-800/80 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500"
                        style={{ 
                          width: project.status.replace('%', '') + '%'
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                {/* Project info */}
                <div className="p-5">
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                  
                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map((tech, i) => (
                      <span 
                        key={i} 
                        className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  {/* Collectibles */}
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-1">
                      {Array.from({ length: project.collectibles }).map((_, i) => (
                        <motion.button
                          key={i}
                          className={`w-8 h-8 rounded-md flex items-center justify-center ${
                            i < project.collected 
                              ? 'bg-indigo-500/20 text-yellow-400' 
                              : 'bg-gray-800 text-gray-500'
                          }`}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (i === project.collected) {
                              collectItem(project.id);
                            }
                          }}
                          disabled={i !== project.collected || i >= project.collectibles}
                        >
                          {i < project.collected ? '⭐' : '☆'}
                        </motion.button>
                      ))}
                    </div>
                    
                    <InteractiveButtons.ArrowButton 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProject(project);
                      }}
                    />
                  </div>
                </div>
                
                {/* Hover glow effect */}
                <motion.div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none z-0"
                  style={{
                    background: `radial-gradient(circle at ${mouseX}px ${mouseY}px, rgba(99, 102, 241, 0.15), transparent 60%)`,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
      
      {/* Collection animation overlay */}
      <AnimatePresence>
        {collectingItem && (
          <motion.div 
            className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="text-6xl"
              initial={{ scale: 0, y: 100 }}
              animate={{ 
                scale: [0, 1.5, 1],
                y: [100, -50, -100],
                opacity: [0, 1, 0]
              }}
              transition={{ duration: 1 }}
            >
              ⭐ +50 XP
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Project detail modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
            
            <motion.div
              className="bg-gray-900 rounded-2xl overflow-hidden border border-indigo-500/30 w-full max-w-3xl relative z-10"
              layoutId={selectedProject.id}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="h-64 relative">
                <img 
                  src={`${selectedProject.image}?w=1200&h=600&auto=format&q=90`} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
                
                <button 
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
                  onClick={() => setSelectedProject(null)}
                >
                  ✕
                </button>
                
                <div className="absolute bottom-4 left-6 right-6">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-3xl font-bold text-white">{selectedProject.title}</h2>
                    <div className="flex items-center space-x-2">
                      <div className="px-3 py-1 bg-black/60 rounded-full text-sm flex items-center space-x-1">
                        <span className="text-pink-400">❤</span>
                        <span className="text-white">{selectedProject.likes}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech, i) => (
                      <span 
                        key={i} 
                        className="px-2 py-1 bg-gray-800/80 backdrop-blur-sm rounded text-xs text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-2">Project Description</h3>
                  <p className="text-gray-300">{selectedProject.description}</p>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-2">Completion Status</h3>
                  <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500"
                      style={{ width: '0%' }}
                      animate={{ width: selectedProject.status.replace('%', '') + '%' }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    ></motion.div>
                  </div>
                  <div className="text-right mt-1 text-gray-400 text-sm">
                    {selectedProject.status}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-2">Collectible Items</h3>
                  <div className="flex space-x-3">
                    {Array.from({ length: selectedProject.collectibles }).map((_, i) => (
                      <motion.button
                        key={i}
                        className={`w-12 h-12 rounded-md flex items-center justify-center ${
                          i < selectedProject.collected 
                            ? 'bg-indigo-500/20 text-yellow-400' 
                            : 'bg-gray-800 text-gray-500'
                        }`}
                        whileHover={{ 
                          scale: i === selectedProject.collected ? 1.1 : 1,
                          y: i === selectedProject.collected ? -5 : 0 
                        }}
                        whileTap={{ 
                          scale: i === selectedProject.collected ? 0.9 : 1 
                        }}
                        onClick={() => {
                          if (i === selectedProject.collected) {
                            collectItem(selectedProject.id);
                          }
                        }}
                        disabled={i !== selectedProject.collected}
                      >
                        <span className="text-2xl">
                          {i < selectedProject.collected ? '⭐' : '☆'}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                  <p className="mt-2 text-sm text-gray-400">
                    Collected {selectedProject.collected} of {selectedProject.collectibles} stars
                  </p>
                </div>
                
                <div className="flex justify-between pt-4 border-t border-gray-800">
                  <InteractiveButtons.OutlineButton 
                    label="Close" 
                    onClick={() => setSelectedProject(null)}
                  />
                  <InteractiveButtons.GlowButton 
                    label="View Project" 
                    iconAfter="→" 
                    color="indigo"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GameProjects;