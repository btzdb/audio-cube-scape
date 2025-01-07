import React, { useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { useAudioContext } from '../contexts/AudioContext';
import { useVisualizerStore } from '../store/useVisualizerStore';
import { Cube } from './shapes/Cube';
import { Ring } from './shapes/Ring';

export function ThreeVisualizer() {
  const { analyser } = useAudioContext();
  const [bassFrequency, setBassFrequency] = useState(0);
  const { settings } = useVisualizerStore();
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    if (!analyser) return;

    const updateBassFrequency = () => {
      try {
        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(dataArray);
        
        // Calculate bass frequency using a simple loop
        let sum = 0;
        const bassRange = dataArray.slice(0, 10);
        for (let i = 0; i < bassRange.length; i++) {
          sum += bassRange[i] || 0;
        }
        const bassAvg = bassRange.length > 0 ? sum / bassRange.length : 0;
        setBassFrequency(bassAvg);
        
        animationFrameRef.current = requestAnimationFrame(updateBassFrequency);
      } catch (error) {
        console.error('Error in frequency analysis:', error);
      }
    };

    updateBassFrequency();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [analyser]);

  const renderShape = () => {
    switch (settings.shape) {
      case 'cube':
        return <Cube frequency={bassFrequency} />;
      case 'ring':
        return <Ring frequency={bassFrequency} />;
      default:
        return <Cube frequency={bassFrequency} />;
    }
  };

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5] }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight
          position={[-10, -10, -10]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          castShadow
        />
        <Environment preset="city" />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
          rotateSpeed={0.5}
        />
        {renderShape()}
      </Canvas>
    </div>
  );
}