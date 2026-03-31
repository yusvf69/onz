import { useEffect } from "react";
import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Founder from "@/components/sections/Founder";
import Portfolio from "@/components/sections/Portfolio";
import Blog from "@/components/sections/Blog";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  // Force dark mode on the document element
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="min-h-[100dvh] w-full bg-background text-foreground selection:bg-primary/30 selection:text-primary">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Founder />
        <Portfolio />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
