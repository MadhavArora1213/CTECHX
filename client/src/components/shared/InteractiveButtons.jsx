import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gameSoundEffects } from './GameAssets';

// Button types with different styles and behaviors
export const PrimaryButton = ({ children, onClick, icon, disabled, className, soundEffect = true }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  
  const handleClick = () => {
    if (disabled) return;
    setIsClicking(true);
    
    // Play sound effect if enabled
    if (soundEffect) {
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568.wav');
      audio.volume = 0.4;
      audio.play().catch(e => console.log("Audio play failed:", e));
    }
    
    setTimeout(() => {
      setIsClicking(false);
      if (onClick) onClick();
    }, 150);
  };

  return (
    <motion.button
      disabled={disabled}
      className={`relative px-6 py-3 rounded-lg font-bold text-white shadow-lg overflow-hidden ${disabled ? 'opacity-60 cursor-not-allowed' : ''} ${className || ''}`}
      style={{ 
        background: 'linear-gradient(135deg, #4F46E5, #7E22CE)',
      }}
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      onHoverStart={() => !disabled && setIsHovering(true)}
      onHoverEnd={() => !disabled && setIsHovering(false)}
      onClick={handleClick}
    >
      {/* Button glow effect */}
      <motion.div 
        className="absolute inset-0 opacity-0"
        animate={{ 
          opacity: isHovering ? 0.5 : 0,
          boxShadow: isHovering ? '0 0 15px 5px rgba(99, 102, 241, 0.7)' : '0 0 0px 0px rgba(99, 102, 241, 0)'
        }}
      />
      
      {/* Button shine effect when clicked */}
      {isClicking && (
        <motion.div 
          className="absolute inset-0 bg-white"
          initial={{ opacity: 0.5, scale: 0 }}
          animate={{ opacity: 0, scale: 2 }}
          transition={{ duration: 0.5 }}
        />
      )}
      
      {/* Button border animation */}
      <div className="absolute inset-0 rounded-lg overflow-hidden">
        {isHovering && (
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent)',
              transform: 'translateX(-100%)'
            }}
            animate={{ 
              x: ['120%', '-120%']
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut"
            }}
          />
        )}
      </div>
      
      {/* Button content with optional icon */}
      <div className="relative flex items-center justify-center gap-2">
        {icon && (
          <img 
            src={icon} 
            alt=""
            className="w-5 h-5 object-contain"
          />
        )}
        {children}
      </div>
    </motion.button>
  );
};

export const SecondaryButton = ({ children, onClick, icon, disabled, className }) => {
  return (
    <motion.button
      disabled={disabled}
      className={`relative px-6 py-3 rounded-lg font-bold text-indigo-300 border border-indigo-500/30 bg-indigo-900/20 backdrop-blur-sm shadow-lg hover:border-indigo-400 hover:text-indigo-200 ${disabled ? 'opacity-60 cursor-not-allowed' : ''} ${className || ''}`}
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      onClick={disabled ? undefined : onClick}
    >
      <div className="flex items-center justify-center gap-2">
        {icon && (
          <img 
            src={icon} 
            alt=""
            className="w-5 h-5 object-contain"
          />
        )}
        {children}
      </div>
    </motion.button>
  );
};

export const IconButton = ({ icon, onClick, tooltip, className, disabled, size = "md" }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12"
  };

  return (
    <motion.button
      disabled={disabled}
      className={`relative ${sizeClasses[size]} flex items-center justify-center rounded-full bg-indigo-900/40 border border-indigo-500/30 text-indigo-300 backdrop-blur-sm ${disabled ? 'opacity-60 cursor-not-allowed' : 'hover:bg-indigo-800/40 hover:text-indigo-100'} ${className || ''}`}
      whileHover={{ scale: disabled ? 1 : 1.1 }}
      whileTap={{ scale: disabled ? 1 : 0.9 }}
      onClick={disabled ? undefined : onClick}
      onHoverStart={() => setShowTooltip(true)}
      onHoverEnd={() => setShowTooltip(false)}
    >
      <img 
        src={icon} 
        alt={tooltip || ""}
        className="w-1/2 h-1/2 object-contain"
      />
      
      {/* Tooltip */}
      {tooltip && showTooltip && (
        <motion.div
          className="absolute top-full mt-2 px-3 py-1 bg-gray-900/90 text-white text-xs rounded whitespace-nowrap z-50"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
        >
          {tooltip}
        </motion.div>
      )}
    </motion.button>
  );
};

