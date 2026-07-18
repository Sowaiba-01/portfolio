# Sowaiba Arshad — Portfolio (Next.js)

The same portfolio as `sowaiba-arshad.html`, rebuilt on Next.js 14 (App Router) with React components.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Deploy on Vercel

1. Push this folder to a GitHub repository.
2. Go to vercel.com, click "Add New Project", and import the repository.
3. Vercel detects Next.js automatically. Click Deploy. Done.

Every `git push` after that redeploys automatically.

## Structure

- `app/layout.js` — fonts, metadata, global CSS
- `app/page.js` — assembles the page
- `app/globals.css` — all styles (ported verbatim from the vanilla site)
- `components/` — StatusBar, Hero (boot log), About, Skills, Experience, Projects, Lab, Education
- `components/lab/` — ThoraxCard and DeepGuardCard (live Hugging Face model demos), AgentCard, RagCard
- `lib/rag.js` — the TF-IDF retrieval engine
- `lib/github.js` — cached GitHub profile fetch
