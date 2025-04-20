// Animation variants for the game-themed landing page

// Feature card animations
export const featureCardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.9
  },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
      delay: custom * 0.1 + 0.2
    }
  }),
  hover: {
    y: -10,
    scale: 1.03,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  },
  tap: {
    scale: 0.98,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  },
  selected: {
    y: -15,
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15
    }
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.9,
    transition: {
      duration: 0.2
    }
  }
};

// Button animation variants
export const buttonVariants = {
  normal: {
    scale: 1,
    backgroundColor: "rgba(79, 70, 229, 1)"
  },
  hover: {
    scale: 1.05,
    backgroundColor: "rgba(99, 102, 241, 1)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  },
  tap: {
    scale: 0.95,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  },
  disabled: {
    opacity: 0.5,
    cursor: "not-allowed"
  }
};

// Page transition variants
export const pageTransitionVariants = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3
    }
  }
};

// Character movement variants
export const characterVariants = {
  idle: {
    y: [0, -5, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut"
    }
  },
  run: {
    x: [0, 5, 0, -5, 0],
    transition: {
      duration: 0.5,
      repeat: Infinity,
      repeatType: "loop"
    }
  },
  jump: {
    y: [0, -20, 0],
    transition: {
      duration: 0.6,
      times: [0, 0.4, 1],
      ease: "easeOut"
    }
  }
};

// Project card variants
export const projectCardVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    rotateY: 45
  },
  visible: (custom) => ({
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      delay: custom * 0.2
    }
  }),
  hover: {
    scale: 1.05,
    rotateY: 5,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15
    }
  }
};

// Achievement badge variants
export const achievementVariants = {
  hidden: {
    scale: 0,
    opacity: 0,
    rotate: -45
  },
  visible: (custom) => ({
    scale: 1,
    opacity: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
      delay: custom * 0.1
    }
  }),
  unlock: {
    scale: [1, 1.5, 1],
    rotate: [0, 10, -10, 0],
    boxShadow: [
      "0 0 0 0 rgba(255, 215, 0, 0)",
      "0 0 20px 10px rgba(255, 215, 0, 0.7)",
      "0 0 0 0 rgba(255, 215, 0, 0)"
    ],
    transition: {
      duration: 0.8
    }
  }
};

// List item stagger variants
export const listItemVariants = {
  hidden: { 
    opacity: 0, 
    x: -20 
  },
  visible: (custom) => ({ 
    opacity: 1, 
    x: 0,
    transition: { 
      delay: custom * 0.1,
      duration: 0.5
    }
  })
};

// Loading bar variants
export const loadingBarVariants = {
  initial: {
    width: "0%"
  },
  animate: (custom) => ({
    width: `${custom}%`,
    transition: {
      duration: 0.5
    }
  })
};

// Modal/dialog variants
export const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 50
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: 50,
    transition: {
      duration: 0.2
    }
  }
};

// Nav menu item variants
export const navItemVariants = {
  hidden: {
    opacity: 0,
    y: -10
  },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.1,
      duration: 0.3
    }
  }),
  hover: {
    scale: 1.1,
    color: "#6366F1", // indigo-500
    textShadow: "0 0 8px rgba(99, 102, 241, 0.6)",
    transition: {
      duration: 0.2
    }
  },
  active: {
    scale: 1.1,
    color: "#8B5CF6", // violet-500
    textShadow: "0 0 8px rgba(139, 92, 246, 0.6)"
  }
};

// Notification variants
export const notificationVariants = {
  hidden: {
    opacity: 0,
    y: -50,
    scale: 0.8
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 20
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: -30,
    transition: {
      duration: 0.3
    }
  }
};

// Profile card hover effect
export const profileCardVariants = {
  hidden: {
    opacity: 0,
    y: 30
  },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      delay: custom * 0.2
    }
  }),
  hover: {
    y: -10,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }
};

// Scorecard number counter
export const scoreCounterVariants = {
  initial: (custom) => ({
    opacity: 0,
    y: 10,
    value: 0
  }),
  animate: (custom) => ({
    opacity: 1,
    y: 0,
    value: custom,
    transition: {
      duration: 1,
      ease: "easeOut"
    }
  })
};

// Dashboard widget variants
export const widgetVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9
  },
  visible: (custom) => ({
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      delay: custom * 0.15
    }
  }),
  hover: {
    scale: 1.02,
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    transition: {
      duration: 0.3
    }
  }
};