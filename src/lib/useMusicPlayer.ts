'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

const playlist = [
  { name: 'Trance', path: '/music/Trance.mp3' },
  {
    name: 'I Smoked Away My Brain',
    path: "/music/A$AP Rocky - I Smoked Away My Brain (I'm God x Demons Mashup) (Audio) ft. Imogen Heap, Clams Casino.mp3",
  },
  { name: 'And I Love Her', path: '/music/And I Love Her (Remastered 2009).mp3' },
  { name: "Can't Tell Me Nothing", path: "/music/Can't Tell Me Nothing.mp3" },
  { name: 'SWIM', path: '/music/Chase Atlantic - SWIM (Official Music Video).mp3' },
  { name: 'End Of Beginning', path: '/music/Djo - End Of Beginning (Official Audio).mp3' },
  { name: 'Drugs You Should Try It', path: '/music/Drugs You Should Try It.mp3' },
  { name: 'Father Stretch My Hands Pt. 1', path: '/music/Father Stretch My Hands Pt. 1.mp3' },
  { name: 'Like That', path: '/music/Future, Metro Boomin - Like That (Official Audio).mp3' },
  { name: 'Ghetto Symphony', path: '/music/Ghetto Symphony.mp3' },
  { name: 'Ghost Town', path: '/music/Ghost Town.mp3' },
  {
    name: 'Am I Dreaming',
    path: '/music/Metro Boomin, A$AP Rocky, Roisee - Am I Dreaming (Visualizer).mp3',
  },
  { name: 'Money Trees', path: '/music/Money Trees.mp3' },
  { name: 'Dumb', path: '/music/Nirvana - Dumb.mp3' },
  { name: 'PRIDE.', path: '/music/PRIDE..mp3' },
  {
    name: 'Breathe (In The Air)',
    path: "/music/Pink Floyd - Breathe (In The Air) (50th Anniversary Competition Winner's Video).mp3",
  },
  { name: 'Prey', path: '/music/Prey.mp3' },
  { name: 'SKELETONS', path: '/music/SKELETONS.mp3' },
  { name: 'Sweater Weather', path: '/music/Sweater Weather.mp3' },
  { name: 'Swimming Pools', path: '/music/Swimming Pools (Drank).mp3' },
  {
    name: 'The Less I Know The Better',
    path: '/music/Tame Impala - The Less I Know The Better (Audio).mp3',
  },
  { name: 'Daddy Issues', path: '/music/The Neighbourhood - Daddy Issues (Lyrics).mp3' },
  { name: 'West Coast', path: '/music/West Coast.mp3' },
];

// Singleton state to share across components
let sharedAudio: HTMLAudioElement | null = null;
const sharedPlaylist = [...playlist];
let sharedCurrentIndex = 0;
let sharedIsShuffled = false;
const listeners: Set<() => void> = new Set();

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

function shufflePlaylist() {
  for (let i = sharedPlaylist.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [sharedPlaylist[i], sharedPlaylist[j]] = [sharedPlaylist[j], sharedPlaylist[i]];
  }
  sharedIsShuffled = true;
  sharedCurrentIndex = 0;
}

export function useMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(playlist[0].name);
  const [currentTime, setCurrentTime] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Get or create shared audio element
    if (!sharedAudio) {
      const audio = document.getElementById('bg-music') as HTMLAudioElement;
      if (audio) {
        sharedAudio = audio;
        sharedAudio.src = sharedPlaylist[0].path;
      }
    }
    audioRef.current = sharedAudio;

    const updateState = () => {
      if (audioRef.current) {
        setIsPlaying(!audioRef.current.paused);
        setCurrentSong(sharedPlaylist[sharedCurrentIndex]?.name || 'TRANCE / AMBIENT');
        setCurrentTime(audioRef.current.currentTime || 0);
        const percent = audioRef.current.duration
          ? (audioRef.current.currentTime / audioRef.current.duration) * 100
          : 0;
        setProgressPercent(percent);
      }
    };

    listeners.add(updateState);
    updateState();

    const audio = audioRef.current;
    if (audio) {
      const handleTimeUpdate = () => {
        setCurrentTime(audio.currentTime);
        if (audio.duration) {
          setProgressPercent((audio.currentTime / audio.duration) * 100);
        }
      };

      const handlePlay = () => {
        setIsPlaying(true);
        notifyListeners();
      };

      const handlePause = () => {
        setIsPlaying(false);
        notifyListeners();
      };

      const handleEnded = () => {
        // Auto-advance to next track
        sharedCurrentIndex =
          sharedCurrentIndex >= sharedPlaylist.length - 1 ? 0 : sharedCurrentIndex + 1;
        audio.src = sharedPlaylist[sharedCurrentIndex].path;
        setCurrentSong(sharedPlaylist[sharedCurrentIndex].name);
        audio.play().catch(console.log);
        notifyListeners();
      };

      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('play', handlePlay);
      audio.addEventListener('pause', handlePause);
      audio.addEventListener('ended', handleEnded);

      return () => {
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('play', handlePlay);
        audio.removeEventListener('pause', handlePause);
        audio.removeEventListener('ended', handleEnded);
        listeners.delete(updateState);
      };
    }
  }, []);

  const toggleMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      // Shuffle on first play
      if (!sharedIsShuffled) {
        shufflePlaylist();
        audio.src = sharedPlaylist[0].path;
        setCurrentSong(sharedPlaylist[0].name);
      }
      audio.play().catch(console.log);
    } else {
      audio.pause();
    }
  }, []);

  const loadSong = useCallback((index: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    let newIndex = index;
    if (newIndex < 0) newIndex = sharedPlaylist.length - 1;
    if (newIndex >= sharedPlaylist.length) newIndex = 0;

    sharedCurrentIndex = newIndex;
    audio.src = sharedPlaylist[sharedCurrentIndex].path;
    setCurrentSong(sharedPlaylist[sharedCurrentIndex].name);
    audio.play().catch(console.log);
    notifyListeners();
  }, []);

  const playNext = useCallback(() => {
    loadSong(sharedCurrentIndex + 1);
  }, [loadSong]);

  const playPrev = useCallback(() => {
    loadSong(sharedCurrentIndex - 1);
  }, [loadSong]);

  return {
    isPlaying,
    currentSong,
    currentTime,
    progressPercent,
    toggleMusic,
    playNext,
    playPrev,
  };
}
