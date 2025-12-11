'use client';

import { MusicCard } from '@/components/MusicCard';
import { FragmentsGallery } from '@/components/FragmentsGallery';
import { ParallaxMedia } from '@/components/ParallaxMedia';

export function WorksSection() {
  return (
    <section className="Works">
      <div className="grid-wrapper">
        {/* Section Title */}
        <div className="col-span-full section-header">
          {/* <div className="number fMedium">02</div> */}
          <h2 className="s-title2 fSerif">Featured Trails</h2>
        </div>

        {/* Chapter 1 */}
        <div className="col-span-6 card" data-color="dark">
          <div className="number fMedium">I</div>
          <div className="title fMedium">Altitude & Silence</div>
          <div className="b-left">
            <p className="s-title5"> </p>
            <ParallaxMedia
              type="image"
              src="/core/triund.webp"
              alt="Triund"
              className="parallax-img featured-media"
            />
          </div>
          <div className="hover">
            <div className="js-marquee">Triund Triund Triund Triund Triund Triund</div>
          </div>
        </div>

        {/* Chapter 2 */}
        <div className="col-span-6 card" data-color="light">
          <div className="number fMedium">II</div>
          <div className="title fMedium">Villages in Motion</div>
          <div className="b-left">
            <p className="s-title5"> </p>
            <ParallaxMedia
              type="video"
              src="/core/tosh.mp4"
              className="parallax-video featured-media"
            />
          </div>
          <div className="hover">
            <div className="js-marquee">Tosh Tosh Tosh Tosh Tosh Tosh</div>
          </div>
        </div>

        {/* Chapter 3 */}
        <div className="col-span-6 card" data-color="light">
          <div className="number fMedium">III</div>
          <div className="title fMedium">Alpine Shadows</div>
          <div className="b-left">
            <p className="s-title5"> </p>
            <ParallaxMedia
              type="video"
              src="/videos/manali-trail.mp4"
              className="parallax-video featured-media"
            />
          </div>
          <div className="hover">
            <div className="js-marquee">Manali Manali Manali Manali Manali Manali</div>
          </div>
        </div>

        {/* Chapter 4 */}
        <div className="col-span-6 card" data-color="dark">
          <div className="number fMedium">IV</div>
          <div className="title fMedium">Mist & Stone</div>
          <div className="b-left">
            <p className="s-title5"> </p>
            <ParallaxMedia
              type="image"
              src="/core/image3.webp"
              alt="Dharamshala"
              className="parallax-img featured-media"
            />
          </div>
          <div className="hover">
            <div className="js-marquee">
              Dharamshala Dharamshala Dharamshala Dharamshala Dharamshala Dharamshala
            </div>
          </div>
        </div>

        {/* Chapter 5: Music Player */}
        <MusicCard />

        {/* Chapter 6: Fragments Gallery */}
        <FragmentsGallery />
      </div>
    </section>
  );
}
