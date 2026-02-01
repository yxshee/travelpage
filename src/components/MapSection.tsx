'use client';

import { useRef, useEffect, useState } from 'react';

interface Location {
  id: string;
  name: string;
  x: number;
  y: number;
  image: string;
}

// Coordinates mapped from real lat/long to SVG viewBox (0-100 x 0-70)
// Bounding box: Lat 31.9-32.3, Long 76.2-77.6
// Formula: x = (long - 76.2) / 1.4 * 100, y = (32.3 - lat) / 0.4 * 70
const locations: Location[] = [
  { id: 'dharamshala', name: 'Dharamshala', x: 8.8, y: 14.2, image: '/core/image3.webp' },  // 32.219°N, 76.323°E
  { id: 'triund', name: 'Triund', x: 8.2, y: 10.8, image: '/core/triund.webp' },          // 32.238°N, 76.315°E
  { id: 'kasol', name: 'Kasol', x: 79.6, y: 50.8, image: '/core/triund.webp' },            // 32.010°N, 77.315°E
  { id: 'tosh', name: 'Tosh', x: 90.0, y: 45.9, image: '/core/image3.webp' },              // 32.038°N, 77.460°E
  { id: 'manali', name: 'Manali', x: 70.5, y: 10.6, image: '/core/image2.webp' },          // 32.240°N, 77.189°E
];

export function MapSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pointsRef = useRef<(SVGGElement | null)[]>([]);
  const [activeLocation, setActiveLocation] = useState<Location | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

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

      // Animate section fade in
      gsap.fromTo(
        section.querySelector('.map-container'),
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          },
        }
      );

      // Animate points appearing with stagger
      pointsRef.current.forEach((point, index) => {
        if (!point) return;

        gsap.fromTo(
          point,
          { opacity: 0, scale: 0 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
            },
            delay: 0.5 + index * 0.15,
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

  const handlePointEnter = (location: Location, e: React.MouseEvent) => {
    setActiveLocation(location);
    const rect = (e.currentTarget as SVGElement).getBoundingClientRect();
    setTooltipPos({ x: rect.left + rect.width / 2, y: rect.top });
  };

  const handlePointLeave = () => {
    setActiveLocation(null);
  };

  return (
    <section className="MapSection" ref={sectionRef}>
      <div className="map-header">
        <div className="number fMedium">04</div>
        <h2 className="s-title2 fSerif">The Map</h2>
      </div>

      <div className="map-container">
        <svg
          viewBox="0 0 100 70"
          className="map-svg"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Abstract terrain lines */}
          <path
            d="M10,50 Q25,45 40,48 T70,45 T95,50"
            className="map-line"
            fill="none"
          />
          <path
            d="M5,55 Q20,52 35,54 T65,51 T90,55"
            className="map-line map-line-2"
            fill="none"
          />
          <path
            d="M15,60 Q30,57 45,59 T75,56 T100,60"
            className="map-line map-line-3"
            fill="none"
          />

          {/* Connecting dotted path - Dharamshala -> Triund -> Manali -> Tosh -> Kasol */}
          <path
            d="M8.8,14.2 L8.2,10.8 L70.5,10.6 L90,45.9 L79.6,50.8"
            className="map-path"
            fill="none"
          />

          {/* Location points */}
          {locations.map((loc, index) => (
            <g
              key={loc.id}
              ref={(el) => { pointsRef.current[index] = el; }}
              className="map-point-group"
              onMouseEnter={(e) => handlePointEnter(loc, e)}
              onMouseLeave={handlePointLeave}
              style={{ cursor: 'none' }}
            >
              {/* Pulsing outer ring */}
              <circle
                cx={loc.x}
                cy={loc.y}
                r="3"
                className="map-point-pulse"
              />
              {/* Core point */}
              <circle
                cx={loc.x}
                cy={loc.y}
                r="1.5"
                className="map-point-core"
              />
            </g>
          ))}
        </svg>

        {/* Tooltip */}
        {activeLocation && (
          <div
            className="map-tooltip"
            style={{
              left: tooltipPos.x,
              top: tooltipPos.y - 10,
            }}
          >
            <div
              className="map-tooltip-image"
              style={{ backgroundImage: `url(${activeLocation.image})` }}
            />
            <span className="map-tooltip-name">{activeLocation.name}</span>
          </div>
        )}
      </div>

      <p className="map-caption fLight">Himachal Pradesh, India</p>
    </section>
  );
}

