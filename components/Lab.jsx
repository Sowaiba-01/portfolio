'use client';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import ThoraxCard from '@/components/lab/ThoraxCard';
import DeepGuardCard from '@/components/lab/DeepGuardCard';
import AgentCard from '@/components/lab/AgentCard';
import RagCard from '@/components/lab/RagCard';

const CARDS = [
  { title: 'ThoraxNet · live medical model', live: true, node: <ThoraxCard /> },
  { title: 'DeepGuard · deepfake detection', live: true, node: <DeepGuardCard /> },
  { title: 'Devops-swarm · self-correcting agent', live: false, node: <AgentCard /> },
  { title: 'Ask-My-Portfolio · RAG', live: false, node: <RagCard /> },
];

export default function Lab() {
  const [mounted, setMounted] = useState(false);
  const [entered, setEntered] = useState(false);
  const [act, setAct] = useState(0);
  const [openIdx, setOpenIdx] = useState(null);

  const wrapRef = useRef(null);
  const lmBodyRef = useRef(null);
  const holdersRef = useRef(null);
  const engineRef = useRef({});

  // create the persistent card holder divs once, client-side only
  if (mounted && !holdersRef.current) {
    holdersRef.current = CARDS.map((c) => {
      const d = document.createElement('div');
      d.className = 'win lab-card car-item preview' + (c.live ? ' lab-live' : '');
      d.dataset.title = c.title;
      return d;
    });
  }
  useEffect(() => { setMounted(true); }, []);

  // carousel engine — runs once the lab is entered
  useEffect(() => {
    if (!entered || !holdersRef.current) return;
    const wrap = wrapRef.current;
    const cards = holdersRef.current;
    cards.forEach((c) => wrap.appendChild(c));

    let pos = 0, dragging = false, dragged = false, snapRaf = null, open = false;
    const n = () => cards.length;
    const mod = (v) => ((v % n()) + n()) % n();

    function styleAt(c, off) {
      const a = Math.abs(off);
      if (a > 2.2) {
        c.style.opacity = '0'; c.style.pointerEvents = 'none'; c.style.zIndex = '0';
        c.style.transform = 'translateX(-50%) translateZ(-320px) scale(.62)'; c.style.filter = 'none';
        return;
      }
      const tx = -50 + off * 56;
      const tz = a <= 1 ? -170 * a : -170 - 150 * (a - 1);
      const ry = -22 * Math.max(-1, Math.min(1, off));
      const sc = a <= 1 ? 1 - 0.2 * a : 0.8 - 0.18 * (a - 1);
      const op = a <= 1 ? 1 - 0.6 * a : Math.max(0, 0.4 - 0.4 * (a - 1));
      c.style.transform = `translateX(${tx}%) translateZ(${tz}px) rotateY(${ry}deg) scale(${sc})`;
      c.style.opacity = op.toFixed(3);
      c.style.zIndex = String(10 - Math.round(a * 3));
      c.style.filter = a > 0.45 ? 'blur(1px)' : 'none';
      c.style.pointerEvents = a < 1.5 ? 'auto' : 'none';
    }
    function render() {
      cards.forEach((c, i) => {
        let off = mod(i - pos);
        if (off > n() / 2) off -= n();
        styleAt(c, off);
      });
      setAct(mod(Math.round(pos)));
    }
    const setTrans = (on) => cards.forEach((c) => { c.style.transition = on ? '' : 'none'; });
    function snapTo(target) {
      cancelAnimationFrame(snapRaf);
      setTrans(false);
      (function tick() {
        const diff = target - pos;
        if (Math.abs(diff) < 0.003) { pos = target; render(); setTrans(true); return; }
        pos += diff * 0.16;
        render();
        snapRaf = requestAnimationFrame(tick);
      })();
    }
    function goTo(i) {
      let diff = mod(i - pos);
      if (diff > n() / 2) diff -= n();
      snapTo(pos + diff);
    }
    const step = (d) => snapTo(Math.round(pos) + d);

    let px = 0, moved = 0;
    const onDown = (e) => {
      if (open) return;
      if (e.button) return;
      if (e.target.closest('.car-nav')) return;
      dragging = true; dragged = false; px = e.clientX; moved = 0;
      cancelAnimationFrame(snapRaf); setTrans(false);
    };
    const onMove = (e) => {
      if (!dragging) return;
      const dx = e.clientX - px; px = e.clientX; moved += Math.abs(dx);
      if (moved > 8 && !dragged) { dragged = true; wrap.classList.add('dragging'); }
      if (dragged) { pos -= dx / 300; render(); }
    };
    const endDrag = () => {
      if (!dragging) return;
      dragging = false; wrap.classList.remove('dragging');
      if (dragged) snapTo(Math.round(pos));
      else setTrans(true);
    };
    const clickCapture = (e) => {
      if (dragged) { e.stopPropagation(); e.preventDefault(); dragged = false; }
    };
    const onKey = (e) => {
      if (open) return;
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
    };

    function openModal(i) {
      const c = cards[i];
      open = true;
      c.__slot = document.createComment('slot');
      c.parentElement.insertBefore(c.__slot, c);
      lmBodyRef.current.appendChild(c);
      c.classList.remove('preview');
      document.body.style.overflow = 'hidden';
      setOpenIdx(i);
    }
    function closeModal() {
      const i = cards.findIndex((c) => c.parentElement === lmBodyRef.current);
      if (i >= 0) {
        const c = cards[i];
        c.classList.add('preview');
        c.__slot.parentElement.insertBefore(c, c.__slot);
        c.__slot.remove();
      }
      document.body.style.overflow = '';
      open = false;
      setOpenIdx(null);
      render();
    }
    const cardClicks = cards.map((c, i) => {
      const h = () => {
        if (open || dragging) return;
        let off = mod(i - Math.round(pos));
        if (off > n() / 2) off -= n();
        if (off !== 0) { goTo(i); return; }
        openModal(i);
      };
      c.addEventListener('click', h);
      return h;
    });

    engineRef.current = { step, goTo, closeModal };

    wrap.addEventListener('pointerdown', onDown);
    addEventListener('pointermove', onMove);
    addEventListener('pointerup', endDrag);
    addEventListener('pointercancel', endDrag);
    wrap.addEventListener('click', clickCapture, true);
    addEventListener('keydown', onKey);

    cards.forEach((c) => { c.style.transform = 'translateX(-50%) scale(.5)'; c.style.opacity = '0'; });
    requestAnimationFrame(() => requestAnimationFrame(render));

    return () => {
      cancelAnimationFrame(snapRaf);
      wrap.removeEventListener('pointerdown', onDown);
      removeEventListener('pointermove', onMove);
      removeEventListener('pointerup', endDrag);
      removeEventListener('pointercancel', endDrag);
      wrap.removeEventListener('click', clickCapture, true);
      removeEventListener('keydown', onKey);
      cards.forEach((c, i) => c.removeEventListener('click', cardClicks[i]));
    };
  }, [entered]);

  // escape closes the modal
  useEffect(() => {
    const h = (e) => {
      if (e.key === 'Escape' && openIdx !== null) engineRef.current.closeModal();
    };
    addEventListener('keydown', h);
    return () => removeEventListener('keydown', h);
  }, [openIdx]);

  return (
    <section id="lab">
      <div className="sec reveal"><span className="path">~/lab</span><h2>Live Lab</h2></div>
      {!entered && (
        <div className="lab-intro reveal">
          <p>Four experiments: <b>two deployed models answering over the network</b>, a retrieval engine running in your browser, and visualizations written by hand.</p>
          <button className="btn solid" onClick={() => setEntered(true)}>enter the lab</button>
        </div>
      )}
      <div className={'lab-stage' + (entered ? ' on' : '')}>
        <div className="car-wrap" ref={wrapRef}>
          <button className="car-nav prev" aria-label="Previous experiment" onClick={() => engineRef.current.step && engineRef.current.step(-1)}>‹</button>
          <button className="car-nav next" aria-label="Next experiment" onClick={() => engineRef.current.step && engineRef.current.step(1)}>›</button>
        </div>
        <div className="car-cap">now facing: <b>{CARDS[act].title}</b> · drag to rotate · click the front card to open it</div>
        <div className="car-dots">
          {CARDS.map((c, i) => (
            <i key={c.title} className={i === act ? 'act' : ''} onClick={() => engineRef.current.goTo && engineRef.current.goTo(i)} />
          ))}
        </div>
      </div>
      <div id="labModal" className={openIdx !== null ? 'on' : ''} role="dialog" aria-label="Lab experiment"
        onClick={(e) => { if (e.target.id === 'labModal') engineRef.current.closeModal(); }}>
        <button className="lm-close" aria-label="Close experiment" onClick={() => engineRef.current.closeModal()}>✕</button>
        <div id="lmBody" ref={lmBodyRef}></div>
      </div>
      {mounted && holdersRef.current &&
        CARDS.map((c, i) => createPortal(c.node, holdersRef.current[i], c.title))}
    </section>
  );
}
