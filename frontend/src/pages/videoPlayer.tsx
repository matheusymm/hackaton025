import React, { useState, useRef, useEffect, createRef } from 'react';
import type { RefObject } from 'react';

// --- Example video URLs ---
const videos = [
  'https://assets.mixkit.co/videos/preview/mixkit-girl-frowning-and-looking-at-the-camera-39726-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-portrait-of-a-woman-in-a-pool-39741-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-woman-running-by-the-ocean-41223-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-woman-posing-for-the-camera-in-the-middle-of-nowhere-39725-large.mp4',
];

// --- Main Component ---
const TikTokPlayer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // --- FIX: Typing the useRef ---
  // We tell TypeScript that this ref will hold an array of references to video elements.
  const videoRefs = useRef<RefObject<HTMLVideoElement>[]>([]);

  videoRefs.current = videos.map((_, i) => videoRefs.current[i] ?? createRef<HTMLVideoElement>());

  useEffect(() => {
    videoRefs.current.forEach((ref, index) => {
      // `ref.current` is now recognized by TypeScript!
      if (ref.current) {
        if (index === currentIndex) {
          ref.current.play().catch(error => {
            console.log("Autoplay was blocked by the browser.", error);
          });
        } else {
          ref.current.pause();
          ref.current.currentTime = 0;
        }
      }
    });
  }, [currentIndex]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < videos.length - 1 ? prevIndex + 1 : prevIndex));
  };

  // --- GOOD PRACTICE: Typing the mouse event ---
  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY > 0) {
      goToNext();
    } else if (e.deltaY < 0) {
      goToPrevious();
    }
  };

  return (
    // The JSX remains the same, but is now type-safe
    <div className="tiktok-player-container" onWheel={handleWheel}>
      <style>{`
        /* CSS here remains the same */
        .tiktok-player-container { width: 100%; max-width: 400px; height: 80vh; border: 1px solid #333; border-radius: 20px; overflow: hidden; position: relative; background-color: black; margin: 2rem auto; }
        .video-wrapper { width: 100%; height: 100%; transition: transform 0.5s ease-in-out; }
        .video-slide { width: 100%; height: 100%; position: relative; }
        .video-slide video { width: 100%; height: 100%; object-fit: cover; }
        .controls { position: absolute; top: 50%; right: 10px; transform: translateY(-50%); display: flex; flex-direction: column; gap: 15px; z-index: 10; }
        .controls button { background-color: rgba(255, 255, 255, 0.5); border: none; color: black; font-size: 24px; width: 40px; height: 40px; border-radius: 50%; cursor: pointer; transition: background-color 0.2s; }
        .controls button:hover { background-color: rgba(255, 255, 255, 0.8); }
        .controls button:disabled { opacity: 0.3; cursor: not-allowed; }
      `}</style>
      <div
        className="video-wrapper"
        style={{ transform: `translateY(-${currentIndex * 100}%)` }}
      >
        {videos.map((videoUrl, index) => (
          <div key={index} className="video-slide">
            <video
              ref={videoRefs.current[index]}
              src={videoUrl}
              loop
              playsInline
              onClick={(e) => (e.target as HTMLVideoElement).paused ? (e.target as HTMLVideoElement).play() : (e.target as HTMLVideoElement).pause()}
            />
          </div>
        ))}
      </div>
      <div className="controls">
        <button onClick={goToPrevious} disabled={currentIndex === 0}>▲</button>
        <button onClick={goToNext} disabled={currentIndex === videos.length - 1}>▼</button>
      </div>
    </div>
  );
};

export default TikTokPlayer;