'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const cursorRadius = 90;

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor || typeof window === 'undefined') return;

    // PERF: Cache link elements, update only on DOM mutations
    let cachedLinks: Element[] = [];
    const updateLinkCache = () => {
      cachedLinks = Array.from(document.querySelectorAll('.card, a, button, .hover-link'));
    };
    updateLinkCache();
    
    // Update cache when DOM changes
    const observer = new MutationObserver(updateLinkCache);
    observer.observe(document.body, { childList: true, subtree: true });

    // Show cursor on first mouse move
    const showCursor = () => {
      gsap.set(cursor, { opacity: 1, scale: 1 });
      window.removeEventListener('mousemove', showCursor);
    };
    window.addEventListener('mousemove', showCursor);

    // PERF: Inline overlap check to avoid function call overhead
    const checkOverlap = () => {
      const { x: mouseX, y: mouseY } = mousePositionRef.current;
      let isOverLink = false;
      
      for (const link of cachedLinks) {
        const rect = link.getBoundingClientRect();
        const closestX = Math.max(rect.left, Math.min(mouseX, rect.right));
        const closestY = Math.max(rect.top, Math.min(mouseY, rect.bottom));
        const dx = mouseX - closestX;
        const dy = mouseY - closestY;
        if (dx * dx + dy * dy < cursorRadius * cursorRadius) {
          isOverLink = true;
          break;
        }
      }
      cursor.classList.toggle('is-active', isOverLink);
    };

    // PERF: Throttle mousemove with requestAnimationFrame
    let mouseTicking = false;
    const handleMouseMove = (e: MouseEvent) => {
      mousePositionRef.current = { x: e.clientX, y: e.clientY };

      if (!mouseTicking) {
        requestAnimationFrame(() => {
          gsap.to(cursor, {
            x: mousePositionRef.current.x,
            y: mousePositionRef.current.y,
            duration: 0.1,
            ease: 'power2.out',
            overwrite: 'auto',
          });
          checkOverlap();
          mouseTicking = false;
        });
        mouseTicking = true;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    // PERF: Throttle scroll handler
    let scrollTicking = false;
    const handleScroll = () => {
      if (!scrollTicking) {
        requestAnimationFrame(() => {
          checkOverlap();
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', showCursor);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="cursor-dot" ref={cursorRef}>
      <svg className="cursor-arrow" viewBox="0 0 24 24">
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </div>
  );
}
