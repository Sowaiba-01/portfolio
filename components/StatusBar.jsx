'use client';
import { useEffect, useState } from 'react';
import { fetchGithubRepos } from '@/lib/github';

const GMAIL = 'https://mail.google.com/mail/?view=cm&fs=1&to=sowaibaarshad@gmail.com&su=Hello%20Sowaiba';

const LINKS = [
  ['#about', 'about'],
  ['#experience', 'experience'],
  ['#projects', 'projects'],
  ['#lab', 'lab'],
  ['#education', 'education'],
];
const GITHUB_ICON = 'M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.4-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0C17.6 4.7 18.6 5 18.6 5c.6 1.6.2 2.8.1 3.1.7.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6a11.5 11.5 0 0 0 7.8-10.9C23.5 5.7 18.3.5 12 .5z';
const LINKEDIN_ICON = 'M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.2 8.4h4.6V24H.2zM8.6 8.4h4.4v2.1h.1c.6-1.2 2.1-2.4 4.4-2.4 4.7 0 5.5 3.1 5.5 7.1V24h-4.6v-7.7c0-1.8 0-4.2-2.6-4.2s-3 2-3 4V24H8.6z';
const HF_ICON = 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM8.5 9a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm7 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM7 14.5c1.3 1.7 3 2.5 5 2.5s3.7-.8 5-2.5c-1.5.8-3.2 1.2-5 1.2s-3.5-.4-5-1.2z';
const MAIL_ICON = 'M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5z';

const SOCIALS = [
  { href: 'https://github.com/Sowaiba-01', label: 'GitHub profile', name: 'github', icon: GITHUB_ICON, showRepos: true },
  { href: 'https://www.linkedin.com/in/sowaiba-arshad/', label: 'LinkedIn profile', name: 'linkedin', icon: LINKEDIN_ICON },
  { href: 'https://huggingface.co/Sowaiba01', label: 'Hugging Face profile', name: 'huggingface', icon: HF_ICON },
  { href: GMAIL, label: 'Email', name: 'email', icon: MAIL_ICON },
];

export default function StatusBar() {
  const [theme, setTheme] = useState('dark');
  const [repos, setRepos] = useState(null);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    let t = 'dark';
    try { t = localStorage.getItem('theme') || 'dark'; } catch (e) {}
    setTheme(t);
    document.documentElement.dataset.theme = t;
    fetchGithubRepos().then(setRepos);
  }, []);

  // close the mobile menu on Escape, and whenever the viewport grows past the breakpoint
  useEffect(() => {
    if (!menu) return;
    const onKey = (e) => { if (e.key === 'Escape') setMenu(false); };
    const onResize = () => { if (window.innerWidth > 768) setMenu(false); };
    addEventListener('keydown', onKey);
    addEventListener('resize', onResize);
    return () => { removeEventListener('keydown', onKey); removeEventListener('resize', onResize); };
  }, [menu]);

  const toggle = () => {
    const t = theme === 'dark' ? 'light' : 'dark';
    setTheme(t);
    document.documentElement.dataset.theme = t;
    try { localStorage.setItem('theme', t); } catch (e) {}
  };

  const Soc = ({ s }) => (
    <a className="soc" href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
      onClick={() => setMenu(false)}>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d={s.icon} /></svg>
      <span>{s.name}{s.showRepos && repos !== null && <b> · {repos}</b>}</span>
    </a>
  );

  return (
    <>
      <div className="statusbar">
        <a href="#home" className="sb-id" onClick={() => setMenu(false)}>
          sowaiba<span className="tld">@portfolio:~$</span>
        </a>

        <nav className="sb-nav" aria-label="Primary">
          {LINKS.map(([href, label]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>

        <div className="sb-right">
          <div className="sb-social">
            {SOCIALS.map((s) => <Soc s={s} key={s.name} />)}
          </div>
          <button className="sb-btn" onClick={toggle} aria-label="Toggle light and dark theme">
            {theme === 'dark' ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 1v3M12 20v3M1 12h3M20 12h3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" /></svg>
            )}
          </button>
          <button className="sb-burger" onClick={() => setMenu(!menu)}
            aria-label={menu ? 'Close menu' : 'Open menu'} aria-expanded={menu} aria-controls="mobileMenu">
            {menu ? (
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
            ) : (
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M3 7h18M3 12h18M3 17h18" /></svg>
            )}
          </button>
        </div>
      </div>

      <div className={'sb-sheet' + (menu ? ' on' : '')} id="mobileMenu">
        <nav aria-label="Mobile">
          {LINKS.map(([href, label]) => (
            <a key={href} href={href} onClick={() => setMenu(false)}>{label}</a>
          ))}
        </nav>
        <div className="sheet-soc">
          {SOCIALS.map((s) => <Soc s={s} key={s.name} />)}
        </div>
      </div>
      <div className={'sb-scrim' + (menu ? ' on' : '')} onClick={() => setMenu(false)} aria-hidden="true" />
    </>
  );
}
