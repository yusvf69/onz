import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function EasterEgg({ children }: { children: React.ReactNode }) {
  const [triggered, setTriggered] = useState(false);

  const handleTrigger = () => {
    if (triggered) return;
    setTriggered(true);
    
    // Play celebration sound or extra effect here
    setTimeout(() => {
      setTriggered(false);
    }, 5000); // clear after 5s
  };

  return (
    <>
      <span 
        className="cursor-pointer relative group inline-block"
        onMouseEnter={handleTrigger}
      >
        {children}
        <span className="absolute inset-0 border border-primary opacity-0 group-hover:opacity-100 scale-110 group-hover:scale-100 transition-all duration-300 pointer-events-none" />
      </span>

      <AnimatePresence>
        {triggered && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 pointer-events-none overflow-hidden"
          >
            {/* Raining 1s */}
            {Array.from({ length: 150 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  y: -100, 
                  x: Math.random() * window.innerWidth,
                  opacity: 0
                }}
                animate={{ 
                  y: window.innerHeight + 100,
                  opacity: [0, 1, 1, 0]
                }}
                transition={{ 
                  duration: Math.random() * 2 + 1,
                  delay: Math.random() * 0.5,
                  ease: "linear"
                }}
                className="absolute text-primary font-mono text-xl md:text-3xl font-bold glow-text-primary"
              >
                1
              </motion.div>
            ))}

            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
              className="relative z-10 text-center bg-black/80 p-8 md:p-12 border-2 border-primary glow-box-primary backdrop-blur-md rounded-sm"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                You found the <span className="text-primary glow-text-primary font-mono">1</span>.
              </h2>
              <div className="font-mono text-xl md:text-2xl text-primary tracking-widest">
                01001111 01001110 01011010
              </div>
              <div className="mt-4 text-xs text-white/50 font-mono tracking-widest uppercase">
                SYSTEM OVERRIDE COMPLETE
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
