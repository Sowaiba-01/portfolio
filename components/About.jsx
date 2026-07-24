const SKILLS = [
  'Python', 'PyTorch', 'TensorFlow', 'LLMs', 'RAG systems', 'LangChain',
  'Transformers', 'Fine-tuning (LoRA)', 'Computer Vision', 'Model Deployment',
  'TypeScript', 'React', 'Next.js', 'FastAPI', 'Docker', 'Hugging Face', 'Git',
];

export default function About() {
  return (
    <section id="about">
      <div className="sec reveal"><span className="path">~/about</span><h2>About Me</h2></div>
      <div className="about-grid">
        <div className="about-col reveal">
          <p>
            I am an <strong>AI/ML Software Engineer</strong> who takes models from research to production.
            Computer vision, large language models, and retrieval systems, trained end to end and deployed
            live, backed by strong deep learning and full-stack foundations.
          </p>

          <p className="about-lead">Some technologies I work with:</p>
          <ul className="tech-list">
            {SKILLS.map((s, i) => (
              <li key={s} style={{ animationDelay: `${i * 0.045}s` }}>{s}</li>
            ))}
          </ul>
        </div>

        <div className="win facts reveal" aria-label="Highlights">
          <div className="row"><span className="k">honors</span><span className="val g">Silver Medalist · 3.94 CGPA</span></div>
          <div className="row"><span className="k">experience</span><span className="val">2+ years</span></div>
          <div className="row"><span className="k">hf datasets</span><span className="val v">2K+ downloads</span></div>
          <div className="row"><span className="k">hf models</span><span className="val v">14K+ downloads</span></div>
        </div>
      </div>
    </section>
  );
}
