'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface CachedRect {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const cursorRadius = 90;
  const cachedRectsRef = useRef<CachedRect[]>([]);
  const cachedLinksRef = useRef<Element[]>([]);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor || typeof window === 'undefined') return;

    // Update link cache and their rects
    const updateLinkCache = () => {
      cachedLinksRef.current = Array.from(
        document.querySelectorAll('.card, a, button, .hover-link')
      );
      updateCachedRects();
    };

    // PERF: Cache rects to avoid layout thrashing
    const updateCachedRects = () => {
      cachedRectsRef.current = cachedLinksRef.current.map((link) => {
        const rect = link.getBoundingClientRect();
        return {
          left: rect.left,
          top: rect.top,
          right: rect.right,
          bottom: rect.bottom,
        };
      });
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

    // PERF: Check overlap using cached rects (no forced layout)
    const checkOverlap = () => {
      const { x: mouseX, y: mouseY } = mousePositionRef.current;
      let isOverLink = false;

      for (const rect of cachedRectsRef.current) {
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

    // PERF: Update cached rects on scroll (debounced)
    let scrollTimeout: ReturnType<typeof setTimeout> | null = null;
    const handleScroll = () => {
      // Update rects after scroll settles (debounced)
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        updateCachedRects();
        checkOverlap();
      }, 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // PERF: Update cached rects on resize
    const handleResize = () => {
      updateCachedRects();
    };
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', showCursor);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (scrollTimeout) clearTimeout(scrollTimeout);
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
