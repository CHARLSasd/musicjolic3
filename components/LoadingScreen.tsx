'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, Music } from 'lucide-react';

// Vinyl Record Component
const VinylRecord = ({ isSpinning, progress }: { isSpinning: boolean; progress: number }) => {
  return (
    <div className="relative w-48 h-48 md:w-64 md:h-64">
      {/* Outer Ring */}
      <motion.div 
        className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-900 via-gray-800 to-black border-4 border-amber-400/30"
        animate={{
          rotate: isSpinning ? 360 : 0,
          scale: [1, 1.02, 1],
        }}
        transition={{
          rotate: {
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          },
          scale: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
        {/* Vinyl Grooves */}
        <div className="absolute inset-4 rounded-full border border-amber-400/20" />
        <div className="absolute inset-8 rounded-full border border-amber-400/15" />
        <div className="absolute inset-12 rounded-full border border-amber-400/10" />
        
        {/* Center Label */}
        <div className="absolute inset-1/3 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
          <div className="text-black font-bold text-xs md:text-sm text-center">
            <div>MUSICAHOLIC</div>
            <div className="text-[8px] md:text-[10px] opacity-80">RECORDS</div>
          </div>
        </div>
        
        {/* Center Hole */}
        <div className="absolute top-1/2 left-1/2 w-3 h-3 md:w-4 md:h-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black" />
      </motion.div>
      
      {/* Progress Ring */}
      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="none"
          stroke="rgba(251, 191, 36, 0.2)"
          strokeWidth="1"
        />
        <motion.circle
          cx="50"
          cy="50"
          r="48"
          fill="none"
          stroke="rgb(251, 191, 36)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={`${2 * Math.PI * 48}`}
          initial={{ strokeDashoffset: 2 * Math.PI * 48 }}
          animate={{ strokeDashoffset: 2 * Math.PI * 48 * (1 - progress / 100) }}
          transition={{ duration: 0.1, ease: "linear" }}
        />
      </svg>
    </div>
  );
};

// Equalizer Bars
const EqualizerBars = ({ isActive }: { isActive: boolean }) => {
  const bars = [12, 8, 16, 6, 14, 10, 18, 4, 12, 8];
  
  return (
    <div className="flex items-end justify-center gap-1 h-16 md:h-20">
      {bars.map((height, i) => (
        <motion.div
          key={i}
          className="w-2 md:w-3 bg-gradient-to-t from-amber-600 to-amber-400 rounded-full"
          initial={{ height: 4 }}
          animate={{
            height: isActive ? [4, height * 2, 4, height * 1.5, 4] : 4,
            opacity: isActive ? [0.6, 1, 0.8, 1, 0.6] : 0.3,
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Floating Music Notes
const FloatingNote = ({ delay, startX, endX, startY, endY }: { 
  delay: number; 
  startX: number; 
  endX: number; 
  startY: number; 
  endY: number; 
}) => {
  return (
    <motion.div
      className="absolute text-amber-400/40"
      initial={{ 
        x: startX, 
        y: startY, 
        opacity: 0, 
        scale: 0.5,
        rotate: -20 
      }}
      animate={{
        x: endX,
        y: endY,
        opacity: [0, 0.8, 0],
        scale: [0.5, 1, 0.3],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: 4,
        delay: delay,
        repeat: Infinity,
        repeatDelay: 2,
        ease: "easeOut",
      }}
    >
      <Music className="w-4 h-4 md:w-6 md:h-6" />
    </motion.div>
  );
};

const LoadingScreen = () => {
  const [showLoading, setShowLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [loadingText, setLoadingText] = useState('Tuning instruments...');
  const loadingDuration = 6; // seconds

  // Loading text phases
  const loadingTexts = [
    'Tuning instruments...',
    'Setting up the stage...',
    'Warming up the crowd...',
    'Checking sound levels...',
    'Ready to rock!'
  ];

  useEffect(() => {
    let progressInterval;
    let textInterval;
    
    // Update progress
    progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + (100 / (loadingDuration * 10));
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 100);

    // Update loading text
    textInterval = setInterval(() => {
      setLoadingText(prev => {
        const currentIndex = loadingTexts.indexOf(prev);
        const nextIndex = (currentIndex + 1) % loadingTexts.length;
        return loadingTexts[nextIndex];
      });
    }, 1200);

    // Auto-hide after duration
    const timer = setTimeout(() => {
      setShowLoading(false);
      clearInterval(progressInterval);
      clearInterval(textInterval);
    }, loadingDuration * 1000);

    return () => {
      clearTimeout(timer);
      if (progressInterval) clearInterval(progressInterval);
      if (textInterval) clearInterval(textInterval);
    };
  }, []);

  // Fixed positions for floating notes to avoid hydration issues
  const notePositions = [
    { delay: 0, startX: -50, endX: 100, startY: 80, endY: 20 },
    { delay: 0.5, startX: 120, endX: -20, startY: 70, endY: 30 },
    { delay: 1, startX: -30, endX: 110, startY: 60, endY: 40 },
    { delay: 1.5, startX: 130, endX: -40, startY: 50, endY: 10 },
  ];

  return (
    <AnimatePresence mode="wait">
      {showLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.1,
            transition: { 
              duration: 1,
              ease: [0.22, 1, 0.36, 1] 
            } 
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden"
          role="status"
          aria-label="Loading Musicaholic"
        >
          {/* Animated background */}
          <div className="absolute inset-0">
            {/* Radial gradient overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.1)_0%,transparent_70%)]" />
            
            {/* Floating music notes */}
            {notePositions.map((note, i) => (
              <FloatingNote key={i} {...note} />
            ))}
            
            {/* Subtle grid pattern */}
            <div className="absolute inset-0 opacity-[0.02]">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            </div>
          </div>
          {/* Main Vinyl Record */}
          <motion.div 
            className="relative mb-8"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              y: 0,
              transition: { 
                duration: 1,
                ease: [0.22, 1, 0.36, 1] 
              } 
            }}
          >
            <VinylRecord isSpinning={isPlaying} progress={progress} />
            
            {/* Play/Pause Button */}
            <motion.button
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-black/80 backdrop-blur-sm border-2 border-amber-400/50 flex items-center justify-center text-amber-400 hover:bg-amber-400/10 transition-colors"
              onClick={() => setIsPlaying(!isPlaying)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 md:w-6 md:h-6" />
              ) : (
                <Play className="w-5 h-5 md:w-6 md:h-6 ml-1" />
              )}
            </motion.button>
          </motion.div>

          {/* Brand Title */}
          <motion.div 
            className="text-center mb-6"
            initial={{ y: 30, opacity: 0 }}
            animate={{ 
              y: 0, 
              opacity: 1,
              transition: { 
                delay: 0.5,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1] 
              } 
            }}
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent mb-3"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              MUSICAHOLIC
            </motion.h1>
            
            {/* Dynamic Loading Text */}
            <motion.p 
              className="text-gray-300 text-base md:text-lg font-medium h-6"
              key={loadingText}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {loadingText}
            </motion.p>
          </motion.div>

          {/* Equalizer Visualization */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              transition: { 
                delay: 0.8,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1] 
              } 
            }}
          >
            <EqualizerBars isActive={isPlaying} />
          </motion.div>

          {/* Progress Display */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1,
              y: 0,
              transition: { 
                delay: 1,
                duration: 0.5 
              } 
            }}
          >
            <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent mb-2">
              {Math.min(Math.round(progress), 100)}%
            </div>
            
            {/* Progress Bar */}
            <div className="w-64 md:w-80 h-1 bg-gray-800 rounded-full overflow-hidden mx-auto">
              <motion.div 
                className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"
                initial={{ width: '0%' }}
                animate={{ 
                  width: `${progress}%`,
                  transition: { 
                    duration: 0.1,
                    ease: "linear" 
                  } 
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;