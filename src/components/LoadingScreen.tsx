import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TextShimmer } from '@/components/ui/text-shimmer';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 600);
          return 100;
        }
        return prev + 1;
      });
    }, 25);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black px-6"
      exit={{ opacity: 0, scale: 1.03, filter: 'blur(8px)' }}
      transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center"
      >
        <TextShimmer
          duration={1.2}
          className="text-lg sm:text-xl md:text-2xl font-medium [--base-color:theme(colors.blue.600)] [--base-gradient-color:theme(colors.blue.200)] dark:[--base-color:theme(colors.blue.700)] dark:[--base-gradient-color:theme(colors.blue.400)]"
        >
          Hi, Welcome to Effect3 Enterprise AI
        </TextShimmer>
      </motion.div>

      <motion.div
        className="mt-8 w-48 h-[2px] bg-white/10 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
