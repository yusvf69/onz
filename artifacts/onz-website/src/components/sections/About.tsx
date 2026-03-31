import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const zeroOpacity = useTransform(scrollYProgress, [0, 0.3, 0.4], [1, 1, 0]);
  const zeroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.5]);
  
  const oneOpacity = useTransform(scrollYProgress, [0.4, 0.5, 0.8], [0, 1, 1]);
  const oneScale = useTransform(scrollYProgress, [0.4, 0.5, 0.8], [0.5, 1, 1.2]);

  const text1Opacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const text1Y = useTransform(scrollYProgress, [0.1, 0.3], [50, 0]);

  const text2Opacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);
  const text2Y = useTransform(scrollYProgress, [0.5, 0.7], [50, 0]);

  const finalOpacity = useTransform(scrollYProgress, [0.75, 0.9], [0, 1]);

  return (
    <section ref={containerRef} id="about" className="relative min-h-[300vh] bg-background py-20">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        
        {/* The Zero Phase */}
        <motion.div 
          style={{ opacity: zeroOpacity, scale: zeroScale }}
          className="absolute inset-0 flex flex-col items-center justify-center"
        >
          <div className="text-[40vw] leading-none font-mono font-bold text-muted-foreground/20">
            0
          </div>
          <motion.div 
            style={{ opacity: text1Opacity, y: text1Y }}
            className="absolute bottom-1/4 text-xl md:text-3xl text-muted-foreground font-light text-center px-6"
          >
            This is where most companies stop.
          </motion.div>
        </motion.div>

        {/* The One Phase */}
        <motion.div 
          style={{ opacity: oneOpacity, scale: oneScale }}
          className="absolute inset-0 flex flex-col items-center justify-center"
        >
          <div className="text-[40vw] leading-none font-mono font-bold text-primary glow-text-primary">
            1
          </div>
          <motion.div 
            style={{ opacity: text2Opacity, y: text2Y }}
            className="absolute bottom-1/4 text-xl md:text-3xl text-white font-light text-center px-6"
          >
            This is where <span className="font-bold">ONZ</span> begins.
          </motion.div>
        </motion.div>

        {/* Final Philosophy Phase */}
        <motion.div 
          style={{ opacity: finalOpacity }}
          className="absolute inset-0 flex flex-col items-center justify-center bg-background/90 backdrop-blur-sm z-10 px-6"
        >
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
              ONZ = One Not Zero
            </h2>
            <p className="text-2xl md:text-4xl leading-relaxed text-muted-foreground font-light">
              We exist to eliminate mediocrity.<br/>
              Every project we touch becomes a <span className="text-primary font-mono glow-text-primary font-bold">1</span>.
            </p>
          </div>
        </motion.div>

        {/* Ambient binary particles */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
           {/* Add static or slow moving binary particles here if desired */}
        </div>

      </div>
    </section>
  );
}
