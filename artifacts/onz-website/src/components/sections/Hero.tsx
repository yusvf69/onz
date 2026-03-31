import { motion } from 'framer-motion';
import BinaryRain from '@/components/ui/BinaryRain';

export default function Hero() {
  return (
    <section id="top" className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-background">
      <BinaryRain opacity={0.4} />
      
      <div className="relative z-10 container mx-auto px-6 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 relative"
        >
          <h1 className="text-[12vw] md:text-[8vw] font-bold leading-none tracking-tighter text-white glow-text-primary">
            ONZ
          </h1>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 1, duration: 1 }}
            className="h-1 bg-primary absolute -bottom-4 left-0 glow-box-primary"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="font-mono text-xl md:text-2xl tracking-[0.2em] text-muted-foreground mb-4 uppercase"
        >
          ONE NOT ZERO
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="text-lg md:text-xl text-white/70 max-w-lg mb-12 font-light"
        >
          We make <span className="text-primary font-mono font-bold glow-text-primary">1s</span> matter.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <a
            href="#services"
            className="group relative inline-flex items-center justify-center px-8 py-4 font-mono text-sm font-bold text-background bg-primary hover:bg-white transition-colors duration-300 overflow-hidden rounded-sm glow-box-primary-hover"
          >
            <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
            <span className="relative flex items-center gap-2">
              DISCOVER OUR VALUE
              <motion.span 
                animate={{ x: [0, 5, 0] }} 
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                →
              </motion.span>
            </span>
            
            {/* Hover binary particles could be added here */}
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
      >
        <span className="font-mono text-xs tracking-widest">SCROLL</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-px h-12 bg-gradient-to-b from-primary to-transparent"
        />
      </motion.div>
    </section>
  );
}
