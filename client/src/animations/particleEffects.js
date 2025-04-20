// Particle effect configurations for game-themed animations

// Create a standard particle effect configuration
export const createParticleConfig = (options) => {
  const defaults = {
    count: 20,
    colors: ['#8B5CF6', '#6366F1', '#EC4899'],
    velocity: { min: 10, max: 30 },
    decay: 0.94,
    size: { min: 3, max: 8 },
    lifetime: { min: 500, max: 1400 },
    spread: 45
  };

  return { ...defaults, ...options };
};

// Standard particle props to use with framer-motion
export const particleVariants = {
  initial: {
    opacity: 1,
    scale: 0
  },
  animate: (custom) => ({
    opacity: [1, 0],
    scale: [0, custom.scale || 1],
    x: custom.x,
    y: custom.y,
    transition: {
      duration: custom.duration || 0.8,
      ease: "easeOut"
    }
  })
};

// Button click sparkle effect
export const buttonClickEffect = {
  particleCount: 12,
  particleConfig: createParticleConfig({
    colors: ['#FBBF24', '#FFFFFF', '#9333EA'],
    size: { min: 2, max: 6 },
    velocity: { min: 15, max: 30 },
    lifetime: { min: 400, max: 800 }
  }),
  generateParticles: (originX, originY) => {
    const particles = [];
    const count = 12;

    for (let i = 0; i < count; i++) {
      // Create a circular burst pattern
      const angle = (i / count) * Math.PI * 2;
      const velocity = 15 + Math.random() * 15;
      const velocityX = Math.cos(angle) * velocity;
      const velocityY = Math.sin(angle) * velocity;
      
      particles.push({
        id: `click-${i}`,
        x: velocityX * 10,
        y: velocityY * 10,
        scale: 0.8 + Math.random() * 0.4,
        duration: 0.6 + Math.random() * 0.4,
        color: ['#FBBF24', '#FFFFFF', '#9333EA'][Math.floor(Math.random() * 3)]
      });
    }

    return particles;
  }
};

// Achievement unlock celebration effect
export const achievementUnlockEffect = {
  particleCount: 30,
  particleConfig: createParticleConfig({
    colors: ['#FBBF24', '#FCD34D', '#F59E0B', '#FFFFFF'],
    size: { min: 3, max: 10 },
    velocity: { min: 20, max: 60 },
    lifetime: { min: 1000, max: 2000 }
  }),
  generateParticles: (originX, originY) => {
    const particles = [];
    const count = 30;
    
    for (let i = 0; i < count; i++) {
      // Create a circular burst pattern with upward bias
      const angle = (i / count) * Math.PI * 2;
      const velocity = 20 + Math.random() * 40;
      const velocityX = Math.cos(angle) * velocity * 0.8;
      const velocityY = Math.sin(angle) * velocity * (angle > Math.PI ? 0.5 : 1.5);  // Bias upward
      
      particles.push({
        id: `achievement-${i}`,
        x: velocityX * 12,
        y: velocityY * 12,
        scale: 1 + Math.random() * 1.5,
        duration: 1 + Math.random() * 1,
        color: ['#FBBF24', '#FCD34D', '#F59E0B', '#FFFFFF'][Math.floor(Math.random() * 4)],
        opacity: [1, 0],
        rotate: Math.random() * 360
      });
    }

    return particles;
  }
};

// Collectible item pickup effect
export const collectiblePickupEffect = {
  particleCount: 20,
  particleConfig: createParticleConfig({
    colors: ['#10B981', '#6EE7B7', '#FFFFFF'],
    size: { min: 2, max: 6 },
    velocity: { min: 10, max: 25 },
    lifetime: { min: 600, max: 1200 }
  }),
  generateParticles: (originX, originY, color) => {
    const particles = [];
    const count = 20;
    const particleColors = color ? 
      [color, '#FFFFFF', color] : 
      ['#10B981', '#6EE7B7', '#FFFFFF'];
    
    for (let i = 0; i < count; i++) {
      // Create a vertical-biased burst
      const angle = (i / count) * Math.PI * 2;
      const velocity = 10 + Math.random() * 15;
      const velocityX = Math.cos(angle) * velocity * 0.7;
      const velocityY = Math.sin(angle) * velocity * 1.2;
      
      particles.push({
        id: `collect-${i}`,
        x: velocityX * 8,
        y: velocityY * 8,
        scale: 0.5 + Math.random() * 0.8,
        duration: 0.5 + Math.random() * 0.5,
        color: particleColors[Math.floor(Math.random() * 3)]
      });
    }

    return particles;
  }
};

