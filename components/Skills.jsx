const SKILLS = [
  ['ai_ml:', ['LLMs', 'RAG systems', 'PyTorch', 'deep learning', 'computer vision', 'data augmentation']],
  ['languages:', ['Python', 'JavaScript', 'TypeScript', 'Java', 'C#', 'C++', 'SQL']],
  ['web_backend:', ['HTML5', 'CSS3', 'Django', 'React', 'REST APIs', 'WordPress']],
  ['tools:', ['Docker', 'Git & GitHub', 'Hugging Face', 'Vercel', 'Linux']],
];

export default function Skills() {
  return (
    <section id="skills">
      <div className="sec reveal"><span className="path">~/skills</span><h2>Skills</h2></div>
      <div className="win reveal">
        <div className="win-bar" aria-hidden="true"><i></i><i></i><i></i><span>skills.yaml</span></div>
        <div className="skills-yaml">
          {SKILLS.map(([key, chips]) => (
            <div key={key}>
              <span className="key">{key}</span>{' '}
              {chips.map((c) => (
                <span className="chip" key={c}>{c}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
