'use client';

import { useRef, useCallback } from 'react';

interface ParallaxMediaProps {
  type: 'image' | 'video';
  src: string;
  alt?: string;
  className?: string;
}

export function ParallaxMedia({ type, src, alt, className }: ParallaxMediaProps) {
  const mediaRef = useRef<HTMLImageElement | HTMLVideoElement>(null);
  const maxMovement = 16;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const element = mediaRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const offsetX = (e.clientX - centerX) / (rect.width / 2);
      const offsetY = (e.clientY - centerY) / (rect.height / 2);

      const moveX = offsetX * maxMovement;
      const moveY = offsetY * maxMovement;

      element.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) scale(1.02)`;
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    const element = mediaRef.current;
    if (element) {
      element.style.transform = 'translate3d(0, 0, 0) scale(1)';
    }
  }, []);

  if (type === 'video') {
    return (
      <video
        ref={mediaRef as React.RefObject<HTMLVideoElement>}
        className={className}
        autoPlay
        muted
        loop
        playsInline
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <source src={src} type="video/mp4" />
      </video>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={mediaRef as React.RefObject<HTMLImageElement>}
      src={src}
      alt={alt || ''}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    />
  );
}
