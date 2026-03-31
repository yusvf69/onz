import { motion } from 'framer-motion';

const articles = [
  {
    id: 1,
    title: "Why We Chose 1 Over 0: The ONZ Philosophy",
    excerpt: "In a digital landscape filled with templates and shortcuts, committing to true value requires radical discipline. Here is how we define the '1' state.",
    date: "OCT 12, 2024",
    readTime: "5 MIN"
  },
  {
    id: 2,
    title: "Building Products That Last: From 0 to 1 in 90 Days",
    excerpt: "Speed without precision is chaos. Precision without speed is stagnation. Our framework for delivering exceptional products on aggressive timelines.",
    date: "NOV 04, 2024",
    readTime: "8 MIN"
  },
  {
    id: 3,
    title: "The Future of Digital Is Binary: Our 2025 Prediction",
    excerpt: "As AI commoditizes average work, the gap between 'good enough' and 'exceptional' will define market winners. The middle ground is dead.",
    date: "DEC 18, 2024",
    readTime: "6 MIN"
  }
];

export default function Blog() {
  return (
    <section id="blog" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Abstract background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Philosophy in <span className="text-primary font-mono glow-text-primary italic">Bits</span>
          </h2>
          <p className="text-muted-foreground font-mono text-sm max-w-md mx-auto uppercase tracking-widest">
            TRANSMISSIONS FROM THE CORE
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <motion.a
              href="#"
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="group relative block"
            >
              {/* The Floating "1" Container */}
              <div className="relative h-full p-8 border border-white/10 bg-black/50 backdrop-blur-sm transition-all duration-500 hover:-translate-y-4 hover:border-primary/50 hover:shadow-[0_20px_40px_-15px_rgba(0,245,255,0.2)]">
                
                {/* Background Giant 1 */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[200px] font-mono font-bold text-white/[0.02] group-hover:text-primary/[0.05] transition-colors pointer-events-none select-none">
                  1
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-center mb-8 font-mono text-[10px] text-white/40">
                    <span>{article.date}</span>
                    <span className="text-primary">{article.readTime} READ</span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4 leading-snug group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-8 line-clamp-3">
                    {article.excerpt}
                  </p>

                  <div className="mt-auto pt-6 border-t border-white/10 flex items-center justify-between font-mono text-xs font-bold text-white/50 group-hover:text-white transition-colors">
                    <span>READ_TRANSMISSION</span>
                    <motion.span 
                      className="text-primary"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      →
                    </motion.span>
                  </div>
                </div>

                {/* Particle Effects on Hover */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {/* Gather 1s around edges */}
                  <div className="absolute top-2 left-2 text-primary text-[8px] font-mono animate-ping">1</div>
                  <div className="absolute bottom-2 right-2 text-primary text-[8px] font-mono animate-ping" style={{ animationDelay: '200ms' }}>1</div>
                  <div className="absolute top-2 right-2 text-primary text-[8px] font-mono animate-ping" style={{ animationDelay: '400ms' }}>1</div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
