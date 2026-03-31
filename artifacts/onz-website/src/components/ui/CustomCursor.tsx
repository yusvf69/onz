import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        setMousePos({ x: e.clientX, y: e.clientY });

        const target = e.target as HTMLElement;
        const isClickable = window.getComputedStyle(target).cursor === 'pointer' || 
                            target.tagName.toLowerCase() === 'a' ||
                            target.tagName.toLowerCase() === 'button' ||
                            target.closest('a') !== null ||
                            target.closest('button') !== null;
        
        setIsHovering(isClickable);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden mix-blend-difference">
      <motion.div
        className="absolute left-0 top-0 rounded-full border border-primary flex items-center justify-center"
        animate={{
          x: mousePos.x - (isHovering ? 20 : 8),
          y: mousePos.y - (isHovering ? 20 : 8),
          width: isHovering ? 40 : 16,
          height: isHovering ? 40 : 16,
          backgroundColor: isHovering ? "transparent" : "var(--primary)",
        }}
        transition={{ 
          type: "tween", 
          ease: "linear",
          duration: 0.1 
        }}
      />
    </div>
  );
}