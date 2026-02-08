import ReactiveBackground from "@/components/ReactiveBackground";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Product from "@/components/Product";
import Vision from "@/components/Vision";
import Contact from "@/components/Contact";

import LanguageToggle from "@/components/LanguageToggle";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <LanguageToggle />
      <ReactiveBackground />
      <Hero />
      <Problem />
      <Product />
      <Vision />
      <Contact />
    </main>
  );
}
