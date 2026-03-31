import { motion } from 'framer-motion';

const articles = [
  {
    id: 1,
    tag: "PHILOSOPHY",
    title: "Why We Chose 1 Over 0",
    excerpt: "In a digital landscape filled with templates and shortcuts, committing to true value requires radical discipline.",
    author: "THE FOUNDER",
    date: "OCT 12, 2024"
  },
  {
    id: 2,
    tag: "METHODOLOGY",
    title: "From 0 to 1 in 90 Days",
    excerpt: "Speed without precision is chaos. Precision without speed is stagnation.",
    author: "SYSTEM",
    date: "NOV 04, 2024"
  },
  {
    id: 3,
    tag: "PREDICTION",
    title: "The Future of Digital is Binary",
    excerpt: "As AI commoditizes average work, the gap between 'good enough' and 'exceptional' will define winners.",
    author: "SYSTEM",
    date: "DEC 18, 2024"
  }
];

export default function Blog() {
  return (
    <section id="blog" className="relative bg-[#FAF7F0] py-32 overflow-hidden text-[#080808]">
      
      <div className="absolute inset-0 dot-grid opacity-[0.05] pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        <div className="mb-16 border-t-4 border-[#080808] pt-4">
          <h2 className="font-display text-5xl tracking-tight">06 / INSIGHTS</h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Featured Article */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:w-[60%] border border-[#080808] p-8 md:p-12 relative group cursor-pointer bg-white hover:-translate-y-2 transition-transform duration-300"
            data-testid={`card-article-${articles[0].id}`}
            onClick={() => {}}
          >
            <div className="absolute bottom-4 right-4 text-[200px] font-display text-primary opacity-[0.03] leading-none pointer-events-none group-hover:text-[#0066FF] transition-colors">1</div>
            
            <div className="font-mono-custom text-xs font-bold text-primary mb-8 tracking-widest">[{articles[0].tag}]</div>
            <h3 className="font-editorial italic text-4xl md:text-5xl lg:text-6xl leading-tight mb-8 group-hover:text-primary transition-colors">{articles[0].title}</h3>
            <p className="font-sans text-lg font-light max-w-lg mb-16">{articles[0].excerpt}</p>
            
            <div className="flex items-center justify-between border-t border-[#080808]/20 pt-6">
              <div className="font-mono-custom text-[10px] tracking-widest text-[#080808]/60">
                {articles[0].author} // {articles[0].date}
              </div>
              <span className="font-mono-custom font-bold text-primary" data-testid={`link-read-article-${articles[0].id}`}>READ MORE →</span>
            </div>
          </motion.div>

          {/* Small Articles */}
          <div className="lg:w-[40%] flex flex-col gap-8">
            {articles.slice(1).map((article, i) => (
              <motion.div 
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (i + 1) * 0.2 }}
                className="flex-1 border border-[#080808] p-8 relative group cursor-pointer bg-white hover:-translate-y-2 transition-transform duration-300 flex flex-col"
                data-testid={`card-article-${article.id}`}
                onClick={() => {}}
              >
                <div className="absolute bottom-4 right-4 text-[120px] font-display text-primary opacity-[0.03] leading-none pointer-events-none group-hover:text-[#0066FF] transition-colors">1</div>
                
                <div className="font-mono-custom text-[10px] font-bold text-primary mb-6 tracking-widest">[{article.tag}]</div>
                <h3 className="font-editorial italic text-2xl md:text-3xl leading-tight mb-4 group-hover:text-primary transition-colors">{article.title}</h3>
                <p className="font-sans text-sm font-light mb-8 flex-1">{article.excerpt}</p>
                
                <div className="flex items-center justify-between border-t border-[#080808]/20 pt-4 mt-auto">
                  <div className="font-mono-custom text-[9px] tracking-widest text-[#080808]/60">
                    {article.author} // {article.date}
                  </div>
                  <span className="font-mono-custom text-xs font-bold text-primary" data-testid={`link-read-article-${article.id}`}>READ →</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="w-full h-[1px] bg-[#080808] mt-24"></div>
      </div>
    </section>
  );
}