/**
 * Framer Motion animation presets
 */

export const swipeLeftAnimation = {
  x: -300,
  rotate: -15,
  opacity: 0,
  transition: { duration: 0.3, ease: "easeOut" },
};

export const swipeRightAnimation = {
  x: 300,
  rotate: 15,
  opacity: 0,
  transition: { duration: 0.3, ease: "easeOut" },
};

export const cardAnimation = {
  initial: { scale: 0.95, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.95, opacity: 0 },
  transition: { duration: 0.3 },
};

export const modalAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
  transition: { duration: 0.2 },
};

export const filterAnimation = {
  initial: { opacity: 0, scaleY: 0.9, y: -10 },
  animate: {
    opacity: 1,
    scaleY: 1,
    y: 0,
    transition: {
      opacity: { duration: 0.25, ease: "easeOut" },
      scaleY: { duration: 0.25, ease: [0.04, 0.62, 0.23, 0.98] },
      y: { duration: 0.25, ease: [0.04, 0.62, 0.23, 0.98] },
    },
  },
  exit: {
    opacity: 0,
    scaleY: 0.9,
    y: -10,
    transition: {
      opacity: { duration: 0.2, ease: "easeIn" },
      scaleY: { duration: 0.2, ease: "easeIn" },
      y: { duration: 0.2, ease: "easeIn" },
    },
  },
};

// Improved filter content animation for staggered children
export const filterContentAnimation = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.2,
      staggerChildren: 0.02,
      delayChildren: 0.03,
      when: "beforeChildren",
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.15,
      when: "afterChildren",
    },
  },
};

export const listItemAnimation = {
  initial: { opacity: 0, x: -10 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -10 },
  transition: { duration: 0.2 },
};

export const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

// Faster staggering for app entrance animations
export const staggerFast = {
  animate: {
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.1,
    },
  },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 },
};

export const scaleIn = {
  initial: { scale: 0.9, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      scale: { duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] },
      opacity: { duration: 0.35, ease: "easeOut" },
    },
  },
  exit: {
    scale: 0.9,
    opacity: 0,
    transition: {
      scale: { duration: 0.2, ease: "easeIn" },
      opacity: { duration: 0.15, ease: "easeIn" },
    },
  },
};

// App entrance animation
export const appEntrance = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.04, 0.62, 0.23, 0.98],
    },
  },
  exit: { opacity: 0, y: 10 },
};

// Logo animation
export const logoAnimation = {
  initial: { scale: 0.8, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 15,
      delay: 0.1,
    },
  },
};

// Nav item animation
export const navItemAnimation = {
  initial: { y: 10, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

// Page transition animation
export const pageTransition = {
  initial: { opacity: 0, x: -10 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    x: 10,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
};

// 3D card hover effect
export const card3DHover = {
  rest: {
    rotateY: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};
