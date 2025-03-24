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
  initial: { height: 0, opacity: 0, scale: 0.98 },
  animate: {
    height: "auto",
    opacity: 1,
    scale: 1,
    transition: {
      height: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] },
      opacity: { duration: 0.25, ease: "easeInOut" },
      scale: { duration: 0.3, ease: "easeOut" },
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    scale: 0.98,
    transition: {
      height: { duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] },
      opacity: { duration: 0.2, ease: "easeOut" },
      scale: { duration: 0.2, ease: "easeIn" },
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
