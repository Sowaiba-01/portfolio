import './globals.css';

export const metadata = {
  title: 'Sowaiba Arshad | AI/ML Engineer & Software Developer',
  description:
    'Portfolio of Sowaiba Arshad, an AI/ML Engineer and Software Developer specializing in LLMs, RAG systems, and computer vision. Silver Medalist at UET Taxila.',
  icons: { icon: '/favicon.png' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
