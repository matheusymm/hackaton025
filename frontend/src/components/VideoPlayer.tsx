// VideoPlayer.tsx

import React, { useState, useRef, useEffect } from 'react';
import YouTube from 'react-youtube';

// Interface para os dados do vídeo da API
interface YouTubeVideo {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
  };
}

// Interface para as props do nosso componente
interface VideoPlayerProps {
  videos: YouTubeVideo[];
}

interface YouTubePlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead?: boolean) => void;
  mute: () => void;
  unMute: () => void;
}

const VideoPlayer = ({ videos }: VideoPlayerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const playerRefs = useRef<YouTubePlayer[]>([]);

  useEffect(() => {
    playerRefs.current.forEach((player, index) => {
      if (player && typeof player.playVideo === 'function') {
        if (index === currentIndex) {
          player.playVideo();
        } else {
          player.pauseVideo();
          player.seekTo(0);
        }
      }
    });
  }, [currentIndex, videos]);

  useEffect(() => {
    const currentPlayer = playerRefs.current[currentIndex];
    if (currentPlayer) {
// eslint-disable-next-line
      isMuted ? currentPlayer.mute() : currentPlayer.unMute();
    }
  }, [isMuted, currentIndex, videos]);

  const goToPrevious = () => setCurrentIndex((p) => (p > 0 ? p - 1 : 0));
  const goToNext = () => setCurrentIndex((p) => (p < videos.length - 1 ? p + 1 : p));
  const toggleMute = () => setIsMuted((p) => !p);

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      controls: 0,
      rel: 0,
      showinfo: 0,
      modestbranding: 1,
      loop: 1,
      playlist: '',
      fs: 0,
      origin: 'https://localhost:5173', 
    },
  };

  const buttonBaseClasses = "bg-black/50 hover:bg-black/70 border border-white/50 text-black text-2xl w-12 h-12 rounded-full cursor-pointer transition-all flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed";

  return (
    <div
      className="w-full max-w-sm h-[80vh] border border-neutral-700 rounded-2xl overflow-hidden relative bg-black my-8 mx-auto"
    >
      <div
        className="w-full h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateY(-${currentIndex * 100}%)` }}
      >
        {videos.map((video, index) => (
          <div key={video.id.videoId} className="w-full h-full relative">
            <YouTube
              videoId={video.id.videoId}
              opts={{ ...opts, playlist: video.id.videoId, playerVars: { ...opts.playerVars, mute: isMuted ? 1 : 0 } }}
              className="w-full h-full"
              onReady={(event) => {
                playerRefs.current[index] = event.target;
                if (isMuted) event.target.mute();
              }}
            />
          </div>
        ))}
      </div>

      <button
        onClick={toggleMute}
        className={`${buttonBaseClasses} absolute bottom-5 left-5 z-10`}
      >
        <span className="material-symbols-outlined">
          {isMuted ? 'volume_off' : 'volume_up'}
        </span>
      </button>

      <div className="absolute top-1/2 right-4 -translate-y-1/2 flex flex-col gap-4 z-10">
        <button
          onClick={goToPrevious}
          disabled={currentIndex === 0}
          className={buttonBaseClasses}
        >
          <span className="material-symbols-outlined">keyboard_arrow_up</span>
        </button>
        <button
          onClick={goToNext}
          disabled={currentIndex === videos.length - 1}
          className={buttonBaseClasses}
        >
          <span className="material-symbols-outlined">keyboard_arrow_down</span>
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;