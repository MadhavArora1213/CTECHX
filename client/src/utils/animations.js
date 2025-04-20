export const fadeIn = (duration = 300) => {
  return {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: duration / 1000 } },
  };
};

export const slideIn = (direction = 'left', duration = 300) => {
  return {
    hidden: { x: direction === 'left' ? '-100%' : '100%' },
    visible: { x: 0, transition: { duration: duration / 1000 } },
  };
};

export const flip = (duration = 300) => {
  return {
    hidden: { rotateY: 180 },
    visible: { rotateY: 0, transition: { duration: duration / 1000 } },
  };
};

export const bounce = (duration = 300) => {
  return {
    hidden: { scale: 0.8 },
    visible: { scale: 1, transition: { duration: duration / 1000, yoyo: Infinity, ease: 'easeInOut' } },
  };
};