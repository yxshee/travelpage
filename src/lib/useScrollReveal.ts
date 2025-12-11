'use client';

import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    const initScrollReveal = () => {
      if (typeof window.gsap === 'undefined' || typeof window.ScrollTrigger === 'undefined') {
        setTimeout(initScrollReveal, 100);
        return;
      }

      const gsap = window.gsap;
      gsap.registerPlugin(window.ScrollTrigger);

      const cards = document.querySelectorAll('.card');
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
            },
          }
        );
      });
    };

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(initScrollReveal, 200);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);
}
