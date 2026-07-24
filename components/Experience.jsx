'use client';
import { useState } from 'react';

const JOBS = [
  {
    tab: 'Independent',
    role: 'Independent AI/ML Engineer',
    org: null,
    date: 'JAN 2026 – PRESENT',
    points: [
      'Designed, trained, and deployed three production grade ML systems end to end, from dataset preparation to public inference APIs on Hugging Face Spaces.',
      'ThoraxNet: chest X-ray classifier (BioMedCLIP ViT-B/16) at mean AUC 0.8215 across 14 pathologies, with MC-Dropout uncertainty and auto-generated radiology reports.',
      'Devops-swarm: autonomous LangGraph agent that provisions a sandbox, writes code, runs tests, and iterates until a GitHub issue passes.',
      'ClinicaQuery-AI: RAG assistant returning per-claim citations and confidence scores, refusing to answer below a retrieval threshold.',
    ],
    stack: 'pytorch · biomedclip · langgraph · rag · hugging face',
  },
  {
    tab: 'NASTP',
    role: 'AI/ML Engineer',
    org: 'NASTP',
    date: 'FEB 2024 – DEC 2024',
    points: [
      'Built RAG pipelines over internal technical documentation with chunking, embedding indexing, and cosine retrieval, attaching a source citation to every answer.',
      'Fine-tuned open-source LLMs with LoRA for domain question answering, plus an evaluation suite scoring answer faithfulness on a held-out set.',
      'Cut inference latency on production endpoints through post-training quantization and dynamic request batching.',
      'Developed computer-vision prototypes for defect and anomaly detection using PyTorch transfer learning on EfficientNet backbones.',
      'Containerized training and inference with Docker and served models as REST APIs for internal teams.',
    ],
    stack: 'rag · lora · llms · pytorch · docker · rest apis',
  },
  {
    tab: 'NIC Pakistan',
    role: 'Software Engineer',
    org: 'National Incubation Center',
    date: 'SEP 2022 – JAN 2024',
    points: [
      'Built full-stack marketing automation workflows integrating third-party APIs with custom backend logic.',
      'Containerized data pipelines and audience-tracking services with Docker for consistent deployment across environments.',
      'Analyzed behavioral metrics and API data patterns to optimize internal targeting tools.',
    ],
    stack: 'full-stack · docker · rest apis · data pipelines',
  },
  {
    tab: 'Interns Pakistan',
    role: 'Frontend Developer',
    org: 'Interns Pakistan',
    date: 'AUG 2022 – OCT 2022',
    points: [
      'Developed and deployed responsive web interfaces in HTML5, CSS3, and JavaScript, translating mockups into production pages.',
      'Optimized client-side rendering and cross-browser compatibility across desktop and mobile targets.',
    ],
    stack: 'html5 · css3 · javascript',
  },
];

export default function Experience() {
  const [act, setAct] = useState(0);
  const j = JOBS[act];

  return (
    <section id="experience">
      <div className="sec reveal"><span className="path">~/experience</span><h2>Experience</h2></div>
      <div className="xp-wrap reveal">
        <div className="xp-tabs" role="tablist" aria-label="Employers">
          {JOBS.map((job, i) => (
            <button
              key={job.tab}
              role="tab"
              aria-selected={i === act}
              className={'xp-tab' + (i === act ? ' act' : '')}
              onClick={() => setAct(i)}
            >
              {job.tab}
            </button>
          ))}
        </div>
        <div className="xp-panel" role="tabpanel">
          <h3 className="xp-role">
            {j.role}
            {j.org && (<>{' '}<span className="at">@</span> <span className="org">{j.org}</span></>)}
          </h3>
          <div className="xp-date">{j.date}</div>
          <ul key={act}>
            {j.points.map((p, i) => (
              <li key={i} style={{ animationDelay: `${0.06 + i * 0.09}s` }}>{p}</li>
            ))}
          </ul>
          <div className="xp-tags">stack: <b>{j.stack}</b></div>
        </div>
      </div>
    </section>
  );
}
