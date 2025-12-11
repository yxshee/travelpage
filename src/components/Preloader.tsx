'use client';

import { useEffect, useState, useRef } from 'react';

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [removed, setRemoved] = useState(false);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    const duration = 1500; // 1.5 seconds to reach 100%
    startTimeRef.current = performance.now();

    const animatePercentage = (currentTime: number) => {
      const elapsed = currentTime - startTimeRef.current;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(Math.floor(newProgress));

      if (newProgress < 100) {
        requestAnimationFrame(animatePercentage);
      }
    };

    requestAnimationFrame(animatePercentage);

    const hidePreloader = () => {
      const elapsed = performance.now() - startTimeRef.current;
      const delay = Math.max(0, duration - elapsed + 300);

      setTimeout(() => {
        setHidden(true);
        // Remove from DOM after transition
        setTimeout(() => {
          setRemoved(true);
        }, 800);
      }, delay);
    };

    if (document.readyState === 'complete') {
      hidePreloader();
    } else {
      window.addEventListener('load', hidePreloader);
      return () => window.removeEventListener('load', hidePreloader);
    }
  }, []);

  if (removed) return null;

  return (
    <div
      id="preloader"
      className={`travel-preloader ${hidden ? 'hidden' : ''}`}
      style={removed ? { display: 'none' } : undefined}
    >
      <video className="preloader-video" autoPlay muted loop playsInline>
        <source src="/preloader.mp4" type="video/mp4" />
      </video>
      <div className="preloader-percentage">{progress}%</div>
    </div>
  );
}
