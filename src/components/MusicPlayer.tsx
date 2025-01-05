import React from 'react';
import { useAudioContext } from '@/hooks/useAudioContext';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

const MusicPlayer = () => {
  const { currentTrack, isPlaying, playTrack, pauseTrack } = useAudioContext();

  return (
    <div className="p-4 flex items-center gap-4">
      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-primary/20 rounded-full transition-colors">
          <SkipBack className="w-5 h-5" />
        </button>
        <button
          onClick={() => isPlaying ? pauseTrack() : playTrack(currentTrack)}
          className="p-3 hover:bg-primary/20 rounded-full transition-colors"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6" />
          )}
        </button>
        <button className="p-2 hover:bg-primary/20 rounded-full transition-colors">
          <SkipForward className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm">{currentTrack?.title}</span>
          <span className="text-sm text-muted">0:00 / {currentTrack?.duration}</span>
        </div>
        <div className="h-1 bg-white/10 rounded-full">
          <div className="h-full w-0 bg-primary rounded-full" />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Volume2 className="w-5 h-5" />
        <div className="w-24 h-1 bg-white/10 rounded-full">
          <div className="h-full w-1/2 bg-primary rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;