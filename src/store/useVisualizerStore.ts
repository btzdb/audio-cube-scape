import { create } from 'zustand';
import { VisualizerSettings } from '../types';

interface VisualizerState {
  settings: VisualizerSettings;
  updateSettings: (newSettings: Partial<VisualizerSettings>) => void;
}

const defaultSettings: VisualizerSettings = {
  type: 'bars',
  shape: 'cube',
  text: '3D TEXT',
  sensitivity: 5,
  colorScheme: 'default',
  customColors: {
    primary: '#ff0000',
    secondary: '#00ff00',
    accent: '#0000ff',
  },
  background: {
    type: 'color',
    color: '#000000',
    imageUrl: null,
    showParticles: false,
  },
  zoomEffect: true,
  zoomSpeed: 0.5,
  zoomIntensity: 0.3,
  bassBumpIntensity: 0.5,
  bassBumpSpeed: 0.5,
  imageBump: {
    enabled: false,
    imageUrl: null,
    scale: 1,
    position: [0, 0, 0],
    rotation: 0,
    glow: 0.5,
    opacity: 1,
    colorOverlay: null,
    pulseEffect: true,
    circleShape: false,
  },
};

export const useVisualizerStore = create<VisualizerState>((set) => ({
  settings: defaultSettings,
  updateSettings: (newSettings) =>
    set((state) => ({
      settings: {
        ...state.settings,
        ...newSettings,
      },
    })),
}));