'use client';
import { useEffect, useState } from 'react';

const NODES = [
  { id: 'issue', x: 52, y: 58, label: 'issue' },
  { id: 'sandbox', x: 150, y: 58, label: 'sandbox' },
  { id: 'code', x: 248, y: 58, label: 'write code' },
  { id: 'test', x: 346, y: 58, label: 'tests' },
  { id: 'fix', x: 248, y: 160, label: 'self-correct' },
  { id: 'deploy', x: 346, y: 160, label: 'deploy' },
];
const EDGES = [
  ['issue', 'sandbox'], ['sandbox', 'code'], ['code', 'test'],
  ['test', 'fix'], ['fix', 'test'], ['test', 'deploy'],
];
const SEQ = [
  ['issue', '#8b7cf8', <span key="0">agent picked up issue #42</span>],
  ['sandbox', '#8b7cf8', <span key="1">spinning up secure sandbox…</span>],
  ['code', '#8b7cf8', <span key="2">writing patch with LangGraph…</span>],
  ['test', '#f47067', <span key="3"><b className="err">tests failed</b> · 2 assertions broken</span>],
  ['fix', '#e3b341', <span key="4">self-correcting the patch…</span>],
  ['test', '#3fb950', <span key="5"><b>tests passed</b> · 34/34 green</span>],
  ['deploy', '#3fb950', <span key="6"><b>deployed</b> · PR ready for review</span>],
];

export default function AgentCard() {
  const [step, setStep] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    setStarted(true);
    const t = setInterval(() => setStep((s) => (s + 1) % SEQ.length), 1400);
    return () => clearInterval(t);
  }, []);

  const activeId = SEQ[step][0];
  const activeColor = SEQ[step][1];
  const find = (id) => NODES.find((nd) => nd.id === id);

  return (
    <>
      <div className="win-bar" aria-hidden="true"><i></i><i></i><i></i><span>agent_loop.viz — devops-swarm</span></div>
      <div className="inner">
        <h3>A self-correcting agent</h3>
        <svg viewBox="0 0 420 230">
          {EDGES.map(([a, b]) => {
            const A = find(a), B = find(b);
            const dashed = a === 'fix' || (a === 'test' && b === 'fix');
            return (
              <line key={a + b} x1={A.x} y1={A.y} x2={B.x} y2={B.y}
                stroke="rgba(139,124,248,.3)" strokeWidth="1.5"
                strokeDasharray={dashed ? '4 4' : undefined} />
            );
          })}
          {NODES.map((nd) => {
            const on = started && nd.id === activeId;
            return (
              <g key={nd.id}>
                <circle cx={nd.x} cy={nd.y} r="14"
                  fill={on ? activeColor + '22' : '#0b0e14'}
                  stroke={on ? activeColor : '#5c6878'}
                  strokeWidth={on ? 3 : 1.5} />
                <text x={nd.x} y={nd.y + 30} textAnchor="middle" fill="#8b98ab"
                  fontSize="9.5" fontFamily="JetBrains Mono,monospace">{nd.label}</text>
              </g>
            );
          })}
        </svg>
        <div className="agent-status">{started ? SEQ[step][2] : 'booting agent…'}</div>
      </div>
    </>
  );
}
