'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';


const philosophyLines = [
  'We don\'t travel to escape life,',
  'we travel so life doesn\'t escape us.',
  'Every trail tells a story.',
  'Every summit is a beginning.',
];

export function PhilosophySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const linesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const initAnimations = () => {
      if (typeof window.gsap === 'undefined' || typeof window.ScrollTrigger === 'undefined') {
        setTimeout(initAnimations, 100);
        return;
      }

      const gsap = window.gsap;
      const ScrollTrigger = window.ScrollTrigger;
      const section = sectionRef.current;
      if (!section) return;

      gsap.registerPlugin(ScrollTrigger);

      // Animate each line on scroll
      linesRef.current.forEach((line, index) => {
        if (!line) return;

        gsap.fromTo(
          line,
          {
            opacity: 0,
            y: 60,
            rotateX: -15,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: line,
              start: 'top 85%',
              end: 'top 50%',
              toggleActions: 'play none none reverse',
            },
            delay: index * 0.1,
          }
        );
      });

      // Parallax background
      const bgElement = section.querySelector('.philosophy-bg');
      if (bgElement) {
        gsap.to(bgElement, {
          yPercent: 30,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    };

    initAnimations();

    return () => {
      if (typeof window.ScrollTrigger !== 'undefined') {
        const section = sectionRef.current;
        window.ScrollTrigger.getAll().forEach((st) => {
          if (st.vars.trigger && section?.contains(st.vars.trigger as Element)) {
            st.kill();
          }
        });
      }
    };
  }, []);

  return (
    <section className="Philosophy" ref={sectionRef}>
      {/* Parallax Background */}
      <div className="philosophy-bg">
        <Image
          src="/core/rickandmorty.jpg"
          alt="Philosophy Background"
          fill
          priority
          className="philosophy-bg-image"
          sizes="100vw"
        />
        <div className="philosophy-bg-overlay" />
      </div>

      {/* Content */}
      <div className="philosophy-content">
        <div className="philosophy-label fMedium">The Philosophy</div>
        <div className="philosophy-lines">
          {philosophyLines.map((line, index) => (
            <div
              key={index}
              className="philosophy-line s-title2 fSerif"
              ref={(el) => { linesRef.current[index] = el; }}
            >
              {line}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

