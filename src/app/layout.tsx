import type { Metadata } from 'next';
import '@/styles/globals.css';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Travel | Yash Dogra',
  description: 'Traveling Through Dimensions - A travel portfolio by Yash Dogra',
  icons: {
    icon: '/img/favicon-light.ico',
  },
  openGraph: {
    title: 'Travel | Yash Dogra',
    description: 'Traveling Through Dimensions - A travel portfolio by Yash Dogra',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* GSAP and ScrollTrigger from CDN */}
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"
          strategy="beforeInteractive"
        />
        {/* Lenis Smooth Scroll from CDN */}
        <Script
          src="https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.29/bundled/lenis.min.js"
          strategy="beforeInteractive"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