// Level up celebration effect (more elaborate)
export const levelUpEffect = {
  particleCount: 60,
  particleConfig: createParticleConfig({
    colors: ['#6366F1', '#8B5CF6', '#EC4899', '#FBBF24', '#FFFFFF'],
    size: { min: 4, max: 12 },
    velocity: { min: 30, max: 80 },
    lifetime: { min: 1500, max: 3000 }
  }),
  generateParticles: (originX, originY) => {
    const particles = [];
    const count = 60;
    
    // First burst (circular)
    for (let i = 0; i < count / 2; i++) {
      const angle = (i / (count / 2)) * Math.PI * 2;
      const velocity = 30 + Math.random() * 50;
      const velocityX = Math.cos(angle) * velocity;
      const velocityY = Math.sin(angle) * velocity;
      
      particles.push({
        id: `levelup-1-${i}`,
        x: velocityX * 15,
        y: velocityY * 15,
        scale: 1 + Math.random() * 2,
        duration: 1.2 + Math.random() * 0.8,
        color: ['#6366F1', '#8B5CF6', '#EC4899', '#FBBF24', '#FFFFFF'][Math.floor(Math.random() * 5)]
      });
    }
    
    // Second burst (upward fountain)
    for (let i = 0; i < count / 2; i++) {
      const angle = (Math.PI / 6) + (Math.random() * (Math.PI - Math.PI / 3));
      const velocity = 40 + Math.random() * 40;
      const velocityX = Math.cos(angle) * velocity * (Math.random() > 0.5 ? 1 : -1);
      const velocityY = Math.sin(angle) * velocity * -1; // Upward
      
      particles.push({
        id: `levelup-2-${i}`,
        x: velocityX * 12,
        y: velocityY * 20,
        scale: 1 + Math.random() * 1.5,
        duration: 1.5 + Math.random() * 1,
        delay: 0.1 + Math.random() * 0.3,
        color: ['#6366F1', '#8B5CF6', '#EC4899', '#FBBF24', '#FFFFFF'][Math.floor(Math.random() * 5)]
      });
    }

    return particles;
  }
};

// Hover trail effect for buttons and UI elements
export const hoverTrailEffect = {
  particleCount: 6,
  particleConfig: createParticleConfig({
    colors: ['#8B5CF6', '#6366F1'],
    size: { min: 2, max: 4 },
    velocity: { min: 5, max: 10 },
    lifetime: { min: 300, max: 600 }
  }),
  generateParticles: (x, y, lastX, lastY) => {
    if (!lastX || !lastY) return [];
    
    const particles = [];
    const count = 6;
    const deltaX = x - lastX;
    const deltaY = y - lastY;
    
    for (let i = 0; i < count; i++) {
      // Create particles along the movement path
      particles.push({
        id: `trail-${Date.now()}-${i}`,
        x: lastX + deltaX * (i / count) + (Math.random() - 0.5) * 10,
        y: lastY + deltaY * (i / count) + (Math.random() - 0.5) * 10,
        scale: 0.5 + Math.random() * 0.5,
        duration: 0.3 + Math.random() * 0.3,
        color: ['#8B5CF6', '#6366F1'][Math.floor(Math.random() * 2)]
      });
    }

    return particles;
  }
};

// Error/warning effect (red particles)
export const errorEffect = {
  particleCount: 20,
  particleConfig: createParticleConfig({
    colors: ['#EF4444', '#F87171', '#FCA5A5'],
    size: { min: 3, max: 8 },
    velocity: { min: 15, max: 30 },
    lifetime: { min: 500, max: 1000 }
  }),
  generateParticles: (originX, originY) => {
    const particles = [];
    const count = 20;
    
    for (let i = 0; i < count; i++) {
      // Chaotic burst pattern
      const angle = Math.random() * Math.PI * 2;
      const velocity = 15 + Math.random() * 15;
      const velocityX = Math.cos(angle) * velocity;
      const velocityY = Math.sin(angle) * velocity;
      
      particles.push({
        id: `error-${i}`,
        x: velocityX * 8,
        y: velocityY * 8,
        scale: 0.8 + Math.random() * 0.8,
        duration: 0.5 + Math.random() * 0.5,
        color: ['#EF4444', '#F87171', '#FCA5A5'][Math.floor(Math.random() * 3)]
      });
    }

    return particles;
  }
};

// Render a particle effect
export const renderParticleEffect = (effect, origin) => {
  if (!effect || !origin) return null;
  
  const { x, y } = origin;
  const particles = effect.generateParticles(x, y);
  
  return (
    <>
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: x,
            top: y,
            width: particle.size || 8,
            height: particle.size || 8,
            backgroundColor: particle.color,
            zIndex: 50
          }}
          initial="initial"
          animate="animate"
          custom={particle}
          variants={particleVariants}
        />
      ))}
    </>
  );
};

// Create ambient background particles
export const createAmbientParticles = (count = 20) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `ambient-${i}`,
    x: Math.random() * 100, // percent
    y: Math.random() * 100, // percent
    size: 1 + Math.random() * 3,
    duration: 3 + Math.random() * 7,
    delay: Math.random() * 5
  }));
};

// Render ambient background particles
export const renderAmbientParticles = (particles) => {
  if (!particles || !particles.length) return null;
  
  return (
    <>
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white pointer-events-none"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            opacity: 0.6
          }}
          animate={{
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay
          }}
        />
      ))}
    </>
  );
};