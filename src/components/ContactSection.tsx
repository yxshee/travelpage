'use client';

import Link from 'next/link';
import { useMusicPlayer } from '@/lib/useMusicPlayer';

export function ContactSection() {
  const { toggleMusic } = useMusicPlayer();

  const handleMusicClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleMusic();
  };

  const handleMouseEnter = () => {
    const cursor = document.querySelector('.cursor-dot');
    if (cursor) cursor.classList.add('is-active');
  };

  const handleMouseLeave = () => {
    const cursor = document.querySelector('.cursor-dot');
    if (cursor) cursor.classList.remove('is-active');
  };

  return (
    <section className="Contact" id="contact">
      <div className="grid-wrapper">
        {/* Left Column: CTA */}
        <div className="col-span-6 contact-left">
          <div className="number fMedium">06</div>
          <h2 className="s-title2 fSerif">
            Next
            <br />
            Journey?
          </h2>
          <a href="mailto:yxshdogra@gmail.com" className="contact-link s-title4">
            page is still under construction \\ 404
          </a>
          <a
            href="https://www.youtube.com/watch?v=J87pJrxvJ5E"
            className="contact-link s-title4"
          >
            See, in a perfect world, I would be perfect, world !!
            <br />
            I don&apos;t trust people enough beyond their surface, world
          </a>
        </div>

        {/* Right Column: Navigation */}
        <div className="col-span-6 contact-right">
          <nav className="footer-nav">
            <Link
              href="/"
              className="hover-link"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              home
            </Link>
            <a
              href="mailto:yxshdogra@gmail.com"
              className="hover-link"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              contact
            </a>
            <a
              href="#"
              id="footer-music-trigger"
              className="hover-link"
              onClick={handleMusicClick}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              music
            </a>
          </nav>
          <p className="copyright">© 2026 Yash Dogra</p>
        </div>
      </div>
    </section>
  );
}
