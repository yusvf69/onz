import { motion } from 'framer-motion';

interface FloatingBinaryProps {
  count?: number;
  className?: string;
}

export default function FloatingBinary({ count = 10, className = "" }: FloatingBinaryProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            opacity: 0, 
            y: Math.random() * 100 + '%', 
            x: Math.random() * 100 + '%' 
          }}
          animate={{
            y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
            x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: "linear",
          }}
          className="absolute text-primary/20 font-mono text-xs"
        >
          {Math.random() > 0.5 ? '1' : '0'}
        </motion.div>
      ))}
    </div>
  );
}
