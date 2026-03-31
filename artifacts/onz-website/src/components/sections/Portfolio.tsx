import { motion } from 'framer-motion';
import { useState } from 'react';

const projects = [
  { id: "01", name: "ALGORITHMIC TRADING", category: "WEB", year: "2024", desc: "High-frequency interface for institutional firms." },
  { id: "02", name: "NEURAL HEALTH AI", category: "AI", year: "2023", desc: "Predictive diagnostics using custom models." },
  { id: "03", name: "LUXURY COMMERCE", category: "WEB", year: "2024", desc: "Headless storefront handling 10k+ concurrents." },
  { id: "04", name: "URBAN SENSORY", category: "MOBILE", year: "2023", desc: "Real-time IoT visualization for smart cities." },
];

export default function Portfolio() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState("ALL");

  const filters = ["ALL", "01 WEB", "10 MOBILE", "11 AI"];

  const filteredProjects = projects.filter(p => {
    if (activeFilter === "ALL") return true;
    return activeFilter.includes(p.category);
  });

  return (
    <section id="portfolio" className="relative bg-[#080808] py-32 overflow-hidden text-[#FAF7F0]">
      
      <div className="watermark-text top-1/4 right-0 text-right opacity-[0.03]">
        05
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b-4 border-primary pb-8">
          <div>
            <h2 className="font-display text-6xl md:text-8xl tracking-tight mb-4">THE 1s WE BUILT</h2>
            <p className="font-mono-custom text-sm text-primary">PROOF OF EXECUTION</p>
          </div>
          
          <div className="flex gap-6 mt-8 md:mt-0 font-mono-custom text-xs">
            {filters.map(filter => (
              <button 
                key={filter}
                className={`transition-colors ${activeFilter === filter ? 'border-b border-primary pb-1 text-primary' : 'text-white/50 hover:text-white'}`}
                onClick={() => setActiveFilter(filter)}
                data-testid={`button-filter-${filter.split(' ')[0]}`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Editorial Grid */}
        <div className="flex flex-col">
          {filteredProjects.map((project, i) => {
            const isEven = i % 2 !== 0;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative border-b border-primary py-12 flex flex-col md:flex-row gap-8 md:gap-16 items-center transition-all duration-500 hover:pl-4 md:hover:pl-8"
                data-testid={`card-project-${project.id}`}
              >
                {/* Hover Glow */}
                <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,102,255,0.05)_0%,transparent_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>

                {isEven ? (
                  <>
                    <div className="md:w-1/3 flex flex-col gap-4 font-mono-custom text-sm order-2 md:order-1">
                      <div className="flex justify-between text-white/50 border-b border-white/10 pb-2">
                        <span>[{project.category}]</span>
                        <span>{project.year}</span>
                      </div>
                      <p className="font-sans text-white/70 font-light">{project.desc}</p>
                      <a href="#" className="text-primary font-bold hover:underline inline-flex items-center gap-2 mt-4" data-testid={`link-view-project-${project.id}`}>
                        VIEW <span className="text-lg">→</span>
                      </a>
                    </div>
                    <div className="md:w-2/3 order-1 md:order-2 flex items-center gap-8">
                      <h3 className={`font-display text-5xl md:text-7xl lg:text-8xl leading-none transition-colors duration-300 ${hoveredId === project.id ? 'text-primary' : 'text-[#FAF7F0]'}`}>
                        {project.name}
                      </h3>
                      <span className="font-mono-custom text-2xl text-primary">{project.id}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="md:w-2/3 flex items-center gap-8 justify-end order-1 md:order-1 text-right">
                      <span className="font-mono-custom text-2xl text-primary">{project.id}</span>
                      <h3 className={`font-display text-5xl md:text-7xl lg:text-8xl leading-none transition-colors duration-300 ${hoveredId === project.id ? 'text-primary' : 'text-[#FAF7F0]'}`}>
                        {project.name}
                      </h3>
                    </div>
                    <div className="md:w-1/3 flex flex-col gap-4 font-mono-custom text-sm order-2 md:order-2 text-right">
                      <div className="flex justify-between text-white/50 border-b border-white/10 pb-2">
                        <span>{project.year}</span>
                        <span>[{project.category}]</span>
                      </div>
                      <p className="font-sans text-white/70 font-light">{project.desc}</p>
                      <div className="flex justify-end mt-4">
                        <a href="#" className="text-primary font-bold hover:underline inline-flex items-center gap-2" data-testid={`link-view-project-${project.id}`}>
                          VIEW <span className="text-lg">→</span>
                        </a>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}