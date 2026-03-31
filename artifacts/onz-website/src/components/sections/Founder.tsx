import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import FounderChat from '@/components/ui/FounderChat';
import FloatingBinary from '@/components/ui/FloatingBinary';
import EasterEgg from '@/components/ui/EasterEgg';

export default function Founder() {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "end start"]
  });

  const timelineY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const tooltips = {
    head: "Visionary Thinker — 7 years turning ideas into digital reality.",
    core: "The 1 Behind ONZ — founder, engineer, philosopher.",
    hands: "Builder — shipped 50+ products across 12 countries."
  };

  const timeline = [
    { year: "2018", title: "The Zero State", desc: "Recognizing the mediocrity in digital experiences." },
    { year: "2019", title: "First Compilation", desc: "Building the foundation. Writing the first lines of truth." },
    { year: "2021", title: "Global Expansion", desc: "Scaling the philosophy. Taking the 1 to new markets." },
    { year: "2023", title: "AI Integration", desc: "Merging human intuition with machine precision." },
    { year: "2025", title: "ONZ Inception", desc: "The official launch of the One Not Zero protocol." }
  ];

  const chapters = [
    { num: "01", title: "From Zero to One", content: "It started with a simple observation: the digital world is cluttered with 0s. Template-driven, thoughtless, generic platforms. The spark was a refusal to accept that standard.", quote: "Mediocrity is a choice. We choose differently." },
    { num: "10", title: "The Journey", content: "Building excellence is painful. It requires an obsessive focus on the micro-interactions, the performance metrics, the visual rhythm. We shipped product after product, refining the methodology of the 1.", quote: "The details are not the details. They make the design." },
    { num: "11", title: "Today: ONZ", content: "Now, ONZ exists as a concentrated force of digital execution. We partner with visionaries to build platforms that command attention and deliver undeniable value.", quote: "We don't build websites. We build digital authority." }
  ];

  return (
    <section id="founder" className="py-24 md:py-32 bg-background relative overflow-hidden" ref={scrollRef}>
      <FloatingBinary count={30} opacity={0.1} />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter inline-flex items-center gap-4">
            <span className="text-primary font-mono font-light text-2xl md:text-4xl opacity-50">{'//'}</span>
            Meet the <EasterEgg><span className="text-primary glow-text-primary px-2">One</span></EasterEgg>
          </h2>
          <p className="mt-4 text-muted-foreground font-mono text-sm tracking-widest uppercase">THE ARCHITECT OF VALUE</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
          
          {/* Interactive 3D Portrait */}
          <div className="relative h-[600px] flex items-center justify-center">
            {/* Background glowing rings */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
              <motion.div 
                animate={{ rotate: 360, scale: [1, 1.05, 1] }} 
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-96 h-96 border border-primary rounded-full border-dashed"
              />
              <motion.div 
                animate={{ rotate: -360, scale: [1, 1.1, 1] }} 
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="w-80 h-80 border border-primary/50 rounded-full absolute"
              />
            </div>

            {/* Stylized Silhouette */}
            <div className="relative z-10 w-full max-w-sm aspect-[3/4] group">
              <svg viewBox="0 0 300 400" className="w-full h-full drop-shadow-[0_0_15px_rgba(0,245,255,0.3)]">
                <defs>
                  <linearGradient id="glow" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#00f5ff" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#00f5ff" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#0a0a0a" stopOpacity="1" />
                  </linearGradient>
                  <pattern id="binary" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <text x="0" y="15" fill="#00f5ff" opacity="0.2" fontSize="12" fontFamily="monospace">1</text>
                    <text x="10" y="15" fill="#00f5ff" opacity="0.1" fontSize="12" fontFamily="monospace">0</text>
                  </pattern>
                </defs>
                
                {/* Silhouette Path */}
                <motion.path 
                  d="M150 40 C120 40, 100 70, 100 110 C100 140, 120 160, 130 170 C100 180, 50 220, 40 300 L40 400 L260 400 L260 300 C250 220, 200 180, 170 170 C180 160, 200 140, 200 110 C200 70, 180 40, 150 40 Z"
                  fill="url(#binary)"
                  stroke="url(#glow)"
                  strokeWidth="2"
                  className="transition-all duration-700"
                  whileHover={{ scale: 1.02 }}
                />

                {/* Head Interaction Area */}
                <circle cx="150" cy="100" r="40" fill="transparent" className="cursor-pointer" 
                  onMouseEnter={() => setActiveTooltip('head')}
                  onMouseLeave={() => setActiveTooltip(null)}
                />
                
                {/* Core Interaction Area */}
                <circle cx="150" cy="220" r="50" fill="transparent" className="cursor-pointer" 
                  onMouseEnter={() => setActiveTooltip('core')}
                  onMouseLeave={() => setActiveTooltip(null)}
                />

                {/* Hands Interaction Area */}
                <rect x="50" y="250" width="200" height="100" fill="transparent" className="cursor-pointer" 
                  onMouseEnter={() => setActiveTooltip('hands')}
                  onMouseLeave={() => setActiveTooltip(null)}
                />

                {/* Animated inner nodes */}
                <motion.circle cx="150" cy="100" r="3" fill="#00f5ff" className="glow-box-primary" 
                  animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
                <motion.circle cx="150" cy="220" r="4" fill="#00f5ff" className="glow-box-primary" 
                  animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 3, repeat: Infinity }} />
              </svg>

              {/* Tooltips */}
              <AnimatePresence>
                {activeTooltip && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 bg-black/90 border border-primary/50 p-4 rounded text-sm text-center shadow-[0_0_20px_rgba(0,245,255,0.2)] backdrop-blur-md z-20 pointer-events-none font-mono"
                  >
                    <span className="text-primary glow-text-primary block mb-2">{'<INFO>'}</span>
                    <span className="text-white/90 leading-relaxed">{tooltips[activeTooltip as keyof typeof tooltips]}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Storytelling Scroll */}
          <div className="space-y-24">
            {chapters.map((chapter, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="relative pl-8 md:pl-12 border-l border-white/10"
              >
                <div className="absolute top-0 -left-[18px] bg-background w-9 h-9 border border-primary flex items-center justify-center text-xs font-mono text-primary font-bold shadow-[0_0_10px_rgba(0,245,255,0.3)]">
                  {chapter.num}
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white group-hover:text-primary transition-colors">
                  {chapter.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6 font-light">
                  {chapter.content}
                </p>
                <blockquote className="border-l-2 border-primary pl-4 text-white/80 font-mono text-sm italic">
                  "{chapter.quote}"
                </blockquote>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Timeline & CTA Section */}
        <div className="mt-32 pt-24 border-t border-white/5 relative">
          <div className="text-center mb-16">
            <h3 className="text-2xl font-mono text-white mb-2">System Log</h3>
            <p className="text-primary text-sm font-mono tracking-widest">TIMELINE_EXECUTION</p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-4 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-white/10 -z-10" />
            
            {timeline.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative group w-full md:w-auto"
              >
                <div className="flex flex-row md:flex-col items-center gap-4 text-left md:text-center p-4 rounded-lg hover:bg-white/5 transition-colors duration-300">
                  <div className="w-12 h-12 rounded-full border border-white/20 bg-black flex items-center justify-center text-primary font-mono text-sm group-hover:border-primary group-hover:shadow-[0_0_15px_rgba(0,245,255,0.4)] transition-all z-10 shrink-0">
                    {item.year.slice(2)}
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1 group-hover:text-primary transition-colors">{item.title}</h4>
                    <p className="text-xs text-muted-foreground font-mono max-w-[150px] mx-auto hidden md:block opacity-0 group-hover:opacity-100 transition-opacity absolute top-full left-1/2 -translate-x-1/2 mt-4 pt-4 border-t border-white/10">
                      {item.desc}
                    </p>
                    <p className="text-xs text-muted-foreground font-mono md:hidden">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* Floating particles on hover */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                  <FloatingBinary count={3} />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-32 text-center">
            <button
              onClick={() => setIsChatOpen(true)}
              className="relative inline-flex items-center gap-3 px-8 py-4 bg-transparent border-2 border-primary text-primary font-mono font-bold hover:bg-primary hover:text-black transition-all duration-300 group overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full bg-primary origin-left -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out -z-10" />
              <span className="relative z-10 animate-pulse text-xs">{'<'}</span>
              <span className="relative z-10 uppercase tracking-widest">Initiate Dialogue</span>
              <span className="relative z-10 animate-pulse text-xs">{'>'}</span>
            </button>
            <p className="mt-4 text-xs font-mono text-muted-foreground uppercase tracking-widest">Connect with the Founder AI</p>
          </div>
        </div>
      </div>

      <FounderChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </section>
  );
}
