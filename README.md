# Sowaiba Arshad · Portfolio

Live at [sowaibaarshad.com](https://sowaibaarshad.com)

I am an AI/ML Engineer and Software Developer specializing in Large Language Models, Retrieval Augmented Generation systems, and computer vision. Silver Medalist in Software Engineering at UET Taxila (CGPA 3.94/4.00). This repository is my portfolio website, built with Next.js 14 and React.

## What makes it different

The portfolio does not just describe my work, it runs it:

- **ThoraxNet, live**: upload a chest X-ray and my deployed BioMedCLIP (ViT-B/16) model returns probabilities for 14 pathologies with MC-Dropout uncertainty and an auto-generated radiology report, served from a Hugging Face Space
- **DeepGuard, live**: upload a face photo and my fine-tuned EfficientNet-B4 decides real or fake, with a GradCAM heatmap showing where the model looked, plus one-click samples from my own [Deepfake dataset](https://huggingface.co/datasets/Sowaiba01/Deepfake)
- **Ask-My-Portfolio RAG**: a TF-IDF retrieval engine with cosine ranking over my profile, written from scratch and running entirely in the visitor's browser
- **3D lab carousel**: drag-to-rotate card ring with pointer physics, snap animation, and a modal system that preserves component state
- Live GitHub stats in the boot sequence, light and dark themes, scroll reveal, keyboard navigation, and reduced-motion support

## Tech

Next.js 14 (App Router), React 18, plain CSS with custom properties for theming. No UI libraries. The retrieval engine and carousel math are hand-written modules in `lib/` and `components/Lab.jsx`.

## Structure

```
app/            layout, page, global styles
components/     StatusBar, Hero, About, Skills, Experience, Projects, Lab, Education
components/lab/ ThoraxCard, DeepGuardCard, AgentCard, RagCard
lib/            rag.js (TF-IDF engine), github.js (cached profile fetch)
```

## Run locally

```bash
npm install
npm run dev
```

## Related work

- [ThoraxNet](https://github.com/Sowaiba-01/ThoraxNet) · medical AI framework for chest X-ray pathology detection
- [DeepGuard-XAI](https://github.com/Sowaiba-01/DeepGuard-XAI) · deepfake detection with explainability
- [ClinicaQuery-AI](https://github.com/Sowaiba-01/ClinicaQuery-AI) · RAG over clinical papers with source attribution
- [Devops-swarm](https://github.com/Sowaiba-01/Devops-swarm) · autonomous self-correcting coding agent (LangGraph)
- [AgroVision-Net](https://github.com/Sowaiba-01/AgroVision-Net) · plant disease classification across 38 classes

## Contact

[LinkedIn](https://www.linkedin.com/in/sowaiba-arshad/) · [Hugging Face](https://huggingface.co/Sowaiba01) · sowaibaarshad@gmail.com
