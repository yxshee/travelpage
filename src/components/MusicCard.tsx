'use client';

import { useMusicPlayer } from '@/lib/useMusicPlayer';

export function MusicCard() {
  const {
    isPlaying,
    currentSong,
    currentTime,
    progressPercent,
    toggleMusic,
    playNext,
    playPrev,
  } = useMusicPlayer();

  const handleCursorEnter = () => {
    const cursor = document.querySelector('.cursor-dot');
    if (cursor) {
      cursor.classList.add('is-active');
      cursor.classList.add('controls-hover');
    }
  };

  const handleCursorLeave = () => {
    const cursor = document.querySelector('.cursor-dot');
    if (cursor) {
      cursor.classList.remove('is-active');
      cursor.classList.remove('controls-hover');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`col-span-full card music-card ${isPlaying ? 'is-playing' : ''}`} data-color="light">
      <div className="number fMedium">03</div>
      <div className="player-ui">
        <div className="controls-group">
          <button
            className="prev-btn fMedium"
            aria-label="Previous Track"
            onClick={(e) => {
              e.stopPropagation();
              playPrev();
            }}
            onMouseEnter={handleCursorEnter}
            onMouseLeave={handleCursorLeave}
          >
            PREV
          </button>
          <button
            className="card-play-btn fMedium"
            onClick={(e) => {
              e.stopPropagation();
              toggleMusic();
            }}
            onMouseEnter={handleCursorEnter}
            onMouseLeave={handleCursorLeave}
          >
            {isPlaying ? 'PAUSE' : 'PLAY'}
          </button>
          <button
            className="next-btn fMedium"
            aria-label="Next Track"
            onClick={(e) => {
              e.stopPropagation();
              playNext();
            }}
            onMouseEnter={handleCursorEnter}
            onMouseLeave={handleCursorLeave}
          >
            NEXT
          </button>
        </div>

        <div className="track-info">
          <div className="equalizer">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
          <span className="song-title s-title5">{currentSong}</span>
          <span className="time-display s-title5">{formatTime(currentTime)}</span>
        </div>

        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progressPercent}%` }}></div>
        </div>
      </div>

      <div className="hover">
        <div className="js-marquee">
          Listen Listen Listen Listen Listen Listen Listen Listen
        </div>
      </div>
    </div>
  );
}
