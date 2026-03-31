import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

export default function About() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative bg-[#FAF7F0] py-32 overflow-hidden text-[#080808]">
      
      {/* Watermark */}
      <div className="absolute top-0 left-0 text-[60vw] font-display leading-[0.6] text-primary opacity-20 pointer-events-none select-none -z-0">
        I.
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="mb-24">
          <div className="h-[4px] w-full bg-[#080808] mb-4"></div>
          <div className="flex items-start gap-8">
            <span className="font-mono-custom text-sm font-bold pt-4">02</span>
            <h2 className="font-display text-7xl md:text-8xl tracking-tight">ABOUT</h2>
          </div>
        </div>

        {/* Content Layout */}
        <div className="flex flex-col md:flex-row gap-12 lg:gap-24 relative">
          
          {/* Narrow Left */}
          <div className="hidden md:flex w-16 justify-center">
            <div className="font-mono-custom text-xs tracking-[0.3em] whitespace-nowrap" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
              OUR PHILOSOPHY
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 bracket-border p-8 md:p-12 relative">
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="font-editorial italic text-3xl md:text-5xl lg:text-6xl leading-tight mb-16 text-[#080808]"
            >
              "We exist to eliminate mediocrity. Every project we touch becomes a One."
            </motion.h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-[#080808]/20 pt-12">
              <Stat number="50+" label="PROJECTS DELIVERED" delay={0.2} inView={inView} />
              <Stat number="12" label="COUNTRIES SERVED" delay={0.4} inView={inView} />
              <Stat number="7YRS" label="OF EXCELLENCE" delay={0.6} inView={inView} />
            </div>
          </div>

          {/* Right Decoration */}
          <div className="w-full md:w-1/3 flex justify-center items-center relative min-h-[300px]">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative w-64 h-64 border-2 border-[#080808] rounded-full flex items-center justify-center"
            >
              <div className="w-32 h-32 bg-[#080808] rounded-full flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-primary opacity-50 mix-blend-multiply"></div>
                <span className="font-display text-5xl text-white relative z-10">0→1</span>
              </div>
              
              {/* Decorative lines */}
              <div className="absolute -top-4 bottom-0 left-1/2 w-[1px] h-[120%] bg-[#080808] -z-10 transform -rotate-45"></div>
              <div className="absolute -left-4 right-0 top-1/2 h-[1px] w-[120%] bg-[#080808] -z-10 transform -rotate-45"></div>
            </motion.div>
          </div>

        </div>

      </div>

      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#080808]"></div>
    </section>
  );
}

function Stat({ number, label, delay, inView }: { number: string, label: string, delay: number, inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay }}
      className="flex flex-col"
    >
      <span className="font-display text-6xl md:text-7xl text-[#0066FF] tracking-tight">{number}</span>
      <span className="font-mono-custom text-[10px] tracking-widest uppercase text-[#080808] mt-2">{label}</span>
    </motion.div>
  );
}