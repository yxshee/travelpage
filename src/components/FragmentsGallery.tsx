'use client';

import { useEffect, useRef } from 'react';

const fragments = [
  { type: 'image' as const, src: '/core/page2-image1.webp', alt: 'Fragment 1' },
  { type: 'image' as const, src: '/core/page3-image6.webp', alt: 'Fragment 2' },
  { type: 'video' as const, src: '/videos/walk.mp4' },
  { type: 'image' as const, src: '/core/page3-image2.webp', alt: 'Fragment 3' },
  { type: 'image' as const, src: '/core/dharamshala.webp', alt: 'Dharamshala Fragment' },
  { type: 'video' as const, src: '/videos/manali-trail.mp4' },
  { type: 'image' as const, src: '/core/image4.webp', alt: 'Fragment 4' },
  { type: 'image' as const, src: '/core/image2.webp', alt: 'Fragment 5' },
  { type: 'image' as const, src: '/core/page3-image4.webp', alt: 'Fragment 6' },
  { type: 'image' as const, src: '/core/page2-image2.webp', alt: 'Fragment 7' },
  { type: 'image' as const, src: '/core/page2-image3.webp', alt: 'Fragment 8' },
  { type: 'image' as const, src: '/core/page2-image4.webp', alt: 'Fragment 9' },
  { type: 'image' as const, src: '/core/image7.webp', alt: 'Fragment 10' },
  { type: 'image' as const, src: '/core/page3-image7.webp', alt: 'Fragment 11' },
];

export function FragmentsGallery() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  // Triple the content for seamless infinite scroll
  useEffect(() => {
    if (scrollRef.current && !initializedRef.current) {
      const content = scrollRef.current.innerHTML;
      scrollRef.current.innerHTML = content + content + content;
      initializedRef.current = true;
    }
  }, []);

  return (
    <div className="col-span-full card fragments-card" data-color="dark">
      <div className="number fMedium">VI</div>
      <div className="title fMedium fragments-title">Fragments</div>
      <div className="b-left">
        <p className="s-title5">moments from the road.</p>

        {/* Infinite Scroll Container */}
        <div className="fragments-container">
          <div className="fragments-scroll" ref={scrollRef}>
            {fragments.map((fragment, index) =>
              fragment.type === 'image' ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={index} src={fragment.src} alt={fragment.alt} />
              ) : (
                <video
                  key={index}
                  className="fragment-video"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="none"
                >
                  <source src={fragment.src} type="video/mp4" />
                </video>
              )
            )}
          </div>
        </div>
      </div>

      <div className="hover">
        <div className="js-marquee">
          Gallery Gallery Gallery Gallery Gallery Gallery Gallery Gallery
        </div>
      </div>
    </div>
  );
}
