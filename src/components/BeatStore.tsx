import React from 'react';
import TrackList from './TrackList';
import { AudioPlayer } from './AudioPlayer';
import { Background } from './Background';
import { useAudioStore } from '../store/useAudioStore';
import { motion } from 'framer-motion';

const BeatStore = () => {
  const { currentTrack } = useAudioStore();

  const handleInteraction = () => {
    // Handle any interaction events here if needed
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

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-6"
        >
          <TrackList />
        </motion.div>

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