export const CollectibleButton = ({ skill, onCollect, collected, className }) => {
  const [isCollecting, setIsCollecting] = useState(false);
  const [particles, setParticles] = useState([]);
  
  const handleClick = () => {
    if (collected || isCollecting) return;
    
    setIsCollecting(true);
    
    // Generate particles
    const newParticles = Array.from({ length: 8 }).map((_, i) => ({
      id: `particle-${Date.now()}-${i}`,
      angle: (Math.random() * 360)
    }));
    
    setParticles(newParticles);
    
    // Play sound effect
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2017/2017.wav');
    audio.volume = 0.3;
    audio.play().catch(e => console.log("Audio play failed:", e));
    
    setTimeout(() => {
      setIsCollecting(false);
      setParticles([]);
      if (onCollect) onCollect(skill);
    }, 1000);
  };

  return (
    <motion.div
      className={`relative ${className || ''}`}
      whileHover={{ scale: collected || isCollecting ? 1 : 1.05 }}
    >
      <motion.button
        className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl flex items-center justify-center relative overflow-hidden ${
          collected ? 'bg-gray-800/50' : 'cursor-pointer'
        }`}
        style={{ 
          background: collected ? 
            'linear-gradient(135deg, #1F2937, #111827)' : 
            `linear-gradient(135deg, ${skill.color}80, ${skill.color}40)`,
          boxShadow: collected ? 'none' : `0 0 15px ${skill.color}40`
        }}
        onClick={handleClick}
        whileTap={collected || isCollecting ? {} : { scale: 0.95 }}
        animate={isCollecting ? { 
          scale: [1, 1.2, 1],
          rotate: [0, 10, -10, 0],
          boxShadow: [
            `0 0 15px ${skill.color}40`,
            `0 0 30px ${skill.color}80`,
            `0 0 15px ${skill.color}40`
          ]
        } : {}}
        transition={{ duration: 0.5 }}
      >
        {/* Skill icon */}
        <motion.div
          animate={collected ? { scale: 0.8, opacity: 0.5 } : { scale: 1, opacity: 1 }}
        >
          <img 
            src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.id}/${skill.id}-original.svg`} 
            alt={skill.name}
            className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://img.icons8.com/color/48/000000/${skill.id.toLowerCase()}.png`;
            }}
          />
        </motion.div>
        
        {/* Collection overlay */}
        {collected && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/8832/8832119.png" 
              alt="Collected" 
              className="w-8 h-8 opacity-80"
            />
          </div>
        )}
      </motion.button>
      
      {/* Skill name */}
      <div className="text-center mt-2 text-sm font-medium text-indigo-200">
        {skill.name}
      </div>
      
      {/* Collection particles */}
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full bg-white"
          style={{ top: '50%', left: '50%' }}
          initial={{ x: 0, y: 0 }}
          animate={{
            x: Math.cos(particle.angle) * 100,
            y: Math.sin(particle.angle) * 100,
            opacity: [1, 0],
            scale: [1, 0]
          }}
          transition={{ duration: 0.8 }}
        />
      ))}
    </motion.div>
  );
};

