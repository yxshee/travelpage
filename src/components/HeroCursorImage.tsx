'use client';

import { useEffect, useRef, useState } from 'react';

const imagePaths = [
  '/core/image2.webp',
  '/core/image3.webp',
  '/core/image4.webp',
  '/core/image7.webp',
  '/core/triund.webp',
  '/core/dharamshala.webp',
  '/core/page2-image1.webp',
  '/core/page2-image2.webp',
  '/core/page2-image3.webp',
  '/core/page3-image2.webp',
  '/core/page3-image6.webp',
];

export function HeroCursorImage() {
  const imgRef = useRef<HTMLImageElement>(null);
  const [currentSrc, setCurrentSrc] = useState(imagePaths[0]);
  const [isVisible, setIsVisible] = useState(false);
  const lastIndexRef = useRef(-1);
  const positionRef = useRef({ x: 0, y: 0, currentX: 0, currentY: 0 });
  const isHoveringRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);

  const getRandomImage = () => {
    let index;
    do {
      index = Math.floor(Math.random() * imagePaths.length);
    } while (index === lastIndexRef.current && imagePaths.length > 1);
    lastIndexRef.current = index;
    return imagePaths[index];
  };

  useEffect(() => {
    // Preload images
    imagePaths.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    const offset = { x: 30, y: 30 };
    const lerp = 0.15;

    const updatePosition = () => {
      if (!isHoveringRef.current || !imgRef.current) {
        rafIdRef.current = null;
        return;
      }

      const pos = positionRef.current;
      pos.currentX += (pos.x - pos.currentX) * lerp;
      pos.currentY += (pos.y - pos.currentY) * lerp;

      imgRef.current.style.left = `${pos.currentX + offset.x}px`;
      imgRef.current.style.top = `${pos.currentY + offset.y}px`;

      rafIdRef.current = requestAnimationFrame(updatePosition);
    };

    const heroContainer = document.querySelector('.travel-scope .titleLines');
    if (!heroContainer) return;

    const handleMouseEnter = (e: Event) => {
      const mouseEvent = e as MouseEvent;
      isHoveringRef.current = true;
      positionRef.current = {
        x: mouseEvent.clientX,
        y: mouseEvent.clientY,
        currentX: mouseEvent.clientX,
        currentY: mouseEvent.clientY,
      };

      setCurrentSrc(getRandomImage());
      setIsVisible(true);

      if (!rafIdRef.current) {
        rafIdRef.current = requestAnimationFrame(updatePosition);
      }
    };

    const handleMouseMove = (e: Event) => {
      const mouseEvent = e as MouseEvent;
      positionRef.current.x = mouseEvent.clientX;
      positionRef.current.y = mouseEvent.clientY;
    };

    const handleMouseLeave = () => {
      isHoveringRef.current = false;
      setIsVisible(false);
    };

    heroContainer.addEventListener('mouseenter', handleMouseEnter);
    heroContainer.addEventListener('mousemove', handleMouseMove);
    heroContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      heroContainer.removeEventListener('mouseenter', handleMouseEnter);
      heroContainer.removeEventListener('mousemove', handleMouseMove);
      heroContainer.removeEventListener('mouseleave', handleMouseLeave);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={imgRef}
      className={`hero-cursor-image ${isVisible ? 'visible' : ''}`}
      src={currentSrc}
      alt=""
      draggable={false}
    />
  );
}
