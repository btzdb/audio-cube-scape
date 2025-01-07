import { create } from 'zustand';

interface AudioState {
  currentTrack: {
    id: string;
    title: string;
    audio_url: string;
    duration: number;
  } | null;
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  setPlaying: (playing: boolean) => void;
  setVolume: (volume: number) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  playTrack: (track: AudioState['currentTrack']) => void;
  pauseTrack: () => void;
  reset: () => void;
}

const initialState = {
  currentTrack: null,
  isPlaying: false,
  volume: 0.5,
  currentTime: 0,
  duration: 0,
};

export const useAudioStore = create<AudioState>((set) => ({
  ...initialState,
  setPlaying: (playing) => set({ isPlaying: playing }),
  setVolume: (volume) => set({ volume }),
  setCurrentTime: (time) => set({ currentTime: time }),
  setDuration: (duration) => set({ duration }),
  playTrack: (track) => set({ currentTrack: track, isPlaying: true }),
  pauseTrack: () => set({ isPlaying: false }),
  reset: () => set(initialState),
}));