// Achievement badge button
export const AchievementBadge = ({ achievement, unlocked, onClick, className }) => {
  return (
    <motion.div
      className={`relative ${className || ''}`}
      whileHover={{ scale: 1.05 }}
      onClick={onClick}
    >
      <div className={`w-20 h-20 rounded-full flex items-center justify-center relative ${
        unlocked ? 'cursor-pointer' : 'opacity-40 grayscale'
      }`}>
        {/* Badge background */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-900 to-purple-900 border-4 border-indigo-700/30"></div>
        
        {/* Badge icon */}
        <div className="relative z-10 text-3xl">
          <img 
            src={`https://img.icons8.com/fluency/96/${achievement.id.includes('explorer') ? '000000/treasure-chest.png' : 
                 achievement.id.includes('collector') ? '000000/prize.png' :
                 achievement.id.includes('social') ? '000000/handshake.png' :
                 '000000/hammer.png'}`}
            alt={achievement.name}
            className="w-10 h-10 object-contain"
          />
        </div>
        
        {/* Unlocked indicator */}
        {unlocked && (
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-indigo-900 flex items-center justify-center">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/4315/4315445.png"
              alt="Unlocked"
              className="w-3 h-3"
            />
          </div>
        )}
      </div>
      
      {/* Achievement name */}
      <div className="text-center mt-2 text-xs font-medium text-indigo-200 max-w-[80px] mx-auto">
        {achievement.name}
      </div>
    </motion.div>
  );
};

export const PlayButton = ({ onClick, label, className }) => {
  return (
    <motion.button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold flex items-center ${className || ''}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="mr-2">▶</span>
      {label}
    </motion.button>
  );
};

export const BasicButton = ({ label, iconBefore, iconAfter, color = "blue", fullWidth, onClick, disabled }) => {
  const colorClasses = {
    blue: "bg-blue-600 hover:bg-blue-700",
    indigo: "bg-indigo-600 hover:bg-indigo-700",
    green: "bg-green-600 hover:bg-green-700",
    red: "bg-red-600 hover:bg-red-700",
    purple: "bg-purple-600 hover:bg-purple-700"
  };
  
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-lg ${colorClasses[color]} text-white font-medium transition-all ${fullWidth ? 'w-full' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
    >
      <div className="flex items-center justify-center">
        {iconBefore && <span className="mr-2">{iconBefore}</span>}
        {label}
        {iconAfter && <span className="ml-2">{iconAfter}</span>}
      </div>
    </motion.button>
  );
};

export const PixelButton = ({ label, onClick, fullWidth, disabled }) => {
  const [isHovering, setIsHovering] = useState(false);
  
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 relative font-mono text-white ${fullWidth ? 'w-full' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      style={{ 
        imageRendering: 'pixelated',
        boxShadow: isHovering ? '0 4px 0 #4338ca' : '0 6px 0 #4338ca',
        transform: isHovering ? 'translateY(2px)' : 'translateY(0)',
        background: 'linear-gradient(to bottom, #6366f1, #4f46e5)'
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      whileTap={{ y: 6, boxShadow: '0 0 0 #4338ca' }}
      transition={{ duration: 0.1 }}
    >
      <div className="flex items-center justify-center">
        <span className="mr-1">▷</span>
        {label}
      </div>
    </motion.button>
  );
};

export const GlowButton = ({ label, iconAfter, color = "indigo", onClick }) => {
  const colorClasses = {
    indigo: "from-indigo-500 to-purple-600",
    blue: "from-blue-500 to-indigo-600",
    green: "from-green-500 to-emerald-600"
  };
  
  return (
    <motion.button
      onClick={onClick}
      className={`px-5 py-2.5 rounded-lg bg-gradient-to-r ${colorClasses[color]} text-white font-medium relative overflow-hidden`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute inset-0 bg-white opacity-0"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.2, scale: 1.05 }}
        transition={{ duration: 0.2 }}
      />
      <div className="relative z-10 flex items-center justify-center">
        {label}
        {iconAfter && <span className="ml-2">{iconAfter}</span>}
      </div>
    </motion.button>
  );
};

export const OutlineButton = ({ label, onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className="px-4 py-2 rounded-lg border border-gray-600 text-gray-300 hover:border-indigo-500 hover:text-indigo-400 font-medium transition-colors"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      {label}
    </motion.button>
  );
};

export const ArrowButton = ({ onClick, direction = "right", className }) => {
  return (
    <motion.button
      onClick={onClick}
      className={`w-10 h-10 rounded-full bg-gray-800/70 hover:bg-indigo-600/70 flex items-center justify-center text-white ${className || ''}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {direction === "right" ? "→" : "←"}
    </motion.button>
  );
};

// Update the default export to include all button variants
export default {
  PrimaryButton,
  SecondaryButton,
  IconButton,
  CollectibleButton,
  AchievementBadge,
  PlayButton,
  BasicButton,
  PixelButton,
  GlowButton,
  OutlineButton,
  ArrowButton
};