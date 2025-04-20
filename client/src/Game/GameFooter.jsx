import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GameFooter = () => {
  const [hoverLink, setHoverLink] = useState(null);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  
  const currentYear = new Date().getFullYear();

  // Secret code activation
  const handleLogoClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    
    if (newCount >= 5) {
      setShowEasterEgg(true);
      setTimeout(() => setShowEasterEgg(false), 5000);
      setClickCount(0);
    }
  };

  // Footer link sections
  const footerSections = [
    {
      title: "Resources",
      links: [
        { name: "Documentation", url: "/docs", icon: "📚" },
        { name: "Tutorials", url: "/learn", icon: "🧠" },
        { name: "API Reference", url: "/api", icon: "⚙️" },
        { name: "Community Forum", url: "/forum", icon: "💬" },
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", url: "/about", icon: "🏢" },
        { name: "Careers", url: "/careers", icon: "💼" },
        { name: "Blog", url: "/blog", icon: "📝" },
        { name: "Contact", url: "/contact", icon: "✉️" },
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Terms", url: "/terms", icon: "📄" },
        { name: "Privacy", url: "/privacy", icon: "🔒" },
        { name: "Cookies", url: "/cookies", icon: "🍪" },
      ]
    }
  ];

  // Social media links
  const socialLinks = [
    { name: "Twitter", icon: "twitter", url: "https://twitter.com" },
    { name: "GitHub", icon: "github", url: "https://github.com" },
    { name: "Discord", icon: "discord", url: "https://discord.com" },
    { name: "YouTube", icon: "youtube", url: "https://youtube.com" },
  ];

  // Render social media icons
  const renderSocialIcon = (icon) => {
    switch (icon) {
      case 'twitter':
        return (
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
          </svg>
        );
      case 'github':
        return (
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
        );
      case 'discord':
        return (
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
          </svg>
        );
      case 'youtube':
        return (
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <footer className="relative py-16 bg-black z-10 overflow-hidden border-t border-indigo-900/30">
      {/* Background gaming grid */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-black/80" />
        
        {/* Horizontal lines */}
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`h-line-${i}`}
            className="absolute h-px bg-indigo-900/20 left-0 right-0"
            style={{ top: `${(i + 1) * 20}%` }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              boxShadow: [
                '0 0 0px rgba(79, 70, 229, 0)',
                '0 0 4px rgba(79, 70, 229, 0.3)',
                '0 0 0px rgba(79, 70, 229, 0)'
              ]
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
        
        {/* Vertical lines */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={`v-line-${i}`}
            className="absolute w-px bg-indigo-900/20 top-0 bottom-0"
            style={{ left: `${(i + 1) * 14}%` }}
            animate={{
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
        
        {/* Easter egg effect */}
        <AnimatePresence>
          {showEasterEgg && (
            <motion.div 
              className="absolute inset-0 z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Matrix-style raining code effect */}
              <div className="absolute inset-0 overflow-hidden">
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={`code-${i}`}
                    className="absolute top-0 text-green-500 font-mono text-sm whitespace-nowrap"
                    style={{ 
                      left: `${(i * 5) + Math.random() * 5}%`,
                      opacity: Math.random() * 0.8 + 0.2
                    }}
                    initial={{ y: -100 }}
                    animate={{ 
                      y: ['100vh']
                    }}
                    transition={{
                      duration: 3 + Math.random() * 5,
                      repeat: Infinity,
                      repeatType: "loop"
                    }}
                  >
                    {'010110101010010101001010'.split('').map((char, j) => (
                      <motion.span 
                        key={j}
                        animate={{
                          opacity: [0.4, 1, 0.4]
                        }}
                        transition={{
                          duration: 0.5,
                          repeat: Infinity,
                          delay: j * 0.1
                        }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/80 p-6 rounded-xl border border-green-500 text-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                <motion.div 
                  className="text-4xl mb-2"
                  animate={{ rotateY: 360 }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  👾
                </motion.div>
                <h3 className="text-green-400 text-xl font-bold mb-2">You found a secret!</h3>
                <p className="text-green-200 text-sm mb-2">Developer mode activated</p>
                <div className="font-mono text-xs text-green-400 mt-2">CONSOLE_ACCESS=TRUE</div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 mb-6 md:mb-0">
            {/* Interactive game logo */}
            <motion.div 
              className="inline-block cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogoClick}
            >
              <div className="flex items-center">
                <motion.div 
                  className="w-10 h-10 mr-3 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-lg flex items-center justify-center relative overflow-hidden"
                  animate={{
                    rotate: [0, 0, 180, 180, 0],
                    borderRadius: ["20%", "50%", "50%", "20%", "20%"],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                >
                  <span className="text-white text-lg font-bold">CX</span>
                  
                  {/* Bottom light trace */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatDelay: 1
                    }}
                  />
                </motion.div>
                
                <div className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-400">
                  CTECHX
                </div>
              </div>
              
              <p className="mt-3 text-gray-400 text-sm max-w-xs">
                Join a community of tech innovators who are leveling up their skills through collaborative projects and mentorship.
              </p>
              
              <div className="text-xs mt-3 text-gray-500 font-mono flex items-center">
                <motion.span 
                  className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                server_status: online
              </div>
            </motion.div>
          </div>

          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-white font-bold mb-4 text-lg">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={linkIndex}
                    onHoverStart={() => setHoverLink(`${section.title}-${linkIndex}`)}
                    onHoverEnd={() => setHoverLink(null)}
                  >
                    <a 
                      href={link.url} 
                      className="text-gray-400 hover:text-indigo-400 transition-colors duration-200 flex items-center"
                    >
                      <span className="mr-2">{link.icon}</span>
                      {link.name}
                      
                      {/* Hover indicator */}
                      {hoverLink === `${section.title}-${linkIndex}` && (
                        <motion.span
                          layoutId="hoverIndicator"
                          className="ml-2 w-1 h-1 bg-indigo-500 rounded-full"
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="pt-8 mt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between">
          <div className="text-gray-500 text-sm mb-4 md:mb-0">
            © {currentYear} CTECHX. All rights reserved. <span className="text-xs">v1.4.2</span>
          </div>
          
          <div className="flex space-x-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-indigo-600 transition-colors"
                whileHover={{ 
                  scale: 1.2,
                  transition: { type: "spring", stiffness: 400, damping: 10 }
                }}
                whileTap={{ scale: 0.9 }}
              >
                {renderSocialIcon(social.icon)}
              </motion.a>
            ))}
          </div>
        </div>
        
        {/* Circuit board effect bottom accent */}
        <div className="absolute bottom-0 left-0 w-full h-px">
          <motion.div
            className="absolute left-0 w-20 h-px bg-gradient-to-r from-indigo-800 to-transparent"
            animate={{ x: ['0%', '500%'] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>
    </footer>
  );
};

export default GameFooter;