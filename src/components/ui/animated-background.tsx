'use client';

import { motion } from 'framer-motion';

export function AnimatedBackground() {
  const floatingElements = Array.from({ length: 6 }, (_, i) => i);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {floatingElements.map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full opacity-20 bg-gradient-to-br from-primary/30 to-secondary/30"
          style={{
            width: Math.random() * 200 + 50,
            height: Math.random() * 200 + 50,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Additional decorative elements */}
      <motion.div
        className="absolute top-10 right-10 w-20 h-20 rounded-full bg-gradient-to-br from-green-400/20 to-blue-400/20"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute bottom-10 left-10 w-16 h-16 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-400/20"
        animate={{
          x: [0, 20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
