'use client';
import { useEffect, useRef } from 'react';
import { fetchGithubRepos } from '@/lib/github';

const GMAIL = 'https://mail.google.com/mail/?view=cm&fs=1&to=sowaibaarshad@gmail.com&su=Hello%20Sowaiba';

export default function Hero() {
  const logRef = useRef(null);
  const typedRef = useRef(null);

  useEffect(() => {
    // restartable: strict-mode dev double-mount cancels the first run and starts clean
    const log = logRef.current;
    log.textContent = '';
    let alive = true;
    let gh = 'github: connecting…';
    fetchGithubRepos().then((n) => {
      gh = n !== null ? `github: ${n} public repos (live)` : 'github: Sowaiba-01 · connected';
    });
    const lines = () => [
      ['$ ./init sowaiba.dev', 'p'],
      ['[ ok ] role: ai/ml engineer · software developer', 'ok'],
      ['[ ok ] ' + gh, 'ok'],
      ['[ ok ] huggingface: 2K+ dataset downloads', 'ok'],
      ['[ ok ] honors: silver medalist · cgpa 3.94/4.00', 'ok'],
    ];
    let li = 0;
    const timers = [];
    const later = (fn, ms) => timers.push(setTimeout(() => { if (alive) fn(); }, ms));

    function prompt() {
      const ph = ['RAG retrieval pipelines', 'ViT-B/16 attention maps', 'LoRA fine-tunes', 'inference latency', 'hallucination eval suites', 'EfficientNet backbones'];
      const el = typedRef.current;
      if (!el) return;
      let p = 0, c = 0, del = false;
      (function t() {
        if (!typedRef.current) return;
        const w = ph[p];
        el.textContent = w.slice(0, c);
        if (!del && c < w.length) { c++; later(t, 60); }
        else if (!del) { del = true; later(t, 1800); }
        else if (c > 0) { c--; later(t, 28); }
        else { del = false; p = (p + 1) % ph.length; later(t, 300); }
      })();
    }

    function typeLine() {
      if (!logRef.current) return;
      if (li >= lines().length) {
        document.body.classList.add('booted');
        prompt();
        return;
      }
      const [txt, cls] = lines()[li];
      const span = document.createElement('span');
      span.className = cls;
      log.appendChild(span);
      log.appendChild(document.createTextNode('\n'));
      let c = 0;
      (function ch() {
        if (!logRef.current) return;
        span.textContent = txt.slice(0, c);
        if (c < txt.length) { c += 2; later(ch, 11); }
        else { li++; later(typeLine, 130); }
      })();
    }
    later(typeLine, 350);
    return () => { alive = false; timers.forEach(clearTimeout); };
  }, []);

  return (
    <header className="hero container" id="home">
      <div>
        <pre className="bootlog" ref={logRef} aria-hidden="true"></pre>
        <h1 className="postboot">Sowaiba <span className="v">Arshad</span></h1>
        <div className="promptbar postboot" aria-hidden="true">
          <span className="pp">&gt;</span> optimizing: <span id="typed" ref={typedRef}></span><span className="cur">▍</span>
        </div>
        <p className="desc postboot">
          I&apos;m an <b>AI/ML Engineer and Software Developer</b> specializing in Large Language Models and Retrieval Augmented Generation systems. <b>Silver Medalist</b> in Software Engineering at UET Taxila.
        </p>
        <div className="hero-cta postboot">
          <a className="btn solid" href="#projects">view projects</a>
          <a className="btn" href={GMAIL} target="_blank" rel="noopener noreferrer">get in touch</a>
        </div>
      </div>
    </header>
  );
}
