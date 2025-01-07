export interface VisualizerSettings {
  type: 'bars' | 'circles' | 'text3d';
  shape: 'none' | 'cube' | 'ring';
  text: string;
  sensitivity: number;
  colorScheme: 'default' | 'rainbow' | 'monochrome' | 'neon' | 'sunset';
  customColors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  background: {
    type: 'color' | 'image' | 'particles';
    color: string;
    imageUrl: string | null;
    showParticles: boolean;
    particleSettings?: {
      count: number;
      speed: number;
      size: number;
      glow: number;
    };
  };
  effects?: {
    particles?: {
      count: number;
      speed: number;
      size: {
        min: number;
        max: number;
      };
      glow: number;
    };
  };
  zoomEffect: boolean;
  zoomSpeed: number;
  zoomIntensity: number;
  bassBumpIntensity: number;
  bassBumpSpeed: number;
  imageBump: {
    enabled: boolean;
    imageUrl: string | null;
    scale: number;
    position: [number, number, number];
    rotation: number;
    glow: number;
    opacity: number;
    colorOverlay: string | null;
    pulseEffect: boolean;
    circleShape: boolean;
  };
}

export interface VideoConfig {
  format: 'mp4' | 'mov' | 'avi';
  resolution: '4k' | '1080p' | '720p';
  quality: number;
  filename: string;
  destination?: string;
}

export interface Text3DPreset {
  editable: number;
  text: string;
  font: {
    size: number;
    weight: string;
    name: string;
    src: string;
  };
  fill: {
    color: string;
  };
  depth: {
    active: number;
    length: number;
    angle: number;
  };
  animation: {
    active: number;
    duration: number;
  };
}