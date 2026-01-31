'use client';

import { useEffect } from 'react';
import { Preloader } from '@/components/Preloader';
import { CustomCursor } from '@/components/CustomCursor';
import { FixedControls } from '@/components/FixedControls';
import { HeroSection } from '@/components/HeroSection';
import { WorksSection } from '@/components/WorksSection';
import { ContactSection } from '@/components/ContactSection';
import { HeroCursorImage } from '@/components/HeroCursorImage';
import { useLenis } from '@/lib/useLenis';
import { useScrollReveal } from '@/lib/useScrollReveal';

export default function TravelPage() {
  // Initialize Lenis smooth scrolling
  useLenis();

  // Initialize scroll reveal animations for cards
  useScrollReveal();

  // Add lenis class to html for scrollbar hiding
  useEffect(() => {
    document.documentElement.classList.add('lenis');
    return () => {
      document.documentElement.classList.remove('lenis');
    };
  }, []);

  return (
    <div className="travel-scope">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Fixed Controls Group */}
      <FixedControls />

      {/* Background Music Audio Element */}
      <audio id="bg-music" loop>
        <source src="/core/bgm.mp3" type="audio/mp3" />
      </audio>

      {/* Preloader */}
      <Preloader />

      {/* Main Scroll Container */}
      <main className="wrapper js-scroll">
        {/* Intro Section (Hero) */}
        <HeroSection />

        {/* Works / Chapters Section */}
        <WorksSection />

        {/* Footer / Contact Section */}
        <ContactSection />
      </main>

      {/* Hero Cursor Image (created dynamically) */}
      <HeroCursorImage />
    </div>
  );
}
