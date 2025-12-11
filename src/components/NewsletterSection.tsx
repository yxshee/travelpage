'use client';

import { useRef, useState, useEffect } from 'react';

export function NewsletterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [email, setEmail] = useState('');
  const [isHovering, setIsHovering] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

      gsap.fromTo(
        section.querySelector('.newsletter-content'),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          },
        }
      );
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

  // Magnetic button effect
  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (typeof window.gsap === 'undefined') return;
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      window.gsap.to(button, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      if (typeof window.gsap === 'undefined') return;
      window.gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      // Reset after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <section className="Newsletter" ref={sectionRef}>
      <div className="newsletter-content">
        <div className="newsletter-header">
          <div className="number fMedium">05</div>
          <h2 className="s-title2 fSerif">Join the Odyssey</h2>
        </div>

        <p className="newsletter-description fLight">
          Stories from the trail, delivered to your inbox.
        </p>

        <form className="newsletter-form" onSubmit={handleSubmit}>
          <div className="newsletter-input-wrapper">
            <input
              ref={inputRef}
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="newsletter-input"
              required
            />
            <div className="newsletter-input-line" />
          </div>

          <button
            ref={buttonRef}
            type="submit"
            className="newsletter-btn"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            disabled={isSubmitted}
          >
            <span className="newsletter-btn-text">
              {isSubmitted ? 'Boarded ✓' : isHovering ? 'Boarding' : 'Subscribe'}
            </span>
          </button>
        </form>
      </div>
    </section>
  );
}

