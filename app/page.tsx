import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import ResumeContact from "@/components/sections/Resume";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.22),transparent_35%),radial-gradient(circle_at_top_right,rgba(236,72,153,0.15),transparent_32%)]" />
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px]" />

      <div className="relative z-10 mx-auto w-[min(1180px,calc(100%-32px))]">
        <Navbar />
        <Hero />
        <About />
        <ResumeContact />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}