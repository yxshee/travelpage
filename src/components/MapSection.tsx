'use client';

import { useEffect, useRef, useState } from 'react';

// Location data
const locations = [
  { id: 'dharamshala', name: 'Dharamshala', image: '/core/dharamshala.webp' },
  { id: 'triund', name: 'Triund', image: '/core/triund.webp' },
  { id: 'kasol', name: 'Kasol', image: '/core/image3.webp' },
  { id: 'tosh', name: 'Tosh', image: '/core/image4.webp' },
  { id: 'manali', name: 'Manali', image: '/core/image2.webp' },
];

export function MapSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  // Initialize GSAP scroll animations
  useEffect(() => {
    const initAnimations = () => {
      if (typeof window === 'undefined') return;
      if (!window.gsap || !window.ScrollTrigger) {
        setTimeout(initAnimations, 100);
        return;
      }

      const gsap = window.gsap;
      const ScrollTrigger = window.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      if (!section) return;

      // Fade in the map container
      gsap.fromTo(
        section.querySelector('.map-box'),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
          },
        }
      );

      // Stagger the location cards
      gsap.fromTo(
        section.querySelectorAll('.map-location-card'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
          },
          delay: 0.3,
        }
      );
    };

    initAnimations();

    return () => {
      if (typeof window !== 'undefined' && window.ScrollTrigger) {
        window.ScrollTrigger.getAll().forEach((st) => {
          if (st.vars.trigger && sectionRef.current?.contains(st.vars.trigger as Element)) {
            st.kill();
          }
        });
      }
    };
  }, []);

  const handleMouseEnter = (id: string, e: React.MouseEvent) => {
    setHoveredLocation(id);
    setTooltipPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setTooltipPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseLeave = () => {
    setHoveredLocation(null);
  };

  const hoveredData = locations.find((loc) => loc.id === hoveredLocation);

  return (
    <section className="MapSection" ref={sectionRef}>
      <div className="map-header">
        <span className="number fMedium">04</span>
        <h2 className="s-title2 fSerif">The Map</h2>
      </div>

      <div className="map-box">
        {/* SVG Map Background */}
        <svg viewBox="0 0 800 400" className="map-svg" preserveAspectRatio="xMidYMid meet">
          {/* Background gradient */}
          <defs>
            <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.03" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.08" />
            </linearGradient>
          </defs>
          <rect width="800" height="400" fill="url(#mapGradient)" />

          {/* Decorative mountain range */}
          <path
            d="M0,350 L100,280 L180,320 L260,240 L340,290 L420,200 L500,260 L580,180 L660,230 L740,160 L800,200 L800,400 L0,400 Z"
            fill="currentColor"
            fillOpacity="0.04"
          />

          {/* Route path connecting locations */}
          <path
            d="M120,180 Q200,150 280,200 T440,180 T600,160 T720,140"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="8 4"
            strokeOpacity="0.3"
            strokeLinecap="round"
          />

          {/* Location points */}
          {[
            { x: 120, y: 180 },
            { x: 200, y: 150 },
            { x: 360, y: 200 },
            { x: 520, y: 160 },
            { x: 700, y: 140 },
          ].map((pos, i) => (
            <g key={locations[i].id}>
              {/* Pulse animation circle */}
              <circle cx={pos.x} cy={pos.y} r="12" className="map-pulse-ring" />
              {/* Core dot */}
              <circle cx={pos.x} cy={pos.y} r="6" className="map-core-dot" />
            </g>
          ))}
        </svg>

        {/* Interactive location cards */}
        <div className="map-locations">
          {locations.map((loc, index) => (
            <div
              key={loc.id}
              className={`map-location-card ${hoveredLocation === loc.id ? 'is-active' : ''}`}
              onMouseEnter={(e) => handleMouseEnter(loc.id, e)}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ cursor: 'none' }}
            >
              <span className="map-location-number">{String(index + 1).padStart(2, '0')}</span>
              <span className="map-location-name">{loc.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Floating tooltip */}
      {hoveredData && (
        <div
          className="map-tooltip"
          style={{
            left: tooltipPos.x,
            top: tooltipPos.y - 20,
          }}
        >
          <div
            className="map-tooltip-image"
            style={{ backgroundImage: `url(${hoveredData.image})` }}
          />
          <span className="map-tooltip-name">{hoveredData.name}</span>
          <span className="map-tooltip-region">Himachal Pradesh</span>
        </div>
      )}

      <p className="map-caption fLight">Himachal Pradesh, India</p>
    </section>
  );
}
