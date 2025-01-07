import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { VisualizerSettings } from '../types';

interface VisualizerState {
  settings: VisualizerSettings;
  updateSettings: (newSettings: Partial<VisualizerSettings>) => void;
  resetSettings: () => void;
}

const defaultSettings: VisualizerSettings = {
  type: 'bars',
  shape: 'cube',
  text: '3D TEXT',
  sensitivity: 5,
  colorScheme: 'default',
  customColors: {
    primary: '#9f7aea',
    secondary: '#ec4899',
    accent: '#f59e0b',
  },
  background: {
    type: 'color',
    color: '#000000',
    imageUrl: null,
    showParticles: false,
    particleSettings: {
      count: 100,
      speed: 1,
      size: 2,
      glow: 0.5,
    },
  },
  effects: {
    particles: {
      count: 100,
      speed: 1,
      size: {
        min: 1,
        max: 4,
      },
      glow: 0.5,
    },
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

export const useVisualizerStore = create<VisualizerState>()(
  persist(
    (set) => ({
      settings: defaultSettings,
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: {
            ...state.settings,
            ...newSettings,
            background: {
              ...state.settings.background,
              ...(newSettings.background || {}),
            },
            effects: {
              ...state.settings.effects,
              ...(newSettings.effects || {}),
            },
            customColors: {
              ...state.settings.customColors,
              ...(newSettings.customColors || {}),
            },
          },
        })),
      resetSettings: () => set({ settings: defaultSettings }),
    }),
    {
      name: 'visualizer-settings',
      skipHydration: false,
    }
  )
);