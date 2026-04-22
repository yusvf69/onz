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

declare global {
  interface Navigator {
    modelContext?: {
      provideContext: (context: {
        serverInfo: { name: string; version: string };
        capabilities: {
          tools?: Array<{
            name: string;
            description: string;
            inputSchema: object;
            execute: (args: object) => Promise<unknown>;
          }>;
          resources?: Array<{ uri: string; name: string; description: string }>;
        };
      }) => void;
    };
  }
}

async function provideTools() {
  if (typeof navigator !== "undefined" && navigator.modelContext) {
    await navigator.modelContext.provideContext({
      serverInfo: {
        name: "Digital Persona Core",
        version: "1.0.0",
      },
      capabilities: {
        tools: [
          {
            name: "contact_form",
            description: "Submit a contact form to get in touch",
            inputSchema: {
              type: "object",
              properties: {
                name: { type: "string" },
                email: { type: "string" },
                type: { type: "string" },
                message: { type: "string" },
              },
              required: ["name", "email", "type", "message"],
            },
            execute: async (args: { name: string; email: string; type: string; message: string }) => {
              const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(args),
              });
              return res.json();
            },
          },
          {
            name: "navigate_to",
            description: "Navigate to a specific page on the website",
            inputSchema: {
              type: "object",
              properties: {
                page: { type: "string", enum: ["home", "about", "services", "portfolio", "blog", "contact", "founder"] },
              },
              required: ["page"],
            },
            execute: async (args: { page: string }) => {
              const routes: Record<string, string> = {
                home: "/",
                about: "/about",
                services: "/services",
                portfolio: "/portfolio",
                blog: "/blog",
                contact: "/contact",
                founder: "/founder",
              };
              window.location.href = routes[args.page] || "/";
              return { success: true, url: routes[args.page] };
            },
          },
          {
            name: "get_services",
            description: "Get list of available services",
            inputSchema: { type: "object", properties: {} },
            execute: async () => {
              return {
                services: [
                  { name: "Web Development", description: "Modern websites and web apps" },
                  { name: "Mobile Apps", description: "iOS and Android applications" },
                  { name: "AI Solutions", description: "AI integration and automation" },
                  { name: "Consulting", description: "Technical consultation and strategy" },
                ],
              };
            },
          },
        ],
        resources: [
          { uri: "/about", name: "about", description: "Company information" },
          { uri: "/services", name: "services", description: "Service catalog" },
          { uri: "/portfolio", name: "portfolio", description: "Portfolio projects" },
        ],
      },
    });
  }
}

export default function Home() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    provideTools();
  }, []);

  return (
    <div className="min-h-[100dvh] w-full bg-background text-foreground selection:bg-primary selection:text-background">
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