import React, { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const GlobalAudio: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Very low volume as requested "lowe volumn. not to much bro"
    audio.volume = 0.15;
    audio.loop = true;

    const startAudio = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        // Autoplay policy prevented playback until user interaction
        const handleInteraction = () => {
          if (audio) {
            audio.play().then(() => {
              setIsPlaying(true);
            }).catch(() => {});
          }
          window.removeEventListener('click', handleInteraction);
          window.removeEventListener('scroll', handleInteraction);
          window.removeEventListener('keydown', handleInteraction);
        };
        window.addEventListener('click', handleInteraction);
        window.addEventListener('scroll', handleInteraction);
        window.addEventListener('keydown', handleInteraction);
      }
    };

    startAudio();

    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, []);

  const toggleSound = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play().then(() => {
        setIsPlaying(true);
        setIsMuted(false);
      }).catch(() => {});
    } else {
      if (isMuted) {
        audio.muted = false;
        setIsMuted(false);
      } else {
        audio.muted = true;
        setIsMuted(true);
      }
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/videos/Meet-our-Artisans.mp4"
        preload="auto"
        playsInline
      />
      <div className="fixed bottom-6 left-6 z-[60]">
        <button
          onClick={toggleSound}
          className="flex items-center justify-center p-3 bg-[#eae5da]/95 hover:bg-[#e0dbd0] rounded-full shadow-[0_4px_20px_rgb(0,0,0,0.1)] backdrop-blur-sm transition-all duration-300 hover:scale-110 border border-[#d8c3a5]/40 cursor-pointer"
          aria-label={isMuted || !isPlaying ? 'Play ambient audio' : 'Mute ambient audio'}
          title={isMuted || !isPlaying ? 'Click to play ambient audio' : 'Click to mute audio'}
        >
          {isMuted || !isPlaying ? (
            <VolumeX className="w-5 h-5 text-[#8a6040]" />
          ) : (
            <Volume2 className="w-5 h-5 text-[#8a6040] animate-pulse" />
          )}
        </button>
      </div>
    </>
  );
};

export default GlobalAudio;
