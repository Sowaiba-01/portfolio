'use client';
import { useRef, useState } from 'react';
import { retrieve } from '@/lib/rag';

const SUGGESTIONS = [
  'what has she built with LLMs?',
  'her education?',
  'medical AI work?',
  'how to contact her?',
];

export default function RagCard() {
  const [messages, setMessages] = useState([
    { cls: 'bot', body: <span>A TF-IDF retrieval engine over Sowaiba&apos;s real profile, ranked by cosine similarity, running entirely in your browser with no server involved. Ask away.</span> },
  ]);
  const [q, setQ] = useState('');
  const busy = useRef(false);
  const outRef = useRef(null);

  const scroll = () => {
    requestAnimationFrame(() => {
      if (outRef.current) outRef.current.scrollTop = outRef.current.scrollHeight;
    });
  };

  async function ask(query) {
    if (busy.current || !query.trim()) return;
    busy.current = true;
    setQ('');
    setMessages((m) => [...m, { cls: 'me', body: <span>{query}</span> }, { cls: 'bot', body: <span>retrieving…</span> }]);
    scroll();
    await new Promise((r) => setTimeout(r, 380));
    const hits = retrieve(query).filter((h) => h.score >= 0.03).slice(0, 2);
    const body = !hits.length ? (
      <span>I could not find that in my index. Try asking about her projects, skills, education, experience or how to reach her.</span>
    ) : (
      <span>
        {hits.map((h) => (
          <span key={h.c.id} style={{ display: 'block', marginBottom: 7 }}>
            <span className="src">{h.c.src} · cosine {h.score.toFixed(2)}</span>
            {h.c.text}
          </span>
        ))}
      </span>
    );
    setMessages((m) => [...m.slice(0, -1), { cls: 'bot', body }]);
    scroll();
    busy.current = false;
  }

  return (
    <>
      <div className="win-bar" aria-hidden="true"><i></i><i></i><i></i><span>rag_engine — this website&apos;s own retrieval system</span></div>
      <div className="inner">
        <h3>Ask anything about me</h3>
        <div className="rag2-out" ref={outRef}>
          {messages.map((m, i) => (
            <div className={'msg ' + m.cls} key={i}>{m.body}</div>
          ))}
        </div>
        <div className="rag2-sugg">
          {SUGGESTIONS.map((s) => (
            <button key={s} onClick={() => ask(s)}>{s}</button>
          ))}
        </div>
        <div className="rag2-in">
          <input value={q} onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') ask(q); }}
            placeholder="ask about my work…" aria-label="Ask a question" />
          <button onClick={() => ask(q)} aria-label="Send">→</button>
        </div>
      </div>
    </>
  );
}
