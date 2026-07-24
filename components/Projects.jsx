const PROJECTS = [
  {
    name: 'ThoraxNet',
    href: 'https://github.com/Sowaiba-01/ThoraxNet',
    desc: 'Production grade medical AI framework using BioMedCLIP (ViT-B/16) for multi-label chest X-ray pathology detection, with Monte Carlo Dropout for uncertainty quantification.',
    stack: 'python · biomedclip',
    link: 'github ↗',
  },
  {
    name: 'DeepGuard-XAI',
    href: 'https://github.com/Sowaiba-01/DeepGuard-XAI',
    desc: 'Deepfake detection platform built on a fine-tuned EfficientNet-B4, with GradCAM explainability that shows exactly where a video was manipulated, plus an InsightFace pipeline.',
    stack: 'typescript · efficientnet',
    link: 'github ↗',
  },
  {
    name: 'ClinicaQuery-AI',
    href: 'https://github.com/Sowaiba-01/ClinicaQuery-AI',
    desc: 'RAG assistant for querying clinical papers with strict source attribution and confidence scoring, built to tame medical hallucinations in language models.',
    stack: 'typescript · rag · llms',
    link: 'github ↗',
  },
  {
    name: 'Devops-swarm',
    href: 'https://github.com/Sowaiba-01/Devops-swarm',
    desc: 'Autonomous AI developer that spins up a secure cloud sandbox, writes code, runs tests, and relentlessly self-corrects until the GitHub issue is solved. Built with LangGraph.',
    stack: 'python · langgraph',
    link: 'github ↗',
  },
  {
    name: 'Ask-My-Portfolio RAG',
    href: '#lab',
    desc: 'The retrieval engine running inside this site. A TF-IDF index over my profile with cosine ranking, running fully client-side with no server.',
    stack: 'tf-idf · ir · react',
    link: 'try below ↓',
  },
];

export default function Projects() {
  return (
    <section id="projects">
      <div className="sec reveal"><span className="path">~/projects</span><h2>Projects</h2></div>
      <div className="proj-grid">
        {PROJECTS.map((p) => (
          <a
            className="proj win reveal"
            href={p.href}
            key={p.name}
            {...(p.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            <div className="proj-body">
              <h3>{p.name}</h3>
              <p>{p.desc}</p>
              <div className="proj-meta"><span className="stack">{p.stack}</span><span className="lnk">{p.link}</span></div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
