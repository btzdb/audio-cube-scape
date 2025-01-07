import React, { createContext, useContext, useRef, useState, useCallback, useEffect } from 'react';

interface AudioContextType {
  audioContext: AudioContext | null;
  analyser: AnalyserNode | null;
  createAudioSource: (element: HTMLMediaElement) => Promise<void>;
  disconnectSource: () => void;
}

const AudioContextProvider = createContext<AudioContextType | null>(null);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);
  const analyserNodeRef = useRef<AnalyserNode | null>(null);

  const cleanup = useCallback(() => {
    try {
      if (sourceNodeRef.current) {
        sourceNodeRef.current.disconnect();
        sourceNodeRef.current = null;
      }
      if (analyserNodeRef.current) {
        analyserNodeRef.current.disconnect();
        analyserNodeRef.current = null;
      }
      if (audioContextRef.current?.state !== 'closed') {
        audioContextRef.current?.close();
      }
      setAnalyser(null);
      console.log('Audio context cleaned up successfully');
    } catch (error) {
      console.error('Error cleaning up audio context:', error);
    }
  }, []);

  const disconnectSource = useCallback(() => {
    try {
      if (sourceNodeRef.current) {
        sourceNodeRef.current.disconnect();
        sourceNodeRef.current = null;
      }
      if (analyserNodeRef.current) {
        analyserNodeRef.current.disconnect();
        analyserNodeRef.current = null;
      }
      setAnalyser(null);
      console.log('Audio source disconnected successfully');
    } catch (error) {
      console.error('Error disconnecting audio source:', error);
    }
  }, []);

  const createAudioSource = useCallback(async (element: HTMLMediaElement) => {
    try {
      // Clean up existing connections
      disconnectSource();

      // Create or resume audio context
      if (!audioContextRef.current || audioContextRef.current.state === 'closed') {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
      }

      // Create and configure audio nodes
      const source = audioContextRef.current.createMediaElementSource(element);
      const newAnalyser = audioContextRef.current.createAnalyser();
      
      newAnalyser.fftSize = 2048;
      newAnalyser.smoothingTimeConstant = 0.85;
      newAnalyser.minDecibels = -90;
      newAnalyser.maxDecibels = -10;

      // Connect nodes
      source.connect(newAnalyser);
      newAnalyser.connect(audioContextRef.current.destination);

      // Store references
      sourceNodeRef.current = source;
      analyserNodeRef.current = newAnalyser;
      setAnalyser(newAnalyser);

      console.log('Audio source created successfully');
    } catch (error) {
      console.error('Error creating audio source:', error);
      cleanup();
      throw error;
    }
  }, [disconnectSource, cleanup]);

  useEffect(() => {
    return () => {
      cleanup();
    };
  }, [cleanup]);

  return (
    <AudioContextProvider.Provider
      value={{
        audioContext: audioContextRef.current,
        analyser,
        createAudioSource,
        disconnectSource,
      }}
    >
      {children}
    </AudioContextProvider.Provider>
  );
}

export const useAudioContext = () => {
  const context = useContext(AudioContextProvider);
  if (!context) {
    throw new Error('useAudioContext must be used within an AudioProvider');
  }
  return context;
};