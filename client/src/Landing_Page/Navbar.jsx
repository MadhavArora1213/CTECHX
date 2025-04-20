import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [hoverLink, setHoverLink] = useState(null);
  const navRef = useRef(null);
  const navigate = useNavigate();

  // Add scroll progress tracking
  const { scrollYProgress } = useScroll();
  const navBackground = useTransform(
    scrollYProgress,
    [0, 0.2],
    ["rgba(17, 24, 39, 0)", "rgba(17, 24, 39, 0.85)"]
  );
  const navBlur = useTransform(
    scrollYProgress,
    [0, 0.2],
    ["blur(0px)", "blur(10px)"]
  );

  // Progress bar for scroll
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Track active section based on scroll position
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const checkActiveSection = () => {
      const scrollY = window.scrollY;
      sections.forEach(section => {
        const sectionId = section.getAttribute('id');
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        
        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
      
      // Set scrolled state for navbar styling
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', checkActiveSection);
    return () => window.removeEventListener('scroll', checkActiveSection);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Features', href: '#features' },
    { name: 'Events', href: '#events' },
    { name: 'Projects', href: '#projects' },
    { name: 'Community', href: '#community' },
    { name: 'Resources', href: '#resources' }
  ];

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
        duration: 0.5
      }
    }
  };

  const linkVariants = {
    hover: {
      scale: 1.1,
      color: "#8B5CF6",
      transition: { duration: 0.2 }
    }
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.3 }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.nav
      ref={navRef}
      style={{ 
        backgroundColor: navBackground,
        backdropFilter: navBlur
      }}
      className="fixed w-full z-50 transition-all duration-300"
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <motion.div
              className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-indigo-500 text-transparent bg-clip-text"
              whileHover={{ scale: 1.05 }}
            >
              CodeCommunity
            </motion.div>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => {
                const isActive = activeSection === item.name.toLowerCase();
                return (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className={`font-medium relative ${
                      isActive ? 'text-white' : 'text-gray-300 hover:text-white'
                    }`}
                    onMouseEnter={() => setHoverLink(item.name)}
                    onMouseLeave={() => setHoverLink(null)}
                    variants={linkVariants}
                    whileHover="hover"
                  >
                    {item.name}
                    {isActive && (
                      <motion.div
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-indigo-500"
                        layoutId="activeIndicator"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                    {hoverLink === item.name && !isActive && (
                      <motion.div
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gray-500"
                        layoutId="hoverIndicator"
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 0.5, width: '100%' }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </motion.a>
                );
              })}
              <motion.button
                className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/login')}
              >
                Join Us
              </motion.button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-300 p-2"
              whileTap={{ scale: 0.9 }}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden overflow-hidden bg-gray-900/90 backdrop-blur-md"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => {
                const isActive = activeSection === item.name.toLowerCase();
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`block px-3 py-2 text-base font-medium ${
                      isActive
                        ? "bg-indigo-600/20 text-white"
                        : "text-gray-300 hover:text-white hover:bg-gray-800"
                    } rounded-md relative`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.name}
                    {isActive && (
                      <motion.div
                        className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500"
                        layoutId="mobileActiveIndicator"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      />
                    )}
                  </a>
                );
              })}
              <button className="block w-full text-left px-3 py-2 text-base font-medium bg-gradient-to-r from-purple-600 to-indigo-600 rounded-md text-white">
                Join Us
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll Progress Indicator */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500"
        style={{ scaleX, transformOrigin: "0%" }}
      />
    </motion.nav>
  );
};

export default Navbar;