import React from 'react';
import TrackList from './TrackList';
import { AudioPlayer } from './AudioPlayer';
import { Background } from './Background';
import { useAudioStore } from '../store/useAudioStore';
import { motion, AnimatePresence } from 'framer-motion';
import { ThreeVisualizer } from './ThreeVisualizer';

const BeatStore = () => {
  const { currentTrack, isPlaying } = useAudioStore();

  const handleInteraction = () => {
    console.log('Audio player interaction occurred');
  };

  return (
    <div className="min-h-screen w-full relative">
      <Background />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-bold neon-text mb-2">Beat Store</h1>
          <p className="text-muted">Discover and preview unique beats</p>
        </motion.header>

        <AnimatePresence mode="wait">
          {!isPlaying ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-panel p-6"
            >
              <TrackList />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="w-full h-[60vh] relative"
            >
              <ThreeVisualizer />
            </motion.div>
          )}
        </AnimatePresence>

        {currentTrack && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="fixed bottom-0 left-0 right-0 glass-panel"
          >
            <AudioPlayer onInteraction={handleInteraction} />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BeatStore;