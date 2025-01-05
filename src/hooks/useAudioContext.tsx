import React, { createContext, useContext, useState } from 'react';

interface Track {
  id: number;
  title: string;
  duration: string;
  bpm: number;
  price: string;
}

interface AudioContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  playTrack: (track: Track) => void;
  pauseTrack: () => void;
}

const AudioContext = createContext<AudioContextType>({
  currentTrack: null,
  isPlaying: false,
  playTrack: () => {},
  pauseTrack: () => {},
});

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playTrack = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    console.log('Playing track:', track.title);
  };

  const pauseTrack = () => {
    setIsPlaying(false);
    console.log('Paused track:', currentTrack?.title);
  };

  return (
    <AudioContext.Provider value={{ currentTrack, isPlaying, playTrack, pauseTrack }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudioContext = () => useContext(AudioContext);