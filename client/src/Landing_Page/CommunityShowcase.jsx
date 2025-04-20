import React from 'react';
import { motion } from 'framer-motion';

const CommunityShowcase = () => {
  const members = [
    {
      name: "Alex Johnson",
      role: "Web Developer",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      quote: "This community has helped me grow my skills exponentially!"
    },
    {
      name: "Sophia Chen",
      role: "ML Engineer",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      quote: "I found my passion for AI in this amazing coding community."
    },
    {
      name: "Marcus Williams",
      role: "UI/UX Designer",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      quote: "The collaborative projects here helped build my portfolio!"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const statsVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 0.3
      }
    }
  };

  // Stats counter animation
  const counterAnimation = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2 
      } 
    }
  };

  const numberVariant = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 2,
      }
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-3 py-1 text-sm font-semibold bg-indigo-900/50 text-indigo-300 rounded-full mb-4">
            Our Community
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Meet Fellow Coders</h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Join a diverse community of passionate developers, designers, and tech enthusiasts.
            Learn from each other and grow together.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {members.map((member, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 group hover:border-indigo-500 transition-all duration-300"
            >
              <div className="aspect-w-3 aspect-h-4 relative">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="object-cover w-full h-48 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-gray-300 text-sm">{member.role}</p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-400 italic">"{member.quote}"</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          variants={counterAnimation}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={statsVariants} className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">
            <motion.h3 
              className="text-4xl font-bold text-purple-400 mb-2"
              variants={numberVariant}
            >
              500+
            </motion.h3>
            <p className="text-gray-300">Community Members</p>
          </motion.div>
          
          <motion.div variants={statsVariants} className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">
            <motion.h3 
              className="text-4xl font-bold text-blue-400 mb-2"
              variants={numberVariant}
            >
              50+
            </motion.h3>
            <p className="text-gray-300">Completed Projects</p>
          </motion.div>
          
          <motion.div variants={statsVariants} className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">
            <motion.h3 
              className="text-4xl font-bold text-teal-400 mb-2"
              variants={numberVariant}
            >
              30+
            </motion.h3>
            <p className="text-gray-300">Tech Workshops</p>
          </motion.div>
          
          <motion.div variants={statsVariants} className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">
            <motion.h3 
              className="text-4xl font-bold text-pink-400 mb-2"
              variants={numberVariant}
            >
              15+
            </motion.h3>
            <p className="text-gray-300">Hackathon Wins</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunityShowcase;