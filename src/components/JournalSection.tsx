'use client';

import { useRef, useEffect, useState } from 'react';

interface JournalEntry {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  image: string;
}

const journalEntries: JournalEntry[] = [
  {
    id: 1,
    title: 'The Silent Valley',
    date: 'Jan 2026',
    excerpt: 'Where whispers echo louder than words...',
    image: '/core/triund.webp',
  },
  {
    id: 2,
    title: 'Midnight in Kasol',
    date: 'Dec 2025',
    excerpt: 'Stars fell like secrets into the Parvati...',
    image: '/core/image3.webp',
  },
  {
    id: 3,
    title: 'Chasing Sunsets',
    date: 'Nov 2025',
    excerpt: 'The sky bled gold over Dharamshala...',
    image: '/core/image2.webp',
  },
];

export function JournalSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const cursorImageRef = useRef<HTMLDivElement>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);

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

      // Animate cards on scroll
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 80,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
            },
            delay: index * 0.15,
          }
        );
      });
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

  // Handle cursor image follow
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorImageRef.current && activeImage && typeof window.gsap !== 'undefined') {
        window.gsap.to(cursorImageRef.current, {
          x: e.clientX + 20,
          y: e.clientY + 20,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [activeImage]);

  const handleCardEnter = (image: string) => {
    setActiveImage(image);
    if (cursorImageRef.current && typeof window.gsap !== 'undefined') {
      window.gsap.to(cursorImageRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
      });
    }
  };

  const handleCardLeave = () => {
    setActiveImage(null);
    if (cursorImageRef.current && typeof window.gsap !== 'undefined') {
      window.gsap.to(cursorImageRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.2,
      });
    }
  };

  return (
    <section className="Journal" ref={sectionRef}>
      <div className="journal-header">
        <div className="number fMedium">06</div>
        <h2 className="s-title2 fSerif">Journal &amp; Stories</h2>
      </div>

      <div className="journal-grid">
        {journalEntries.map((entry, index) => (
          <div
            key={entry.id}
            className="journal-card"
            ref={(el) => { cardsRef.current[index] = el; }}
            onMouseEnter={() => handleCardEnter(entry.image)}
            onMouseLeave={handleCardLeave}
          >
            <div className="journal-card-inner">
              <span className="journal-date">{entry.date}</span>
              <h3 className="journal-title">{entry.title}</h3>
              <p className="journal-excerpt">{entry.excerpt}</p>
              <div className="journal-read-more">
                <span>Read Story</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cursor Follow Image */}
      <div
        className="journal-cursor-image"
        ref={cursorImageRef}
        style={{
          backgroundImage: activeImage ? `url(${activeImage})` : 'none',
        }}
      />
    </section>
  );
}

