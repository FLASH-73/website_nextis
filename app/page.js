import ReactiveBackground from "@/components/ReactiveBackground";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Contact from "@/components/Contact";

import LanguageToggle from "@/components/LanguageToggle";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <LanguageToggle />
      <ReactiveBackground />
      <Hero />
      <About />
      <Contact />
    </main>
  );
}
