import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ProjectsGallery = () => {
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const galleryRef = useRef(null);
  const isInView = useInView(galleryRef, { once: true, amount: 0.2 });

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web Apps' },
    { id: 'mobile', label: 'Mobile Apps' },
    { id: 'ai', label: 'AI/ML' },
    { id: 'game', label: 'Game Dev' }
  ];
  
  const projects = [
    {
      id: 1,
      title: "Campus Connect",
      description: "Social platform for college students to connect and collaborate on projects, share resources, and build a professional network within the campus community.",
      image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      category: "web",
      tech: ["React", "Node.js", "MongoDB"],
      creator: "Alex Johnson",
      year: 2024
    },
    {
      id: 2,
      title: "StudyBuddy",
      description: "Mobile app for finding study partners and tracking progress with smart study plans and shared resources to improve academic performance.",
      image: "https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      category: "mobile",
      tech: ["Flutter", "Firebase"],
      creator: "Sophia Chen",
      year: 2024
    },
    {
      id: 3,
      title: "Course Recommender",
      description: "AI-powered system that suggests courses based on your interests, academic history, and career goals with personalized learning paths.",
      image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      category: "ai",
      tech: ["Python", "TensorFlow", "Flask"],
      creator: "Marcus Williams",
      year: 2023
    },
    {
      id: 4,
      title: "Escape Campus",
      description: "An immersive puzzle game set in a virtual university where players solve academic challenges and explore a dynamic campus environment.",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      category: "game",
      tech: ["Unity", "C#"],
      creator: "Elena Rodriguez",
      year: 2023
    },
    {
      id: 5,
      title: "Resource Tracker",
      description: "Web dashboard for tracking and sharing learning resources with analytics to monitor progress and collaborative features.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      category: "web",
      tech: ["Vue.js", "Express", "PostgreSQL"],
      creator: "James Wilson",
      year: 2024
    },
    {
      id: 6,
      title: "CodeQuest",
      description: "Mobile game that teaches coding concepts through fun challenges and interactive puzzles for beginners and advanced coders.",
      image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      category: "mobile",
      tech: ["React Native", "Redux"],
      creator: "Nadia Ahmed",
      year: 2023
    }
  ];
  
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    // Restore body scrolling
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="projects" ref={galleryRef} className="py-16 md:py-24 bg-gradient-to-b from-gray-900 to-gray-800 projects-gallery" data-jsx="true">
      <style dangerouslySetInnerHTML={{
        __html: `
          /* Your CSS styles here */
          .projects-gallery {
            /* styles */
          }
        `
      }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-3 py-1 text-sm font-semibold bg-indigo-900/50 text-indigo-300 rounded-full mb-4">
            Project Showcase
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Student-Built Projects</h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Check out some of the amazing projects created by our community members,
            showcasing their skills and creativity.
          </p>
        </motion.div>
        
        {/* Filter Tabs with Animated Indicator */}
        <div className="mb-12 overflow-x-auto hide-scrollbar">
          <motion.div 
            className="flex justify-center gap-3 pb-1 min-w-max mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative flex bg-gray-800/70 p-1 rounded-full">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setFilter(category.id)}
                  className={`relative z-10 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    filter === category.id 
                      ? 'text-white' 
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category.label}
                </motion.button>
              ))}
              
              {/* Animated background for selected tab */}
              {categories.map((category) => (
                filter === category.id && (
                  <motion.div
                    key={`bg-${category.id}`}
                    className="absolute inset-0 z-0 bg-indigo-600 rounded-full"
                    layoutId="filterBackground"
                    initial={false}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    style={{
                      width: `${100 / categories.length}%`,
                      left: `${categories.findIndex(cat => cat.id === category.id) * (100 / categories.length)}%`
                    }}
                  />
                )
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Projects Grid with Staggered Animation */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                className="group relative rounded-xl overflow-hidden cursor-pointer"
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
                onClick={() => handleProjectClick(project)}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
              >
                {/* Project Image with Hover Effect */}
                <div className="relative h-64 overflow-hidden">
                  <motion.img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent opacity-70"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-2 py-1 bg-indigo-900/80 backdrop-blur-sm text-indigo-200 text-xs font-semibold rounded-full">
                      {categories.find(cat => cat.id === project.category).label}
                    </span>
                  </div>
                </div>
                
                {/* Project Info */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 text-sm line-clamp-2 mb-4">
                    {project.description.substring(0, 80)}...
                  </p>
                  
                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-gray-800/80 backdrop-blur-sm text-xs text-gray-300 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  {/* View Project Button - Only visible on hover */}
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 bg-indigo-600 py-3 text-center translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                    initial={{ y: "100%" }}
                  >
                    <span className="font-medium text-white text-sm flex items-center justify-center">
                      View Project
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <svg className="w-16 h-16 mx-auto text-gray-600 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl text-gray-300 mb-2">No projects found</h3>
            <p className="text-gray-500">Try changing your filter or check back later</p>
          </motion.div>
        )}
        
        {/* Submit Project Button */}
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.button
            className="px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-lg shadow-indigo-600/20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Submit Your Project
          </motion.button>
          <motion.p
            className="mt-4 text-gray-400 text-sm"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Have a cool project? Share it with the community!
          </motion.p>
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeProjectModal}
          >
            <motion.div 
              className="bg-gray-800 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header/Image */}
              <div className="relative h-64 md:h-80">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
                
                {/* Close button */}
                <button 
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-900/60 backdrop-blur-sm flex items-center justify-center text-gray-300 hover:text-white"
                  onClick={closeProjectModal}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-indigo-900/80 backdrop-blur-sm text-indigo-200 text-sm font-semibold rounded-full">
                    {categories.find(cat => cat.id === selectedProject.category).label}
                  </span>
                </div>
              </div>
              
              {/* Modal Content */}
              <div className="p-6">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{selectedProject.title}</h2>
                
                <div className="flex items-center text-gray-400 text-sm mb-4">
                  <span>By {selectedProject.creator} • {selectedProject.year}</span>
                </div>
                
                <p className="text-gray-300 mb-6">
                  {selectedProject.description}
                </p>
                
                <h3 className="text-lg font-semibold text-white mb-3">Technologies Used</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.tech.map((tech, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-gray-700 text-sm text-gray-200 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <button className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-medium flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Visit Project
                  </button>
                  <button className="flex-1 px-4 py-2 border border-gray-600 rounded-lg text-gray-300 font-medium flex items-center justify-center hover:bg-gray-700">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                    </svg>
                    GitHub Repo
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default ProjectsGallery;