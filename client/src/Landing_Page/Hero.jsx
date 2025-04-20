import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import { TypeAnimation } from 'react-type-animation'; // Install this package

// Example of how to reference it in your code
const backgroundImage = "url('/assets/grid-pattern.svg')";

const Hero = () => {
  // Particle initialization
  const particlesInit = async (engine) => {
    try {
      await loadFull(engine);
    } catch (error) {
      console.error("Failed to initialize particles:", error);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.6, 0.05, -0.01, 0.9] }
    }
  };

  const codeBlockVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, delay: 0.6 }
    }
  };

  // Floating animation
  const floatingAnimation = {
    y: [0, -15, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  };

  // Mouse follower effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  
  // Track cursor position
  useEffect(() => {
    function updateMousePosition(e) {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    }
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, [mouseX, mouseY]);

  // Calculate glow position
  const glowX = useTransform(smoothX, (latest) => {
    return latest - 200;
  });
  const glowY = useTransform(smoothY, (latest) => {
    return latest - 200;
  });

  // Cursor-triggered animation for code editor
  const [codeHovered, setCodeHovered] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-900 text-white">
      {/* Cursor follower effect */}
      <motion.div 
        className="fixed w-[400px] h-[400px] rounded-full bg-purple-600/20 pointer-events-none blur-[80px] z-0"
        style={{
          x: glowX,
          y: glowY,
        }}
      />
      
      {/* Particle background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 60,
          particles: {
            color: {
              value: "#6366f1",
            },
            links: {
              color: "#8b5cf6",
              distance: 150,
              enable: true,
              opacity: 0.2,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 0.8,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.3,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 3 },
            },
          },
          detectRetina: true,
        }}
        className="absolute inset-0 z-0"
      />

      {/* Background gradient circles with motion */}
      <motion.div 
        className="absolute top-[20%] right-[10%] w-[30rem] h-[30rem] bg-purple-900/20 rounded-full blur-[8rem]"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      />
      <motion.div 
        className="absolute bottom-[10%] left-[10%] w-[25rem] h-[25rem] bg-indigo-900/30 rounded-full blur-[8rem]"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.25, 0.2] 
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1
        }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0" style={{ backgroundImage, backgroundSize: '50px 50px', opacity: 0.05 }}></div>

      {/* Content */}
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 z-10 flex flex-col md:flex-row items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="w-full md:w-1/2 text-center md:text-left md:pr-8">
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-indigo-900/50 text-indigo-300 mb-6">
              <span className="w-2 h-2 bg-indigo-400 rounded-full mr-2"></span>
              Join the coding revolution
            </span>
          </motion.div>

          <motion.h1 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4"
            variants={itemVariants}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-500">
              Where Ideas <br /> Become 
            </span>
            <TypeAnimation
              sequence={[
                'Code.',
                2000,
                'Reality.',
                2000,
                'Innovation.',
                2000,
                'The Future.',
                2000
              ]}
              wrapper="span"
              cursor={true}
              repeat={Infinity}
              className="text-white ml-2"
            />
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg mx-auto md:mx-0"
            variants={itemVariants}
          >
            Join our community of passionate developers, designers, and innovators to build the future together.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4"
            variants={itemVariants}
          >
            <motion.button
              className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium w-full sm:w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Join Community
            </motion.button>
            
            <motion.button
              className="px-6 py-3 rounded-full border border-gray-600 text-gray-300 font-medium flex items-center justify-center w-full sm:w-auto group"
              whileHover={{ scale: 1.05, borderColor: "#8B5CF6" }}
              whileTap={{ scale: 0.95 }}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 mr-2 group-hover:text-purple-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Watch Demo
            </motion.button>
          </motion.div>
        </div>

        <div className="w-full md:w-1/2 mt-12 md:mt-0">
          <motion.div
            className="relative mx-auto max-w-md"
            variants={codeBlockVariants}
            animate={floatingAnimation}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.3 }
            }}
            onHoverStart={() => setCodeHovered(true)}
            onHoverEnd={() => setCodeHovered(false)}
            style={{
              transformStyle: "preserve-3d",
              perspective: "1000px",
            }}
          >
            {/* 3D tilt effect for code editor */}
            <motion.div 
              className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-700"
              animate={{
                rotateX: codeHovered ? -5 : 0,
                rotateY: codeHovered ? 5 : 0,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Stylized code editor */}
              <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-700">
                {/* Code editor header */}
                <div className="bg-gray-900 px-4 py-2 flex items-center">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="ml-4 text-gray-400 text-xs">code_community.js</span>
                </div>
                
                {/* Code editor content */}
                <div className="p-4 font-mono text-sm">
                  <div className="flex">
                    <span className="text-gray-500 mr-4 select-none">1</span>
                    <span className="text-blue-400">import</span>
                    <span className="text-white"> &#123; </span>
                    <span className="text-yellow-300">Community</span>
                    <span className="text-white"> &#125; </span>
                    <span className="text-blue-400">from</span>
                    <span className="text-green-400"> 'college-tech'</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-500 mr-4 select-none">2</span>
                    <span className="text-white"></span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-500 mr-4 select-none">3</span>
                    <span className="text-blue-400">const</span>
                    <span className="text-yellow-300"> developer </span>
                    <span className="text-white">= </span>
                    <span className="text-blue-400">new</span>
                    <span className="text-yellow-300"> Community.Member</span>
                    <span className="text-white">()</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-500 mr-4 select-none">4</span>
                    <span className="text-white"></span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-500 mr-4 select-none">5</span>
                    <span className="text-yellow-300">developer</span>
                    <span className="text-white">.</span>
                    <span className="text-purple-400">learn</span>
                    <span className="text-white">().then(</span>
                    <span className="text-orange-300">() =&gt; </span>
                    <span className="text-white">&#123;</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-500 mr-4 select-none">6</span>
                    <span className="text-white">  </span>
                    <span className="text-purple-400">build</span>
                    <span className="text-white">(</span>
                    <span className="text-green-400">'awesome-projects'</span>
                    <span className="text-white">)</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-500 mr-4 select-none">7</span>
                    <span className="text-white">&#125;)</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-500 mr-4 select-none">8</span>
                    <span className="text-white"></span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-500 mr-4 select-none">9</span>
                    <span className="text-yellow-300">Community</span>
                    <span className="text-white">.</span>
                    <span className="text-purple-400">join</span>
                    <span className="text-white">(</span>
                    <span className="text-green-400">'You'</span>
                    <span className="text-white">)</span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Enhanced glow effect */}
            <motion.div 
              className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl blur opacity-30"
              animate={{ 
                opacity: codeHovered ? 0.7 : 0.3,
                scale: codeHovered ? 1.05 : 1
              }}
              transition={{ duration: 0.4 }}
            />
          </motion.div>
        </div>
      </motion.div>
      
      {/* Scroll indicator with animation */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <span className="text-gray-400 text-sm mb-2">Scroll to explore</span>
        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </motion.div>
    </section>
  );
};

export default Hero;