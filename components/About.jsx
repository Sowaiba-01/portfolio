'use client';
import { useEffect, useState } from 'react';
import { fetchGithubRepos } from '@/lib/github';

export default function About() {
  const [repos, setRepos] = useState(null);
  useEffect(() => { fetchGithubRepos().then(setRepos); }, []);

  return (
    <section id="about">
      <div className="sec reveal"><span className="path">~/about</span><h2>About</h2></div>
      <div className="about-grid">
        <div className="reveal">
          <p>I am an AI/ML Engineer and Software Developer specializing in Generative AI, particularly Large Language Models and Retrieval Augmented Generation systems. I graduated as a <strong>Silver Medalist</strong> in Software Engineering from UET Taxila with a <strong>3.94 CGPA</strong>.</p>
          <p>My experience includes optimizing inference latency, building evaluation frameworks that reduce hallucinations, and containerizing data pipelines for production environments. I combine a strong theoretical foundation in Deep Learning and Computer Vision with hands-on engineering experience across the stack.</p>
        </div>
        <div className="win facts reveal">
          <div className="row"><span className="k">cgpa</span><span className="val g">3.94 / 4.00 · silver medal</span></div>
          <div className="row"><span className="k">experience</span><span className="val">since 2022 · AI/ML since 2024</span></div>
          <div className="row"><span className="k">github</span><span className="val">{repos !== null ? `${repos} public repos` : '9+ public projects'}</span></div>
          <div className="row"><span className="k">huggingface</span><span className="val v">2K+ dataset downloads</span></div>
          <div className="row"><span className="k">focus</span><span className="val">LLMs · RAG · vision</span></div>
          <div className="row"><span className="k">status</span><span className="val g">open to opportunities</span></div>
        </div>
      </div>
    </section>
  );
}
