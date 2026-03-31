import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
  { id: 1, name: "FinTech Platform", category: "01 WEB", year: "2024", desc: "A high-frequency trading interface built for speed and precision.", imgColor: "from-blue-900/40 to-cyan-900/20" },
  { id: 2, name: "AI Health Assistant", category: "11 AI", year: "2023", desc: "Predictive diagnostics powered by custom LLM integrations.", imgColor: "from-emerald-900/40 to-teal-900/20" },
  { id: 3, name: "E-Commerce Empire", category: "01 WEB", year: "2024", desc: "Headless Shopify build handling 10k+ concurrent users seamlessly.", imgColor: "from-purple-900/40 to-indigo-900/20" },
  { id: 4, name: "Smart City Dashboard", category: "11 AI", year: "2023", desc: "Real-time IoT data visualization for metropolitan infrastructure.", imgColor: "from-cyan-900/40 to-blue-900/20" },
  { id: 5, name: "EdTech Revolution", category: "10 MOBILE", year: "2022", desc: "Gamified learning mobile app with offline-first capabilities.", imgColor: "from-amber-900/40 to-green-900/20" },
  { id: 6, name: "Blockchain Identity", category: "01 WEB", year: "2022", desc: "Web3 authentication protocol with zero-knowledge proofs.", imgColor: "from-indigo-900/40 to-purple-900/20" },
];

const filters = ["ALL", "01 WEB", "10 MOBILE", "11 AI"];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("ALL");

  const filteredProjects = projects.filter(p => 
    activeFilter === "ALL" ? true : p.category === activeFilter
  );

  return (
    <section id="portfolio" className="py-24 md:py-32 bg-black relative border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              The <span className="text-primary font-mono glow-text-primary">1s</span> We Built
            </h2>
            <p className="text-muted-foreground font-mono text-sm max-w-md uppercase tracking-widest">
              Proof of concept. Proof of execution.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 md:gap-4">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 font-mono text-xs md:text-sm transition-all duration-300 border ${
                  activeFilter === filter 
                    ? 'border-primary text-primary bg-primary/10 shadow-[0_0_15px_rgba(0,245,255,0.2)]' 
                    : 'border-white/10 text-white/50 hover:text-white hover:border-white/30 bg-transparent'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>
        
        <div className="mt-20 text-center">
          <button className="font-mono text-sm text-white/50 hover:text-primary hover:tracking-[0.3em] transition-all duration-300 uppercase tracking-widest">
            Load More Data...
          </button>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: any }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    setRotateX(yPct * 20 * -1); // 20 max rotation
    setRotateY(xPct * 20);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      style={{ perspective: 1000 }}
      className="relative h-[400px] cursor-pointer group"
    >
      <motion.div
        ref={cardRef}
        className="w-full h-full border border-white/10 bg-[#0a0a0a] relative transform-style-3d transition-all duration-200 ease-out flex flex-col justify-end overflow-hidden"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Background "Image" */}
        <div className={`absolute inset-0 bg-gradient-to-br ${project.imgColor} opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
        
        {/* Geometric patterns overlay */}
        <div className="absolute inset-0 opacity-10 group-hover:opacity-30 transition-opacity duration-500 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />

        {/* Content */}
        <div 
          className="relative z-10 p-6 bg-gradient-to-t from-black via-black/80 to-transparent pt-32"
          style={{ transform: "translateZ(30px)" }} // Pop out effect
        >
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-mono text-primary px-2 py-1 bg-primary/10 border border-primary/20">
              {project.category}
            </span>
            <span className="text-xs font-mono text-white/40">
              {project.year}
            </span>
          </div>
          
          <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
            {project.name}
          </h3>
          
          {/* Hidden description that reveals on hover */}
          <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-300 overflow-hidden">
            <div className="min-h-0">
              <p className="text-sm text-muted-foreground mt-2 mb-4">
                {project.desc}
              </p>
              <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold">
                <span>VIEW_PROJECT</span>
                <span className="group-hover:translate-x-2 transition-transform">→</span>
              </div>
            </div>
          </div>
        </div>

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-primary/50 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-primary/50 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-primary/50 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-primary/50 opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.div>
    </motion.div>
  );
}
