import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="top" className="relative min-h-[100dvh] flex flex-col md:flex-row overflow-hidden bg-[#080808]">
      
      {/* BACKGROUND ELEMENTS SPANNING BOTH ZONES */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 dot-grid opacity-20"></div>
        <div className="absolute top-[20%] w-full h-[1px] bg-primary opacity-30"></div>
        <div className="absolute top-[60%] w-full h-[1px] bg-primary opacity-30"></div>
        <div className="absolute top-[85%] w-full h-[1px] bg-primary opacity-30"></div>
      </div>

      {/* LEFT ZONE */}
      <div className="relative z-10 w-full md:w-[60%] h-full min-h-[50vh] flex flex-col justify-center px-8 md:px-16 pt-24 pb-12">
        <div className="absolute top-24 left-8 md:left-16 text-[9px] font-mono-custom tracking-[0.3em] text-white/50" data-testid="text-hero-metadata">
          DIGITAL AGENCY · EST. 2018 · CAIRO, EGYPT
        </div>

        <div className="mt-auto md:mt-0 relative">
          <div className="flex flex-col font-display text-[25vw] md:text-[20vw] leading-[0.8] tracking-tighter text-primary">
            {['O', 'N', 'Z'].map((letter, i) => (
              <motion.span
                key={i}
                initial={{ y: 100, opacity: 0 }}
                animate={mounted ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                {letter}
                <span className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></span>
              </motion.span>
            ))}
          </div>

          <motion.div 
            initial={{ scaleX: 0 }}
            animate={mounted ? { scaleX: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-[4px] bg-primary origin-left my-4 md:max-w-xl"
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={mounted ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 1 }}
            className="font-mono-custom tracking-[0.4em] text-white text-sm mb-12"
          >
            ONE NOT ZERO
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={mounted ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 1.2 }}
            className="font-editorial italic text-2xl md:text-3xl text-white mb-12 border-l-2 border-primary pl-6"
          >
            "Value is in the One"
          </motion.div>

          <motion.a
            href="#about"
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1.4 }}
            className="inline-flex items-center gap-4 font-mono-custom text-sm font-bold text-primary border border-primary px-8 py-4 hover:bg-primary hover:text-[#080808] transition-colors w-fit"
            data-testid="link-enter-one"
          >
            ENTER THE ONE <span className="text-xl">→</span>
          </motion.a>
        </div>
      </div>

      {/* RIGHT ZONE */}
      <motion.div 
        initial={{ x: '100%' }}
        animate={mounted ? { x: 0 } : {}}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full md:w-[40%] h-[50vh] md:h-screen bg-primary flex flex-col items-center justify-center overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 border-l border-b border-[#080808]/20"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 border-r border-t border-[#080808]/20"></div>
        
        {/* Large circle decoration */}
        <div className="absolute w-[80%] aspect-square rounded-full border border-[#080808]/20"></div>
        <div className="absolute w-[40%] aspect-square border border-[#080808]/20 rotate-45"></div>

        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={mounted ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.2 }}
          className="font-display text-[40vw] md:text-[30vw] text-[#080808] leading-none z-10"
        >
          I
        </motion.div>

        <div className="absolute bottom-12 right-12 font-mono-custom text-[#080808] text-4xl">
          01
        </div>
      </motion.div>
    </section>
  );
}