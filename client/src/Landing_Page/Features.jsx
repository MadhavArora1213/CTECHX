import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Features = () => {
  const [expandedFeature, setExpandedFeature] = useState(null);
  const [activeIcon, setActiveIcon] = useState(null);

  const features = [
    {
      title: "Collaborative Learning",
      description: "Join peer-to-peer learning sessions and grow together in a supportive environment.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: "from-green-600 to-teal-600"
    },
    {
      title: "Hands-on Projects",
      description: "Apply your skills to real-world projects and build an impressive portfolio.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      color: "from-purple-600 to-indigo-600"
    },
    {
      title: "Tech Workshops",
      description: "Regular workshops on cutting-edge technologies led by industry professionals.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      color: "from-pink-600 to-rose-600"
    },
    {
      title: "Coding Competitions",
      description: "Regular hackathons and coding challenges to test your skills and win prizes.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      color: "from-yellow-500 to-amber-600"
    },
    {
      title: "Networking Events",
      description: "Connect with industry professionals, alumni, and fellow tech enthusiasts.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      ),
      color: "from-blue-600 to-cyan-600"
    },
    {
      title: "Mentorship Program",
      description: "Get guidance from seniors and industry experts to accelerate your growth.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      color: "from-orange-500 to-red-600"
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  const FeatureCard = ({ feature, index }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const [cardRef, inView] = useInView({
      triggerOnce: true,
      threshold: 0.1
    });

    function handleMouseMove(event) {
      const card = event.currentTarget;
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const rotateX = (event.clientY - centerY) / 20;
      const rotateY = (centerX - event.clientX) / 20;

      x.set(rotateY);
      y.set(rotateX);
    }

    function handleMouseLeave() {
      x.set(0);
      y.set(0);
    }

    const isExpanded = expandedFeature === index;

    return (
      <motion.div 
        ref={cardRef}
        className={`group bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 transition-all duration-300 ${
          isExpanded ? 'border-indigo-500 shadow-lg shadow-indigo-900/20' : 'hover:border-gray-500'
        }`}
        style={{
          transformStyle: "preserve-3d",
        }}
        variants={itemVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        whileHover={{ y: -5, transition: { duration: 0.3 } }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setExpandedFeature(isExpanded ? null : index)}
        layoutId={`feature-card-${index}`}
      >
        <motion.div
          style={{
            rotateX: y,
            rotateY: x,
            transformStyle: "preserve-3d",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <motion.div 
            className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${feature.color} mb-4 relative`}
            whileHover={{ scale: 1.1 }}
            onHoverStart={() => setActiveIcon(index)}
            onHoverEnd={() => setActiveIcon(null)}
          >
            <motion.div 
              className="text-white"
              animate={{ 
                rotate: activeIcon === index ? 360 : 0 
              }}
              transition={{ duration: 0.5 }}
            >
              {feature.icon}
            </motion.div>
          </motion.div>
          
          <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
          
          <AnimatePresence>
            {isExpanded ? (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-gray-400 mb-4">{feature.description}</p>
                <div className="flex items-center text-indigo-400 text-sm font-medium">
                  <span>Learn more</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </motion.div>
            ) : (
              <motion.p 
                className="text-gray-400"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {feature.description}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <section id="features" className="py-16 md:py-24 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-3 py-1 text-sm font-semibold bg-indigo-900/50 text-indigo-300 rounded-full mb-4">
            Community Benefits
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need to Grow</h2>
          <p className="text-gray-400 text-lg">
            Our community offers a complete ecosystem for budding developers to learn, 
            build, and grow in a supportive environment.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <FeatureCard 
              key={index} 
              feature={feature} 
              index={index} 
            />
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <a href="#" className="inline-block px-6 py-3 rounded-full border border-gray-600 text-gray-300 hover:text-white hover:border-purple-500 transition-colors duration-300">
            See All Features
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;