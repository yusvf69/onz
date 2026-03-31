import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type TrailItem = {
  id: number;
  x: number;
  y: number;
  char: '0' | '1';
};

export default function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<TrailItem[]>([]);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      const newTrailItem: TrailItem = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
        char: Math.random() > 0.5 ? '1' : '0'
      };

      setTrail(prev => [...prev.slice(-15), newTrailItem]);

      // Check if hovering clickable elements
      const target = e.target as HTMLElement;
      const isClickable = window.getComputedStyle(target).cursor === 'pointer' || 
                          target.tagName.toLowerCase() === 'a' ||
                          target.tagName.toLowerCase() === 'button' ||
                          target.closest('a') !== null ||
                          target.closest('button') !== null;
      
      setIsHovering(isClickable);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Clean up trail over time
    const cleanupInterval = setInterval(() => {
      setTrail(prev => prev.length > 0 ? prev.slice(1) : []);
    }, 50);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(cleanupInterval);
    };
  }, []);

  // Hide on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
      <motion.div
        className="absolute left-0 top-0 w-4 h-4 -ml-2 -mt-2 rounded-full border border-primary bg-primary/20 backdrop-blur-[1px] mix-blend-screen shadow-[0_0_10px_rgba(0,245,255,0.5)]"
        animate={{
          x: mousePos.x,
          y: mousePos.y,
          scale: isHovering ? 2 : 1,
          backgroundColor: isHovering ? "rgba(0, 245, 255, 0.4)" : "rgba(0, 245, 255, 0.2)"
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 2 }}
      />
      
      <AnimatePresence>
        {trail.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0.8, scale: 1 }}
            animate={{ opacity: 0, scale: 0.5, y: item.y + 20 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute left-0 top-0 font-mono text-[10px] text-primary glow-text-primary"
            style={{ 
              x: item.x + (Math.random() * 20 - 10), 
              y: item.y + (Math.random() * 20 - 10) 
            }}
          >
            {item.char}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
