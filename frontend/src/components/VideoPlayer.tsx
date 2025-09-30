// VideoPlayer.tsx
import { useState, useRef, useEffect } from 'react';

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
}

const VideoPlayer = ({ videos }: VideoPlayerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
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

  const goToPrevious = () => setCurrentIndex((p) => (p > 0 ? p - 1 : 0));
  const goToNext = () => setCurrentIndex((p) => (p < videos.length - 1 ? p + 1 : p));

  const buttonBaseClasses = "bg-black/50 hover:bg-black/70 border border-white/50 text-white text-2xl w-12 h-12 rounded-full cursor-pointer transition-all flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed";

  return (
    <div
      className="w-full max-w-sm h-[80vh] border border-neutral-700 rounded-2xl overflow-hidden relative bg-black my-8 mx-auto"
    >
      <div
        className="w-full h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateY(-${currentIndex * 100}%)` }}
      >
        {videos.map((video) => (
          <div key={video.id.videoId} className="w-full h-full relative">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={`https://www.youtube.com/embed/${video.id.videoId}?loop=1&playlist=${video.id.videoId}&autoplay=1&enablejsapi=1&origin=http://localhost:5173`}              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />
          </div>
        ))}
      </div>

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