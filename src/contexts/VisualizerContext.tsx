import React, { createContext, useContext, useState } from 'react';
import { VisualizerSettings } from '../types';

interface VisualizerContextType {
  settings: VisualizerSettings;
  updateSettings: (newSettings: Partial<VisualizerSettings>) => void;
  saveSettings: () => void;
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

const VisualizerContext = createContext<VisualizerContextType | null>(null);

export function VisualizerProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<VisualizerSettings>(defaultSettings);

  const updateSettings = (newSettings: Partial<VisualizerSettings>) => {
    setSettings((current) => ({
      ...current,
      ...newSettings,
    }));
  };

  const saveSettings = () => {
    localStorage.setItem('visualizer-settings', JSON.stringify(settings));
  };

  return (
    <VisualizerContext.Provider value={{ settings, updateSettings, saveSettings }}>
      {children}
    </VisualizerContext.Provider>
  );
}

export const useVisualizer = () => {
  const context = useContext(VisualizerContext);
  if (!context) {
    throw new Error('useVisualizer must be used within a VisualizerProvider');
  }
  return context;
};