'use client';
import { useEffect, useRef } from 'react';
import { fetchGithubRepos } from '@/lib/github';

const GMAIL = 'https://mail.google.com/mail/?view=cm&fs=1&to=sowaibaarshad@gmail.com&su=Hello%20Sowaiba';

export default function Hero() {
  const logRef = useRef(null);

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
      ['[ ok ] huggingface: 2K+ dataset · 14K+ model downloads', 'ok'],
      ['[ ok ] honors: silver medalist · cgpa 3.94/4.00', 'ok'],
    ];
    let li = 0;
    const timers = [];
    const later = (fn, ms) => timers.push(setTimeout(() => { if (alive) fn(); }, ms));

    function typeLine() {
      if (!logRef.current) return;
      if (li >= lines().length) {
        document.body.classList.add('booted');
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
        if (c < txt.length) { c += 3; later(ch, 9); }
        else { li++; later(typeLine, 90); }
      })();
    }
    later(typeLine, 120);
    return () => { alive = false; timers.forEach(clearTimeout); };
  }, []);

  return (
    <header className="hero container" id="home">
      <div className="hero-left">
        <pre className="bootlog" ref={logRef} aria-hidden="true"></pre>
        <h1 className="postboot">hi, <span className="v">Sowaiba</span> here.<span className="cur">▍</span></h1>
        <p className="desc postboot">
          <b>AI/ML Software Engineer</b> turning research-grade models into production systems.
          Computer vision, LLMs, RAG, and autonomous agents, trained end to end and shipped live.
          I care about models that are reliable enough to actually trust.
        </p>
        <div className="hero-cta postboot">
          <a className="btn solid" href={GMAIL} target="_blank" rel="noopener noreferrer">say hi</a>
        </div>
        <div className="hero-rule postboot" />
      </div>
      <div className="hero-right postboot">
        <div className="hero-portrait">
          <svg className="hp-blob" viewBox="0 0 400 400" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
            <path fill="var(--violet)" d="M296,58 C352,84 386,150 380,214 C374,282 330,332 268,354 C206,376 130,372 78,332 C30,296 8,224 30,158 C52,92 112,50 178,42 C224,36 262,42 296,58 Z" />
          </svg>
          <div className="hp-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/portrait.jpg" alt="Sowaiba Arshad" />
          </div>
        </div>
      </div>
    </header>
  );
}
