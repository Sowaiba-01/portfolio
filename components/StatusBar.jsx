'use client';
import { useEffect, useState } from 'react';
import { fetchGithubRepos } from '@/lib/github';

const GMAIL = 'https://mail.google.com/mail/?view=cm&fs=1&to=sowaibaarshad@gmail.com&su=Hello%20Sowaiba';

export default function StatusBar() {
  const [theme, setTheme] = useState('dark');
  const [repos, setRepos] = useState(null);

  useEffect(() => {
    let t = 'dark';
    try { t = localStorage.getItem('theme') || 'dark'; } catch (e) {}
    setTheme(t);
    document.documentElement.dataset.theme = t;
    fetchGithubRepos().then(setRepos);
  }, []);

  const toggle = () => {
    const t = theme === 'dark' ? 'light' : 'dark';
    setTheme(t);
    document.documentElement.dataset.theme = t;
    try { localStorage.setItem('theme', t); } catch (e) {}
  };

  return (
    <div className="statusbar">
      <a href="#home" className="sb-id">sowaiba<span className="tld">@portfolio:~$</span></a>
      <nav className="sb-nav" aria-label="Primary">
        <a href="#about">about</a>
        <a href="#skills">skills</a>
        <a href="#experience">experience</a>
        <a href="#projects">projects</a>
        <a href="#lab">lab</a>
        <a href="#education">education</a>
      </nav>
      <div className="sb-right">
        <div className="sb-social">
          <a className="soc" href="https://github.com/Sowaiba-01" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.4-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0C17.6 4.7 18.6 5 18.6 5c.6 1.6.2 2.8.1 3.1.7.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6a11.5 11.5 0 0 0 7.8-10.9C23.5 5.7 18.3.5 12 .5z" /></svg>
            <span>github {repos !== null && <b>· {repos}</b>}</span>
          </a>
          <a className="soc" href="https://www.linkedin.com/in/sowaiba-arshad/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.2 8.4h4.6V24H.2zM8.6 8.4h4.4v2.1h.1c.6-1.2 2.1-2.4 4.4-2.4 4.7 0 5.5 3.1 5.5 7.1V24h-4.6v-7.7c0-1.8 0-4.2-2.6-4.2s-3 2-3 4V24H8.6z" /></svg>
            <span>linkedin</span>
          </a>
          <a className="soc" href="https://huggingface.co/Sowaiba01" target="_blank" rel="noopener noreferrer" aria-label="Hugging Face profile">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM8.5 9a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm7 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM7 14.5c1.3 1.7 3 2.5 5 2.5s3.7-.8 5-2.5c-1.5.8-3.2 1.2-5 1.2s-3.5-.4-5-1.2z" /></svg>
            <span>huggingface</span>
          </a>
          <a className="soc" href={GMAIL} target="_blank" rel="noopener noreferrer" aria-label="Email">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5z" /></svg>
            <span>email</span>
          </a>
        </div>
        <button className="sb-btn" onClick={toggle} aria-label="Toggle light and dark theme">
          {theme === 'dark' ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 1v3M12 20v3M1 12h3M20 12h3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" /></svg>
          )}
        </button>
      </div>
    </div>
  );
}
