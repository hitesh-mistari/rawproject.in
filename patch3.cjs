const fs = require('fs');
let content = fs.readFileSync('src/pages/AboutPage.tsx', 'utf8');

const hookLogic = `
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.15;
    audio.loop = true;

    const startAudio = async () => {
      try {
        await audio.play();
      } catch {
        const handleInteraction = () => {
          if (audio) {
            audio.play().catch(() => {});
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
`;

const audioTag = `
      <audio
        ref={audioRef}
        src="/videos/Meet-our-Artisans.mp4"
        preload="auto"
        playsInline
      />
`;

content = content.replace("import React from 'react';", "import React, { useEffect, useRef } from 'react';");
content = content.replace("const AboutPage: React.FC = () => {\n", "const AboutPage: React.FC = () => {\n" + hookLogic);
content = content.replace('<div className="bg-[#EDE8DE] min-h-screen text-[#000000]">', '<div className="bg-[#EDE8DE] min-h-screen text-[#000000]">' + audioTag);

fs.writeFileSync('src/pages/AboutPage.tsx', content);
