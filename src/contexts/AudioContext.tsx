import React, { createContext, useContext, useState } from 'react';

interface AudioContextType {
  analyser: AnalyserNode | null;
  createAudioSource: (element: HTMLMediaElement) => Promise<void>;
  disconnectSource: () => void;
}

const AudioContext = createContext<AudioContextType>({
  analyser: null,
  createAudioSource: async () => {},
  disconnectSource: () => {},
});

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);

  const createAudioSource = async (element: HTMLMediaElement) => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const source = audioContext.createMediaElementSource(element);
    const newAnalyser = audioContext.createAnalyser();
    
    source.connect(newAnalyser);
    newAnalyser.connect(audioContext.destination);
    
    setAnalyser(newAnalyser);
  };

  const disconnectSource = () => {
    setAnalyser(null);
  };

  return (
    <AudioContext.Provider value={{ analyser, createAudioSource, disconnectSource }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudioContext = () => useContext(AudioContext);