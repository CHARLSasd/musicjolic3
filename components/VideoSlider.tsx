import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Music, Play, Pause, SkipBack, SkipForward } from "lucide-react";

const videos = [
  { url: "/show/1.mp4", title: "Sufi Night Extravaganza" },
  { url: "/show/2.mp4", title: "Bollywood Mashup Medley" },
  { url: "/show/3.mp4", title: "Rock Fusion Spectacular" },
  { url: "/show/4.mp4", title: "Acoustic Unplugged Session" },
  { url: "/show/5.mp4", title: "Electrifying Live Performance" },
  { url: "/show/6.mp4", title: "QVI6 - Special Performance" },
  // { url: "/show/7.mov", title: "QVI7 - Grand Stage" }
];

export default function VideoSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, currentIndex]);

  useEffect(() => {
    const checkOrientation = () => {
      if (videoRef.current) {
        setIsPortrait(videoRef.current.videoHeight > videoRef.current.videoWidth);
      }
    };

    const video = videoRef.current;
    if (video) {
      video.addEventListener('loadedmetadata', checkOrientation);
      return () => video.removeEventListener('loadedmetadata', checkOrientation);
    }
  }, [currentIndex]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
    setIsPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + videos.length) % videos.length);
    setIsPlaying(false);
  };

  return (
    <motion.div
      className="relative w-full max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 to-red-900/20 rounded-2xl blur-2xl"></div>
      <Card className="relative bg-black/70 border-amber-500/30 p-3 rounded-2xl overflow-hidden backdrop-blur-sm transform transition-transform duration-300 hover:scale-105">
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-amber-500 to-red-500"></div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-bold bg-gradient-to-r from-amber-400 to-red-500 bg-clip-text text-transparent truncate max-w-[80%]">
            {videos[currentIndex].title}
          </h3>
          <Music className="w-4 h-4 text-amber-400 animate-pulse" />
        </div>
        <div className={`relative rounded-lg overflow-hidden ${isPortrait ? 'aspect-[9/16]' : 'aspect-[16/9]'}`}>
          <video
            ref={videoRef}
            src={videos[currentIndex].url}
            className={`w-full h-full ${isPortrait ? 'object-contain' : 'object-cover'}`}
            loop
            playsInline
          />
        </div>
        <div className="mt-2 flex justify-between items-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevSlide}
            className="text-amber-400 hover:text-amber-300 transition-colors"
            aria-label="Previous video"
          >
            <SkipBack className="h-5 w-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePlayPause}
            className="bg-gradient-to-r from-amber-500 to-red-500 text-white rounded-full p-1.5 hover:from-amber-600 hover:to-red-600 transition-all duration-300"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextSlide}
            className="text-amber-400 hover:text-amber-300 transition-colors"
            aria-label="Next video"
          >
            <SkipForward className="h-5 w-5" />
          </motion.button>
        </div>
      </Card>
      <div className="flex justify-center mt-2 space-x-1">
        {videos.map((_, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-gradient-to-r from-amber-500 to-red-500 scale-110' : 'bg-amber-500/30'
            }`}
            onClick={() => {
              setCurrentIndex(index);
              setIsPlaying(false);
            }}
            aria-label={`Go to slide ${index + 1}`}
          ></motion.button>
        ))}
      </div>
    </motion.div>
  );
}