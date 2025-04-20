// Common animation variants to use across components

export const fadeIn = (direction = 'up', delay = 0) => {
    return {
      hidden: {
        y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
        x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
        opacity: 0,
      },
      visible: {
        y: 0,
        x: 0,
        opacity: 1,
        transition: {
          type: 'spring',
          duration: 0.8,
          delay: delay,
          ease: [0.25, 0.1, 0.25, 1],
        },
      },
    };
  };
  
  export const staggerContainer = (staggerChildren, delayChildren) => {
    return {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: staggerChildren,
          delayChildren: delayChildren || 0,
        },
      },
    };
  };
  
  export const scaleIn = (delay = 0) => {
    return {
      hidden: { scale: 0.9, opacity: 0 },
      visible: {
        scale: 1,
        opacity: 1,
        transition: {
          type: 'spring',
          duration: 0.6,
          delay: delay,
        },
      },
    };
  };
  
  export const rotateIn = (delay = 0) => {
    return {
      hidden: { 
        rotate: -15, 
        opacity: 0 
      },
      visible: {
        rotate: 0,
        opacity: 1,
        transition: {
          type: 'spring',
          duration: 0.8,
          delay: delay,
        },
      },
    };
  };
  
  export const slideIn = (direction, type, delay, duration) => {
    return {
      hidden: {
        x: direction === 'left' ? '-100%' : direction === 'right' ? '100%' : 0,
        y: direction === 'up' ? '100%' : direction === 'down' ? '-100%' : 0,
      },
      visible: {
        x: 0,
        y: 0,
        transition: {
          type: type,
          delay: delay,
          duration: duration,
          ease: 'easeOut',
        },
      },
    };
  };