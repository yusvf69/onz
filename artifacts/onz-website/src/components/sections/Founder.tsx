import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Founder() {
  const [hoverArea, setHoverArea] = useState<string | null>(null);
  const [easterEgg, setEasterEgg] = useState(false);

  const chapters = [
    { num: "01", title: "FROM ZERO", content: "It started with a simple observation: the digital world is cluttered with 0s. Generic templates, thoughtless execution." },
    { num: "10", title: "THE JOURNEY", content: "Building excellence is painful. It requires an obsessive focus on the micro-interactions, the performance metrics, the visual rhythm." },
    { num: "11", title: "TODAY: ONZ", content: "Now, ONZ exists as a concentrated force of digital execution. We build platforms that command attention." },
  ];

  return (
    <section id="founder" className="relative bg-[#FAF7F0] text-[#080808]">
      
      {/* PART 1: PORTRAIT (Cream) */}
      <div className="container mx-auto px-6 md:px-12 py-32 border-b border-[#080808]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative">
          
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-primary hidden lg:block -translate-x-1/2"></div>

          {/* Left: Geometric Portrait */}
          <div className="relative flex justify-center items-center h-[500px]">
            <div className="relative w-64 h-[400px]">
              {/* Tooltip */}
              <div 
                className="absolute -top-16 left-1/2 -translate-x-1/2 w-64 text-center font-mono-custom text-xs bg-[#080808] text-primary p-2 transition-opacity duration-300" 
                style={{ opacity: hoverArea ? 1 : 0 }}
                data-testid="tooltip-founder"
              >
                {hoverArea === 'head' && "Visionary — 7 years of digital mastery"}
                {hoverArea === 'chest' && "The One — Founder of ONZ"}
                {hoverArea === 'hands' && "Builder — 50+ shipped products"}
              </div>

              {/* Binary Ring */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full border border-dashed border-primary flex items-center justify-center font-mono-custom text-[8px] text-primary tracking-[0.2em]"
              >
                <div className="absolute -top-4 bg-[#FAF7F0] px-1">01001111</div>
                <div className="absolute -bottom-4 bg-[#FAF7F0] px-1">01011010</div>
              </motion.div>

              {/* Portrait SVG */}
              <motion.svg 
                viewBox="0 0 200 400" 
                className="w-full h-full relative z-10"
                animate={{ scale: [1, 1.005, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Head */}
                <circle cx="100" cy="100" r="40" fill="none" stroke="#C9A84C" strokeWidth="2" />
                {/* Eyes */}
                <rect x="85" y="95" width="10" height="4" fill="#080808" />
                <rect x="105" y="95" width="10" height="4" fill="#080808" />
                {/* Nose/Mouth */}
                <line x1="100" y1="105" x2="100" y2="115" stroke="#080808" strokeWidth="2" />
                <path d="M 90 125 Q 100 130 110 125" fill="none" stroke="#080808" strokeWidth="2" />
                
                {/* Body/Shoulders */}
                <rect x="50" y="160" width="100" height="240" fill="none" stroke="#080808" strokeWidth="2" />
                
                {/* Hover Zones (Invisible) */}
                <circle cx="100" cy="100" r="50" fill="transparent" 
                  onMouseEnter={() => setHoverArea('head')} onMouseLeave={() => setHoverArea(null)} className="cursor-crosshair" data-testid="hover-founder-head"/>
                <rect x="50" y="160" width="100" height="120" fill="transparent" 
                  onMouseEnter={() => setHoverArea('chest')} onMouseLeave={() => setHoverArea(null)} className="cursor-crosshair" data-testid="hover-founder-chest"/>
                <rect x="50" y="280" width="100" height="120" fill="transparent" 
                  onMouseEnter={() => setHoverArea('hands')} onMouseLeave={() => setHoverArea(null)} className="cursor-crosshair" data-testid="hover-founder-hands"/>
              </motion.svg>
            </div>
          </div>

          {/* Right: Info */}
          <div className="flex flex-col justify-center gap-8 pl-0 lg:pl-16">
            <div>
              <h2 className="font-display text-6xl md:text-8xl leading-[0.8] mb-2" data-testid="text-founder-title">THE<br/>FOUNDER</h2>
              <div className="font-mono-custom text-primary font-bold tracking-widest text-sm">ARCHITECT OF VALUE</div>
            </div>

            <div className="space-y-4 font-mono-custom text-xs">
              <div className="flex gap-4"><span className="text-primary">01</span><span>Refuse the template.</span></div>
              <div className="flex gap-4"><span className="text-primary">10</span><span>Design is not decoration.</span></div>
              <div className="flex gap-4"><span className="text-primary">11</span><span>Code is poetry.</span></div>
              <div className="flex gap-4"><span className="text-primary">00</span><span>Eliminate the unnecessary.</span></div>
            </div>

            <p className="font-editorial italic text-2xl md:text-3xl border-l-4 border-primary pl-6" data-testid="text-founder-quote">
              "We don't build websites. We build digital authority."
            </p>

            <button 
              className="border border-primary font-mono-custom text-xs font-bold text-primary py-4 px-8 w-fit hover:bg-primary hover:text-[#080808] transition-colors"
              data-testid="button-talk-founder"
            >
              TALK TO THE FOUNDER
            </button>
          </div>
        </div>
      </div>

      {/* PART 2: STORYTELLING (Dark) */}
      <div className="bg-[#080808] text-[#FAF7F0] py-32 relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col gap-32">
          {chapters.map((chap, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative max-w-2xl mx-auto text-center"
              data-testid={`card-chapter-${i}`}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[20vw] leading-none text-white/5 pointer-events-none select-none -z-10">
                {chap.num === "01" ? "0" : chap.num === "10" ? "01" : "1"}
              </div>
              <div className="font-mono-custom text-primary mb-4">CHAPTER {chap.num}</div>
              <h3 className="font-display text-5xl md:text-7xl mb-6">{chap.title}</h3>
              <p className="font-sans font-light text-lg md:text-xl text-white/80">{chap.content}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* PART 3: TIMELINE (Cream) */}
      <div className="bg-[#FAF7F0] py-32 relative">
        <div className="container mx-auto px-6 md:px-12">
          <h3 className="font-display text-4xl mb-16 text-center">THE CHRONOLOGY</h3>
          
          <div className="relative w-full overflow-x-auto pb-12 hide-scrollbar">
            <div className="min-w-[800px] flex justify-between relative px-8">
              {/* Connecting Line */}
              <div className="absolute top-6 left-8 right-8 h-1 bg-primary"></div>
              
              {["2018", "2019", "2021", "2022", "2023", "2024", "2025"].map((year) => (
                <div key={year} className="relative flex flex-col items-center group">
                  <div className="font-mono-custom text-xs font-bold mb-8 relative z-10 bg-[#FAF7F0] px-2">{year}</div>
                  
                  {/* Node */}
                  <div 
                    className="absolute top-[20px] w-4 h-4 bg-[#080808] border-2 border-primary rounded-full group-hover:scale-150 transition-transform cursor-pointer z-10"
                    data-testid={`node-timeline-${year}`}
                    onMouseEnter={() => {
                      if(year === "2018") {
                        const timer = setTimeout(() => setEasterEgg(true), 3000);
                        // Store the timer on window to be able to clear it, but keeping it simple for now
                        (window as any)._easterEggTimer = timer;
                      }
                    }}
                    onMouseLeave={() => {
                      if(year === "2018" && (window as any)._easterEggTimer) {
                        clearTimeout((window as any)._easterEggTimer);
                      }
                    }}
                  ></div>

                  <div className="mt-8 font-editorial italic text-sm text-center max-w-[120px] opacity-0 group-hover:opacity-100 transition-opacity">
                    {year === "2018" ? "The inception of the philosophy." : "Evolution and execution."}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* EASTER EGG FULLSCREEN OVERLAY */}
      {easterEgg && (
        <div 
          className="fixed inset-0 z-[9999] bg-primary flex flex-col items-center justify-center cursor-pointer"
          onClick={() => setEasterEgg(false)}
          data-testid="overlay-easter-egg"
        >
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: window.innerHeight + 100, opacity: 1 }}
              transition={{ duration: Math.random() * 2 + 1, repeat: Infinity, delay: Math.random() * 2 }}
              className="absolute font-display text-[#080808] text-4xl"
              style={{ left: `${Math.random() * 100}%` }}
            >
              1
            </motion.div>
          ))}
          <div className="bg-[#080808] text-primary p-8 text-center relative z-10 border border-primary">
            <h2 className="font-display text-4xl mb-4">You found the beginning.</h2>
            <p className="font-mono-custom tracking-[0.3em]">01001111 01001110 01011010</p>
          </div>
        </div>
      )}

    </section>
  );
}