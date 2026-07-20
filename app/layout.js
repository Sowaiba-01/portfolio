import './globals.css';
import { Sora, Inter, JetBrains_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

const sora = Sora({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-sora',
  display: 'swap',
});
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});
const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://sowaibaarshad.com'),
  title: 'Sowaiba Arshad | AI/ML Engineer & Software Developer',
  description:
    'Portfolio of Sowaiba Arshad, an AI/ML Engineer and Software Developer specializing in LLMs, RAG systems, and computer vision. Silver Medalist at UET Taxila.',
  keywords: ['Sowaiba Arshad', 'AI engineer', 'ML engineer', 'machine learning', 'LLM', 'RAG', 'computer vision', 'software developer', 'UET Taxila'],
  authors: [{ name: 'Sowaiba Arshad' }],
  icons: { icon: '/favicon.png' },
  openGraph: {
    title: 'Sowaiba Arshad | AI/ML Engineer & Software Developer',
    description:
      'AI/ML Engineer specializing in LLMs, RAG systems, and computer vision. Portfolio with live deployed model demos.',
    url: 'https://sowaibaarshad.com',
    siteName: 'Sowaiba Arshad',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Sowaiba Arshad | AI/ML Engineer & Software Developer',
    description:
      'AI/ML Engineer specializing in LLMs, RAG systems, and computer vision. Portfolio with live deployed model demos.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable} ${mono.variable}`}>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
