import React from 'react';
import TrackList from './TrackList';
import MusicPlayer from './MusicPlayer';
import Visualizer from './Visualizer';
import { useAudioContext } from '@/hooks/useAudioContext';

const BeatStore = () => {
  const { isPlaying, currentTrack } = useAudioContext();

  return (
    <div className="min-h-screen w-full relative">
      <Visualizer />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold neon-text mb-2">Beat Store</h1>
          <p className="text-muted">Discover and preview unique beats</p>
        </header>

        <div className="glass-panel p-6">
          <TrackList />
        </div>

        {currentTrack && (
          <div className="fixed bottom-0 left-0 right-0 glass-panel">
            <MusicPlayer />
          </div>
        )}
      </div>
    </div>
  );
};

export default BeatStore;