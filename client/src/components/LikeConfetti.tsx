import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LikeConfettiProps {
  isVisible: boolean;
  onComplete?: () => void;
}

const LikeConfetti = ({ isVisible, onComplete }: LikeConfettiProps) => {
  const [particles, setParticles] = useState<
    Array<{
      id: number;
      x: number;
      y: number;
      size: number;
      color: string;
      rotation: number;
      delay: number;
    }>
  >([]);

  useEffect(() => {
    if (isVisible) {
      // Generate random particles
      const newParticles = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 200 - 100, // -100 to 100
        y: Math.random() * -300 - 50, // -50 to -350 (upward)
        size: Math.random() * 10 + 5, // 5 to 15
        color: [
          "#FF5E5B", // Red
          "#D88559", // Orange
          "#F9C80E", // Yellow
          "#4CAF50", // Green
          "#675AFE", // Purple
          "#FF9800", // Orange
        ][Math.floor(Math.random() * 6)],
        rotation: Math.random() * 360,
        delay: Math.random() * 0.3,
      }));

      setParticles(newParticles);

      // Clean up after animation
      const timer = setTimeout(() => {
        if (onComplete) onComplete();
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{
              x: 0,
              y: 0,
              scale: 0,
              rotate: 0,
              opacity: 0,
            }}
            animate={{
              x: particle.x,
              y: particle.y,
              scale: 1,
              rotate: particle.rotation,
              opacity: [0, 1, 0.8, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1.2,
              delay: particle.delay,
              ease: [0.23, 1.64, 0.41, 0.94], // Custom easing
            }}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: particle.size,
              height: particle.size,
              borderRadius: Math.random() > 0.5 ? "50%" : "0%",
              background: particle.color,
              zIndex: 50,
            }}
          />
        ))}
      </div>
    </AnimatePresence>
  );
};

export default LikeConfetti;
