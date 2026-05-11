import { useState } from "react";
import BootLoader from "./components/BootLoader";
import Navbar from "./components/Navbar";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Certificates from "./components/sections/Certificates";
import Achievements from "./components/sections/Achievements";
import Resume from "./components/sections/Resume";
import Contact from "./components/sections/Contact";
import Footer from "./components/Footer";
import MusicToggle from "./components/MusicToggle";

export default function App() {
  const [booted, setBooted] = useState(false);

  return (
    <div className="relative min-h-screen">
      <div className="bg-aurora" />
      <div className="bg-grid" />
      {!booted && <BootLoader onDone={() => setBooted(true)} />}
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certificates />
        <Achievements />
        <Resume />
        <Contact />
      </main>
      <Footer />
      <MusicToggle />
    </div>
  );
}
