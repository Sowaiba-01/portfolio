// TF-IDF retrieval engine over Sowaiba's real profile — pure JS, runs in the browser
export const CHUNKS = [
  { id: 'about', src: 'about.md', kw: 'who is profile summary bio introduction engineer developer', text: 'Sowaiba Arshad is an AI/ML Engineer and Software Developer specializing in Generative AI, particularly Large Language Models LLMs and Retrieval Augmented Generation RAG systems.' },
  { id: 'edu', src: 'education.json', kw: 'education degree university bachelor bs studied study school academic qualification', text: 'She graduated as a Silver Medalist in Software Engineering from UET Taxila with a 3.94 CGPA, class of 2020 to 2024, with a Google AI Professional certification.' },
  { id: 'strength', src: 'about.md', kw: 'strengths capabilities good at specialization expertise production', text: 'Her experience includes optimizing inference latency, building evaluation frameworks that reduce hallucinations, and containerizing data pipelines for production environments with deep learning and computer vision foundations.' },
  { id: 'nic', src: 'experience/nic.md', kw: 'work job experience company employment backend fullstack automation', text: 'At National Incubation Center NIC Pakistan she worked as a Software Engineer from September 2022 to January 2024, building full-stack promotional workflows, integrating third-party APIs, containerizing data pipelines with Docker, and analyzing user behavioral metrics.' },
  { id: 'interns', src: 'experience/interns-pk.md', kw: 'work job experience company frontend web development', text: 'At Interns Pakistan she worked as a Frontend Developer building responsive web interfaces with HTML5 CSS3 and JavaScript, optimizing client-side rendering and cross-browser compatibility.' },
  { id: 'thorax', src: 'projects/thoraxnet.md', kw: 'project medical health healthcare xray radiology diagnosis model deployed auc accuracy', text: 'ThoraxNet is her production grade medical AI framework using BioMedCLIP ViT-B/16 for multi-label chest X-ray pathology detection, reaching mean AUC 0.8215 across 14 pathologies on NIH ChestX-ray14 with 112,120 images, with Monte Carlo Dropout uncertainty quantification, GradCAM explainability and auto-generated radiology reports, deployed live as an API on Hugging Face.' },
  { id: 'deepguard', src: 'projects/deepguard-xai.md', kw: 'project deepfake fake video detection explainability dataset model', text: 'DeepGuard-XAI is her deepfake detection platform built on a fine-tuned EfficientNet-B4 with GradCAM explainability showing where a video was manipulated, plus an InsightFace pipeline. Its companion deepfake dataset has over 2000 downloads on Hugging Face.' },
  { id: 'clinica', src: 'projects/clinicaquery-ai.md', kw: 'project rag retrieval llm clinical medical papers research assistant chatbot', text: 'ClinicaQuery-AI is her RAG assistant for querying clinical papers with strict source attribution and confidence scoring, built to reduce medical hallucinations in large language models.' },
  { id: 'swarm', src: 'projects/devops-swarm.md', kw: 'project agent agents autonomous devops automation coding', text: 'Devops-swarm is her autonomous AI developer agent built with LangGraph that spins up a secure cloud sandbox, writes code, runs tests, and self-corrects until the GitHub issue is solved.' },
  { id: 'nastp', src: 'experience/nastp.md', kw: 'work job experience company aiml ai ml engineer llm rag lora latency defence aerospace', text: 'At National Aerospace Science and Technology Park NASTP she worked as an AI/ML Engineer from February 2024 to December 2024, building Retrieval Augmented Generation pipelines over internal technical documentation with source citations, fine-tuning open source LLMs with LoRA, building evaluation suites for answer faithfulness, cutting inference latency through quantization and dynamic batching, and developing computer vision prototypes for defect detection.' },
  { id: 'independent', src: 'experience/independent.md', kw: 'work current now present recent independent freelance research self directed', text: 'Since January 2026 she has worked as an Independent AI/ML Engineer, designing training and deploying three production grade ML systems end to end: ThoraxNet, Devops-swarm and ClinicaQuery-AI, each shipped as a public inference API on Hugging Face Spaces.' },
  { id: 'skills', src: 'about.md', kw: 'skills technologies stack languages tools frameworks programming knows', text: 'Her skills include Python JavaScript TypeScript Java C# C++ SQL, PyTorch LLMs RAG deep learning computer vision LoRA fine-tuning uncertainty quantification and GradCAM explainability, Django React REST APIs, Docker Git GitHub Hugging Face Vercel and Linux.' },
  { id: 'contact', src: 'contact.sh', kw: 'contact email hire hiring reach message social links', text: 'You can contact Sowaiba by email at sowaibaarshad@gmail.com, on LinkedIn at sowaiba-arshad, on GitHub as Sowaiba-01, and on Hugging Face as Sowaiba01. She is open to full-time roles and internships.' },
  { id: 'status', src: 'about.md', kw: 'availability status open opportunities looking years experience stats', text: 'She has worked professionally since 2022 and in AI and machine learning roles since 2024, has 9 plus public projects on GitHub, and is currently open to opportunities in AI and machine learning engineering.' },
];

const STOP = new Set('the a an and or of to in on for with at by is are was were be been she her his has have had what who how tell me about does did can you your it its this that'.split(' '));
const tok = (t) => t.toLowerCase().replace(/[^a-z0-9#+.]/g, ' ').split(/\s+/).filter((w) => w.length > 1 && !STOP.has(w));

// build the tf-idf index once at module load
const N = CHUNKS.length;
const df = {};
CHUNKS.forEach((c) => {
  c.toks = tok(c.text + ' ' + (c.kw || '') + ' ' + (c.kw || ''));
  c.tf = {};
  c.toks.forEach((w) => { c.tf[w] = (c.tf[w] || 0) + 1; });
  Object.keys(c.tf).forEach((w) => { df[w] = (df[w] || 0) + 1; });
});
const idf = (w) => Math.log(1 + N / (df[w] || 1));
CHUNKS.forEach((c) => {
  c.vec = {};
  let norm = 0;
  Object.entries(c.tf).forEach(([w, f]) => {
    const v = f * idf(w);
    c.vec[w] = v;
    norm += v * v;
  });
  c.norm = Math.sqrt(norm) || 1;
});

export function retrieve(query) {
  const qt = tok(query);
  const qtf = {};
  qt.forEach((w) => { qtf[w] = (qtf[w] || 0) + 1; });
  let qnorm = 0;
  Object.entries(qtf).forEach(([w, f]) => {
    qtf[w] = f * idf(w);
    qnorm += qtf[w] * qtf[w];
  });
  qnorm = Math.sqrt(qnorm) || 1;
  return CHUNKS.map((c) => {
    let dot = 0;
    Object.entries(qtf).forEach(([w, v]) => { if (c.vec[w]) dot += v * c.vec[w]; });
    return { c, score: dot / (qnorm * c.norm) };
  }).sort((a, b) => b.score - a.score);
}
