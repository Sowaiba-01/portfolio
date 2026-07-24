import StatusBar from '@/components/StatusBar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Lab from '@/components/Lab';
import Education from '@/components/Education';
import RevealInit from '@/components/RevealInit';

export default function Page() {
  return (
    <>
      <a className="skip" href="#main">skip to content</a>
      <StatusBar />
      <Hero />
      <main className="container" id="main">
        <About />
        <Experience />
        <Projects />
        <Lab />
        <Education />
        <footer className="foot">
          <span>© 2026 sowaiba arshad · all rights reserved</span>
        </footer>
      </main>
      <RevealInit />
    </>
  );
}
