import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = () => {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {showLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            transition={{ duration: 10, ease: "easeInOut" }}
            className="relative w-[85vw] h-[60vw] max-w-[350px] max-h-[350px] md:w-[400px] md:h-[400px] rounded-2xl shadow-2xl overflow-hidden flex flex-col justify-end"
          >
            <img
              src="/images/load.jpeg"
              alt="Loading"
              className="w-full h-full object-cover rounded-2xl"
              style={{ aspectRatio: '1/1' }}
            />
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 10, ease: "linear" }}
              className="absolute bottom-0 left-0 h-2 bg-amber-400 rounded-b-2xl"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;