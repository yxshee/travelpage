'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

export function HeroSection() {
  const heroLinesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initHeroAnimation = () => {
      if (typeof window.gsap === 'undefined') {
        setTimeout(initHeroAnimation, 100);
        return;
      }

      const gsap = window.gsap;
      const heroLines = heroLinesRef.current?.querySelectorAll('.titleLines__text');

      if (!heroLines?.length) return;

      heroLines.forEach((line, lineIndex) => {
        const text = line.textContent?.trim();
        if (!text) return;

        // Split text into individual character spans
        const chars = text.split('').map((char, i) => {
          const span = document.createElement('span');
          span.className = 'hero-char';
          span.textContent = char === ' ' ? '\u00A0' : char;
          span.style.transitionDelay = `${i * 0.03}s`;
          return span;
        });

        // Replace text with character spans
        line.innerHTML = '';
        chars.forEach((c) => line.appendChild(c));

        // GSAP Timeline
        const tl = gsap.timeline({
          delay: 0.3 + lineIndex * 0.4,
        });

        tl.to(line.querySelectorAll('.hero-char'), {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.2,
          ease: 'elastic.out(1, 0.5)',
          stagger: {
            each: 0.04,
            from: 'start',
          },
        });

        // Add underline reveal
        tl.add(() => {
          line.classList.add('line-revealed');
        }, '-=0.5');
      });
    };

    initHeroAnimation();
  }, []);

  return (
    <section className="Intro">
      <div className="titleLines s-title1" ref={heroLinesRef}>
        <div className="titleLines__text">Traveling</div>
        <div className="titleLines__text">Through</div>
        <div className="titleLines__text">Dimensions</div>
      </div>

      <nav className="intro-nav">
        <div className="grid-wrapper">
          {/* Nav Card 1: Home */}
          <div className="col-span-full">
            <Link href="/" className="card" data-color="dark">
              <div className="number fMedium">01</div>
              <div className="title fMedium">Home</div>
              <div className="hover">
                <div className="js-marquee">
                  Back Home Back Home Back Home Back Home Back Home
                </div>
              </div>
            </Link>
          </div>

          {/* Nav Card 2: Contact */}
          <div className="col-span-full">
            <a href="#contact" className="card" data-color="light">
              <div className="number fMedium">02</div>
              <div className="title fMedium">Contact</div>
              <div className="hover">
                <div className="js-marquee">
                  Get in Touch Get in Touch Get in Touch Get in Touch Get in Touch
                </div>
              </div>
            </a>
          </div>
        </div>
      </nav>
    </section>
  );
}
