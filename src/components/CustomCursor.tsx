'use client';

import { useEffect, useRef, useCallback } from 'react';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const cursorRadius = 90; // 11.2rem / 2 at 16px base

  const checkCursorOverlap = useCallback(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const links = document.querySelectorAll('.card, a, button, .hover-link');
    let isOverLink = false;
    const { x: mouseX, y: mouseY } = mousePositionRef.current;

    links.forEach((link) => {
      const rect = link.getBoundingClientRect();
      const closestX = Math.max(rect.left, Math.min(mouseX, rect.right));
      const closestY = Math.max(rect.top, Math.min(mouseY, rect.bottom));
      const distanceX = mouseX - closestX;
      const distanceY = mouseY - closestY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (distance < cursorRadius) {
        isOverLink = true;
      }
    });

    if (isOverLink) {
      cursor.classList.add('is-active');
    } else {
      cursor.classList.remove('is-active');
    }
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor || typeof window === 'undefined') return;

    // Wait for gsap to be available
    const initCursor = () => {
      if (typeof window.gsap === 'undefined') {
        setTimeout(initCursor, 100);
        return;
      }

      const gsap = window.gsap;

      // Show cursor on first mouse movement
      const showCursor = () => {
        gsap.set(cursor, { opacity: 1, scale: 1 });
        window.removeEventListener('mousemove', showCursor);
      };
      window.addEventListener('mousemove', showCursor);

      // Track mouse position and update cursor
      const handleMouseMove = (e: MouseEvent) => {
        mousePositionRef.current = { x: e.clientX, y: e.clientY };

        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1,
          ease: 'power2.out',
          overwrite: 'auto',
        });

        checkCursorOverlap();
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('scroll', checkCursorOverlap, { passive: true });

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('scroll', checkCursorOverlap);
      };
    };

    initCursor();
  }, [checkCursorOverlap]);

  return (
    <div className="cursor-dot" ref={cursorRef}>
      <svg className="cursor-arrow" viewBox="0 0 24 24">
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </div>
  );
}
