import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const services = [
  {
    id: "01",
    title: "Web Development",
    desc: "High-performance, immersive web applications built for scale.",
    details: "We don't just write code; we craft digital architecture. Using React, Node, and modern edge computing, we build platforms that are fast, secure, and visually breathtaking. A 1 in web development means zero compromise on performance."
  },
  {
    id: "02",
    title: "Mobile Apps",
    desc: "Native and cross-platform mobile experiences that engage.",
    details: "Pocket-sized 1s. We design and engineer mobile applications that users actually want to open. Fluid animations, offline capabilities, and intuitive UX/UI that makes complex tasks feel simple."
  },
  {
    id: "03",
    title: "UI/UX Design",
    desc: "Interfaces that feel alive. Design systems with intention.",
    details: "Aesthetic precision meets psychological insight. We create design systems that guide users effortlessly. Every pixel, shadow, and transition is meticulously planned to create a sense of premium quality."
  },
  {
    id: "04",
    title: "AI Integration",
    desc: "Intelligent systems that automate, predict, and personalize.",
    details: "Moving beyond chatbots. We integrate bespoke AI models into your workflows and products. From predictive analytics to generative content engines, we turn complex AI into accessible magic."
  },
  {
    id: "05",
    title: "Digital Strategy",
    desc: "Roadmaps for dominance in the digital landscape.",
    details: "We map the path from 0 to 1. Market analysis, tech stack selection, and go-to-market strategies tailored for ambitious goals. We don't guess; we calculate."
  },
  {
    id: "06",
    title: "Brand Identity",
    desc: "Visual languages that command attention and respect.",
    details: "Your brand is your aura. We craft logos, color palettes, and typographic systems that convey authority. When people see your brand, they should instantly recognize the 1."
  }
];

export default function Services() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section id="services" className="py-32 bg-background relative border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-4"
          >
            <span className="font-mono text-primary text-xl">{'<'}</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">The Gameboard</h2>
            <span className="font-mono text-primary text-xl">{'>'}</span>
          </motion.div>
          <p className="text-muted-foreground font-mono text-sm max-w-md">SELECT YOUR PROTOCOL. UNLOCK YOUR POTENTIAL.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <div 
                className={`h-full p-8 border border-white/10 bg-black/40 backdrop-blur-sm cursor-pointer group transition-all duration-500 overflow-hidden ${
                  activeId === service.id ? 'border-primary shadow-[0_0_30px_rgba(0,245,255,0.15)] bg-black/80' : 'hover:border-white/30'
                }`}
                onClick={() => setActiveId(activeId === service.id ? null : service.id)}
              >
                {/* Hover border glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent" />
                  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent" />
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                    <span className="font-mono text-3xl font-bold text-white/20 group-hover:text-primary transition-colors group-hover:glow-text-primary">
                      {service.id}
                    </span>
                    <span className="text-xs font-mono text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      [UNLOCK]
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold mb-4 group-hover:text-white text-white/90">
                    {service.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {service.desc}
                  </p>

                  <AnimatePresence>
                    {activeId === service.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-auto pt-6 border-t border-white/10"
                      >
                        <p className="text-sm text-white/80 leading-relaxed font-light">
                          {service.details}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Binary background pattern on hover */}
                <div className="absolute -right-10 -bottom-10 opacity-0 group-hover:opacity-5 transition-opacity duration-700 font-mono text-9xl pointer-events-none select-none">
                  1
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
