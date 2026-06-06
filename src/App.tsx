import { useState, useEffect, lazy, Suspense } from "react";
import { Loader } from "@/components/portfolio/Loader";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";

const About = lazy(() => import("@/components/portfolio/About").then(m => ({ default: m.About })));
const Skills = lazy(() => import("@/components/portfolio/Skills").then(m => ({ default: m.Skills })));
const Projects = lazy(() => import("@/components/portfolio/Projects").then(m => ({ default: m.Projects })));
const Achievements = lazy(() => import("@/components/portfolio/Achievements").then(m => ({ default: m.Achievements })));
const Resume = lazy(() => import("@/components/portfolio/Resume").then(m => ({ default: m.Resume })));
const Contact = lazy(() => import("@/components/portfolio/Contact").then(m => ({ default: m.Contact })));
const Footer = lazy(() => import("@/components/portfolio/Footer").then(m => ({ default: m.Footer })));
const MusicToggle = lazy(() => import("@/components/portfolio/MusicToggle").then(m => ({ default: m.MusicToggle })));
const ArchiveOverlay = lazy(() => import("@/components/portfolio/ArchiveOverlay").then(m => ({ default: m.ArchiveOverlay })));

export default function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <div className="aurora" aria-hidden />
      <div className="grid-bg fixed inset-0 -z-10 opacity-20" aria-hidden />

      {!loaded && <Loader onDone={() => setLoaded(true)} />}

      <Navbar />
      <Hero />
      <Suspense fallback={<div className="h-32" />}>
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <Resume />
        <Contact />
        <Footer />
        <MusicToggle />
        <ArchiveOverlay />
      </Suspense>
    </main>
  );
}
