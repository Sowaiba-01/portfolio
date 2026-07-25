'use client';

export default function RobotMascot() {
  return (
    <div className="robot" aria-hidden="true">
      <svg className="robot-body" viewBox="0 0 80 96" width="70" height="84">
        {/* antenna */}
        <line x1="40" y1="15" x2="40" y2="5" stroke="var(--violet)" strokeWidth="2" strokeLinecap="round" />
        <circle className="robot-antenna" cx="40" cy="4" r="3" fill="var(--violet)" />
        {/* head */}
        <rect x="20" y="15" width="40" height="30" rx="10" fill="var(--panel)" stroke="var(--border2)" strokeWidth="1.5" />
        {/* eyes (look around together) */}
        <g className="robot-eyes">
          <circle className="robot-eye" cx="32" cy="30" r="3.6" fill="var(--cyan)" />
          <circle className="robot-eye" cx="48" cy="30" r="3.6" fill="var(--cyan)" />
        </g>
        {/* mouth */}
        <rect x="34" y="38" width="12" height="2.4" rx="1.2" fill="var(--dim)" />
        {/* body */}
        <rect x="24" y="47" width="32" height="28" rx="8" fill="var(--panel)" stroke="var(--border2)" strokeWidth="1.5" />
        <circle cx="40" cy="60" r="3.6" fill="var(--violet)" />
        {/* left arm */}
        <rect x="14" y="50" width="7.5" height="19" rx="3.75" fill="var(--panel)" stroke="var(--border2)" strokeWidth="1.5" />
        {/* right arm — waves */}
        <g className="robot-arm">
          <rect x="58.5" y="50" width="7.5" height="19" rx="3.75" fill="var(--panel)" stroke="var(--border2)" strokeWidth="1.5" />
        </g>
        {/* legs */}
        <rect x="30" y="75" width="7" height="14" rx="3.5" fill="var(--panel)" stroke="var(--border2)" strokeWidth="1.5" />
        <rect x="43" y="75" width="7" height="14" rx="3.5" fill="var(--panel)" stroke="var(--border2)" strokeWidth="1.5" />
      </svg>
      <div className="robot-shadow" />
    </div>
  );
}
