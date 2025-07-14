import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface EnhancedVideoPlayerProps {
  videoUrl: string;
  title: string;
}

const EnhancedVideoPlayer: React.FC<EnhancedVideoPlayerProps> = ({ videoUrl, title }) => {
  const [size, setSize] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [brightness, setBrightness] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const videoRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.style.filter = `contrast(${contrast}%) brightness(${brightness}%) saturate(${saturation}%)`;
    }
  }, [contrast, brightness, saturation]);

  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{ width: `${size}%`, margin: '0 auto' }}
        className="aspect-video"
      >
        <iframe
          ref={videoRef}
          src={`${videoUrl}embed/`}
          className="w-full h-full rounded-lg"
          allowFullScreen
        ></iframe>
      </motion.div>
      <div className="mt-4 space-y-2">
        <label className="block text-sm font-medium text-amber-400">Size</label>
        <input
          type="range"
          min="50"
          max="100"
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
          className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer"
        />
        <label className="block text-sm font-medium text-amber-400">Contrast</label>
        <input
          type="range"
          min="50"
          max="150"
          value={contrast}
          onChange={(e) => setContrast(Number(e.target.value))}
          className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer"
        />
        <label className="block text-sm font-medium text-amber-400">Brightness</label>
        <input
          type="range"
          min="50"
          max="150"
          value={brightness}
          onChange={(e) => setBrightness(Number(e.target.value))}
          className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer"
        />
        <label className="block text-sm font-medium text-amber-400">Saturation</label>
        <input
          type="range"
          min="50"
          max="150"
          value={saturation}
          onChange={(e) => setSaturation(Number(e.target.value))}
          className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>
    </div>
  );
};

export default EnhancedVideoPlayer;