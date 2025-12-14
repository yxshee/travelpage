'use client';

import { useEffect } from 'react';
import { Preloader } from '@/components/Preloader';
import { CustomCursor } from '@/components/CustomCursor';
import { FixedControls } from '@/components/FixedControls';
import { HeroSection } from '@/components/HeroSection';
import { PhilosophySection } from '@/components/PhilosophySection';
import { JournalSection } from '@/components/JournalSection';
import { MapSection } from '@/components/MapSection';
import { NewsletterSection } from '@/components/NewsletterSection';
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

      {/* Background Music Audio Element - src set dynamically by useMusicPlayer */}
      <audio id="bg-music" loop />

      {/* Preloader */}
      <Preloader />

      {/* Main Scroll Container */}
      <main className="wrapper js-scroll">
        {/* Intro Section (Hero) */}
        <HeroSection />

        {/* Philosophy / About Section */}
        <PhilosophySection />

        {/* Works / Chapters Section */}
        <WorksSection />

        {/* Journal & Stories Section */}
        <JournalSection />

        {/* Interactive Map Section */}
        <MapSection />

        {/* Newsletter Signup Section */}
        <NewsletterSection />

        {/* Footer / Contact Section */}
        <ContactSection />
      </main>

      {/* Hero Cursor Image (created dynamically) */}
      <HeroCursorImage />
    </div>
  );
}
