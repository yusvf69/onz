import { motion } from 'framer-motion';

const services = [
  { num: "01", name: "WEB DEVELOPMENT", desc: "Digital architecture built for scale." },
  { num: "02", name: "MOBILE APPS", desc: "Native experiences that engage." },
  { num: "03", name: "UI/UX DESIGN", desc: "Interfaces that feel alive." },
  { num: "04", name: "AI INTEGRATION", desc: "Intelligent systems and automation." },
  { num: "05", name: "DIGITAL STRATEGY", desc: "Roadmaps for dominance." },
  { num: "06", name: "BRAND IDENTITY", desc: "Visual languages that command respect." },
];

export default function Services() {
  return (
    <section id="services" className="relative bg-[#080808] py-32 overflow-hidden text-[#FAF7F0]">
      
      {/* Watermark */}
      <div className="watermark-text top-0 left-0">
        III
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col lg:flex-row gap-16">
        
        {/* Main Content */}
        <div className="flex-1">
          <div className="mb-16">
            <h2 className="font-mono-custom text-sm text-primary mb-4">03 / SERVICES</h2>
            <div className="h-[2px] w-32 bg-primary"></div>
          </div>

          <div className="flex flex-col">
            {services.map((service, idx) => (
              <motion.div 
                key={service.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative border-b border-primary py-8 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer overflow-hidden"
                data-testid={`card-service-${idx}`}
              >
                {/* Background Wash */}
                <div className="absolute inset-0 bg-primary/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0"></div>

                <div className="relative z-10 flex items-center gap-8 md:gap-16">
                  <span className="font-mono-custom text-sm text-primary" data-testid={`text-service-num-${idx}`}>{service.num}</span>
                  <div className="relative">
                    <h3 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight text-[#FAF7F0] m-0 leading-none group-hover:text-white transition-colors" data-testid={`text-service-name-${idx}`}>
                      {service.name}
                    </h3>
                    <div className="absolute -bottom-2 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-500"></div>
                  </div>
                </div>

                <div className="relative z-10 flex items-center gap-8 text-right md:w-1/3 justify-between md:justify-end">
                  <p className="font-sans font-light text-sm text-white/60 group-hover:text-white/90 transition-colors" data-testid={`text-service-desc-${idx}`}>
                    {service.desc}
                  </p>
                  <span className="font-mono-custom text-primary text-xl opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    →
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Side Decoration */}
        <div className="hidden lg:flex w-[300px] justify-center pt-32">
          <div className="grid grid-cols-6 gap-4">
            {Array.from({ length: 36 }).map((_, i) => (
              <div 
                key={i} 
                className={`w-3 h-3 rounded-full ${Math.random() > 0.7 ? 'bg-primary' : 'border border-primary'}`}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Ticker */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden border-t border-primary/20 py-4 bg-[#080808]/80 backdrop-blur">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="flex whitespace-nowrap font-mono-custom text-xs text-primary/50 tracking-widest"
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="mx-8">
              FINTECH · HEALTHCARE · E-COMMERCE · REAL ESTATE · WEB3 · LOGISTICS
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}