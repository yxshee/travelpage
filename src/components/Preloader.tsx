'use client';

import { useEffect, useState, useRef, useCallback } from 'react';

export function Preloader() {
  const [hidden, setHidden] = useState(false);
  const [removed, setRemoved] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
   
  const p5InstanceRef = useRef<InstanceType<typeof import('p5').default> | null>(null);
  const startTimeRef = useRef<number>(0);

   
  const sketch = useCallback((p: InstanceType<typeof import('p5').default>) => {
    let t = 0;
    const a = 9;
    const b = 28;
    const c = 2;
    const w = 400; // Reference width from original code

    p.setup = () => {
      const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
      canvas.style('display', 'block');
    };

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
    };

    p.draw = () => {
      t += 2; // Doubled speed for smoother, faster animation
      p.background(9); // Matches original background(9)

      p.push();
      // Center the drawing in the window
      p.translate(p.width / 2, p.height / 2);
      
      // Calculate optimized scale to fit screen
      const scale = Math.min(p.width, p.height) / w * 0.8; 
      p.scale(scale);
      p.translate(0, 125); // Adjust vertical center alignment based on attractor shape

      let x = 0.1, y = 0.1, z = 0.1;
      
      // PERF: Reduced from 30,000 to 8,000 points (~75% GPU savings)
      for (let i = 7500; i > 0; i--) {
        // Calculate physics (Lorenz equations)
        const dx = (y - x) * a;
        const dy = (b - z) * x - y;
        const dz = x * y - c * z;
        
        x += dx * 0.001;
        y += dy * 0.001;
        z += dz * 0.001;

        // Visual logic directly from source
        const s = (i + t) % 540 !== 0 ? 1 : 5;
        
        // stroke(w, s * 96) -> w is 400 (white), alpha varies
        p.strokeWeight(s / scale); // Compensate for scale to keep points crisp
        p.stroke(255, s * 96);
        
        // Projection logic
        const px = (x + y) * (p.sin(t * p.PI / 90 + z / 49 + x * x / w) * 2 + 2);
        const py = -z * 5;
        
        p.point(px, py);
      }
      p.pop();
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current || p5InstanceRef.current) return;

    // Dynamically import p5 to avoid SSR window error
    import('p5').then((p5Module) => {
      const p5 = p5Module.default;
      p5InstanceRef.current = new p5(sketch, containerRef.current!);
    });

    return () => {
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
        p5InstanceRef.current = null;
      }
    };
  }, [sketch]);

  useEffect(() => {
    const duration = 1800; // Faster preload
    startTimeRef.current = performance.now();

    const hidePreloader = () => {
      const elapsed = performance.now() - startTimeRef.current;
      const delay = Math.max(0, duration - elapsed + 500);

      setTimeout(() => {
        // PERF FIX: Stop p5 animation IMMEDIATELY when hiding to save GPU
        if (p5InstanceRef.current) {
          p5InstanceRef.current.remove();
          p5InstanceRef.current = null;
        }
        setHidden(true);
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
      <div ref={containerRef} className="preloader-canvas" />
    </div>
  );
}
